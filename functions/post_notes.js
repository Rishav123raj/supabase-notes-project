// post_notes.js
// Why: POST is used to create resources, URL is /notes, and input is from request body

import { serve } from 'https://deno.land/std@0.203.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_ANON_KEY'),
    { global: { headers: { Authorization: req.headers.get('Authorization') || '' } } }
  );

  const { title, content } = await req.json();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError) return new Response(JSON.stringify({ error: userError.message }), { status: 401 });

  const { data, error } = await supabase
    .from('notes')
    .insert([{ user_id: user.id, title, content }])
    .select();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(JSON.stringify(data[0]), { status: 201 });
});
