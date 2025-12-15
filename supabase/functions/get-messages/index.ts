// supabase/functions/get-messages/index.js

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { limit = 50, category = 'all' } = await req.json()

    let query = supabaseClient
      .from('ngl_messages')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })

    // Filter by category if specified
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    // Apply limit
    query = query.limit(limit)

    const { data, error } = await query

    if (error) {
      console.error('Error fetching messages:', error)
      throw error
    }

    return new Response(
      JSON.stringify({ success: true, data: data || [] }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Edge Function error:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'FETCH_ERROR',
        data: [] 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})