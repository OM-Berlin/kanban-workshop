-- Kanban-Board — Datenbankschema
--
-- Einspielen: Supabase-Dashboard -> SQL Editor -> Inhalt einfügen -> Run.
-- Das Skript ist mehrfach ausführbar; nichts geht dabei verloren.
--
-- Zwei Tabellen reichen für ein Trello-artiges Board:
--   lists  = die Spalten (Zu erledigen, In Arbeit, Fertig)
--   cards  = die Karten in diesen Spalten
--
-- Jede Zeile gehört einer Person: die Spalte user_id zeigt auf den
-- angemeldeten Nutzer. Genau daran hängt später die Zugriffsregel.

-- ---------------------------------------------------------------- Tabellen --

create table if not exists public.lists (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  title       text not null check (char_length(title) between 1 and 80),
  position    integer not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.cards (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  list_id     uuid not null references public.lists (id) on delete cascade,
  title       text not null check (char_length(title) between 1 and 200),
  position    integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists lists_user_idx on public.lists (user_id, position);
create index if not exists cards_list_idx on public.cards (list_id, position);

-- ------------------------------------------------------- Die Zugriffsregel --
--
-- Row Level Security. Ohne diese beiden Zeilen darf jeder alles lesen, der den
-- öffentlichen Schlüssel kennt — und der steht im Browser jedes Besuchers.

alter table public.lists enable row level security;
alter table public.cards enable row level security;

-- Eine Regel je Tabelle, die für alle vier Zugriffsarten gilt:
-- sichtbar und änderbar ist nur, was der eigenen user_id gehört.
-- auth.uid() ist die Kennung des gerade angemeldeten Nutzers.

drop policy if exists "eigene listen" on public.lists;
create policy "eigene listen" on public.lists
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "eigene karten" on public.cards;
create policy "eigene karten" on public.cards
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ------------------------------------------------- Startspalten pro Anmeldung --
--
-- Wer sich zum ersten Mal anmeldet, soll kein leeres Board sehen. Der Trigger
-- legt drei Spalten an, sobald ein Nutzer entsteht.

create or replace function public.starter_spalten()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.lists (user_id, title, position) values
    (new.id, 'Zu erledigen', 0),
    (new.id, 'In Arbeit',    1),
    (new.id, 'Fertig',       2);
  return new;
end;
$$;

drop trigger if exists starter_spalten_trigger on auth.users;
create trigger starter_spalten_trigger
  after insert on auth.users
  for each row execute function public.starter_spalten();
