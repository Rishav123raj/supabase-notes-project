// get_notes.js
// Why: GET is used to retrieve resources, URL is /notes, no body required

import { serve } from 'https://deno.land/std@0.203.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_ANON_KEY'),
    { global: { headers: { Authorization: req.headers.get('Authorization') || '' } } }
  );

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError) return new Response(JSON.stringify({ error: userError.message }), { status: 401 });

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(JSON.stringify(data), { status: 200 });
});
