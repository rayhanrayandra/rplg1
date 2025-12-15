// supabase/functions/submit-message/index.js

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { message, subject, category, ip } = await req.json()

    // Validasi input
    if (!message || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'MESSAGE_REQUIRED' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (message.length > 500) {
      return new Response(
        JSON.stringify({ success: false, error: 'CONTENT_TOO_LONG' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validasi kata kasar
    const badWords = ['anjing', 'bangsat', 'kontol', 'memek', 'asu', 'babi', 'goblok', 'tolol']
    const lowerMessage = message.toLowerCase()
    const lowerSubject = subject ? subject.toLowerCase() : ''
    
    const hasBadWord = badWords.some(word => 
      lowerMessage.includes(word) || 
      (subject && lowerSubject.includes(word))
    )
    
    if (hasBadWord) {
      return new Response(
        JSON.stringify({ success: false, error: 'INVALID_CONTENT' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Rate limiting dengan IP-based
    const clientIp = req.headers.get('x-forwarded-for') || 'unknown'
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 3600000)

    // Cek rate limit
    const { data: recentSubmissions, error: rateError } = await supabaseClient
      .from('rate_limits')
      .select('*')
      .eq('ip_address', clientIp)
      .gte('created_at', oneHourAgo.toISOString())

    if (rateError) {
      console.error('Rate limit check error:', rateError)
    }

    // Maksimal 5 pesan per jam
    if (recentSubmissions && recentSubmissions.length >= 5) {
      // Log attempt
      await supabaseClient
        .from('rate_limits')
        .insert([{ ip_address: clientIp, action: 'SUBMIT_ATTEMPT' }])

      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'RATE_LIMIT_EXCEEDED',
          resetTime: new Date(recentSubmissions[0].created_at).getTime() + 3600000
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Simpan rate limit
    await supabaseClient
      .from('rate_limits')
      .insert([{ ip_address: clientIp, action: 'SUBMIT' }])

    // Generate random emoji
    const emojis = ['🎉', '😅', '🙏', '🔥', '📈', '🤝', '✨', '💫', '😊', '👍']
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]

    // Insert pesan ke database
    const { data, error } = await supabaseClient
      .from('ngl_messages')
      .insert([{
        message: message.trim(),
        subject: subject?.trim() || 'Anonim',
        category: category || 'all',
        emoji: randomEmoji,
        likes: 0,
        is_approved: true,
        ip_address: clientIp
      }])
      .select()
      .single()

    if (error) {
      console.error('Database insert error:', error)
      throw error
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data,
        rateLimitRemaining: 4 - (recentSubmissions?.length || 0)
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Edge Function error:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'SERVER_ERROR',
        message: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})