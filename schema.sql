create table notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  title text not null,
  content text,
  created_at timestamp with time zone default now()
);
