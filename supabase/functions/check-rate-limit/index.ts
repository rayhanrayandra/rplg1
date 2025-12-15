// supabase/functions/check-rate-limit/index.js

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

    const clientIp = req.headers.get('x-forwarded-for') || 'unknown'
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 3600000)

    // Get recent submissions
    const { data: recentSubmissions, error } = await supabaseClient
      .from('rate_limits')
      .select('created_at')
      .eq('ip_address', clientIp)
      .eq('action', 'SUBMIT')
      .gte('created_at', oneHourAgo.toISOString())
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Rate limit check error:', error)
      // Return default jika error
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            remaining: 5,
            isLimited: false,
            resetTime: null
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const submissionsCount = recentSubmissions?.length || 0
    const remaining = Math.max(0, 5 - submissionsCount)
    const isLimited = submissionsCount >= 5
    const resetTime = submissionsCount > 0 
      ? new Date(recentSubmissions[0].created_at).getTime() + 3600000
      : null

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          remaining,
          isLimited,
          resetTime
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Edge Function error:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false,
        data: {
          remaining: 5,
          isLimited: false,
          resetTime: null
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})