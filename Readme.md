# Supabase Notes Service

A minimal backend for storing personal notes using Supabase.

## 🧱 Schema

See `schema.sql`.

### Why?
- `uuid` IDs ensure uniqueness.
- Linked to `auth.users` via `user_id`.
- `title` is required, `content` is optional.
- `created_at` has a default timestamp.

## 🚀 Setup & Deploy

1. Clone project.
2. Setup Supabase project: https://app.supabase.com
3. Create the table:

   ```bash
   supabase db push


# 📬 Demo (cURL)

# ➕ POST /notes 
```curl -X POST https://<project>.functions.supabase.co/post_notes \```
 ``` -H "Authorization: Bearer <your-access-token>" \```
  ```-H "Content-Type: application/json" \```
 ``` -d '{"title":"Meeting Notes","content":"Call with design team"}'```

# Sample Output
{
  "id": "abc-uuid",
  "user_id": "user-uuid",
  "title": "Meeting Notes",
  "content": "Call with design team",
  "created_at": "2025-05-01T12:00:00Z"
}


# 📄 GET /notes```
```curl -X GET https://<project>.functions.supabase.co/get_notes \```
 ``` -H "Authorization: Bearer <your-access-token>"```

# Sample Output
[
  {
    "id": "abc-uuid",
    "title": "Meeting Notes",
    "content": "Call with design team",
    "created_at": "2025-05-01T12:00:00Z"
  }
]
