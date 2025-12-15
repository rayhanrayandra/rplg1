// supabase/functions/get-stats/index.js

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

    // Get total messages count
    const { count: totalMessages, error: countError } = await supabaseClient
      .from('ngl_messages')
      .select('*', { count: 'exact', head: true })
      .eq('is_approved', true)

    if (countError) throw countError

    // Get total likes
    const { data: messages, error: likesError } = await supabaseClient
      .from('ngl_messages')
      .select('likes')
      .eq('is_approved', true)

    if (likesError) throw likesError

    const totalLikes = messages?.reduce((sum, msg) => sum + (msg.likes || 0), 0) || 0

    // Get today's messages
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { count: messagesToday, error: todayError } = await supabaseClient
      .from('ngl_messages')
      .select('*', { count: 'exact', head: true })
      .eq('is_approved', true)
      .gte('created_at', today.toISOString())

    if (todayError) throw todayError

    const stats = {
      totalMessages: totalMessages || 0,
      totalLikes,
      messagesToday: messagesToday || 0
    }

    return new Response(
      JSON.stringify({ success: true, data: stats }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Edge Function error:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'STATS_ERROR',
        data: {
          totalMessages: 0,
          totalLikes: 0,
          messagesToday: 0
        }
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})