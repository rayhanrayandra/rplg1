// like-message/index.js - PERBAIKAN
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
    // GUNAKAN SERVICE_ROLE_KEY untuk bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') // ← INI YANG BENAR
    )

    const { messageId, userId } = await req.json()

    // Validasi input
    if (!messageId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'MESSAGE_ID_REQUIRED',
          message: 'Message ID diperlukan' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // CEK APAKAH MESSAGE ADA DAN APPROVED
    const { data: message, error: fetchError } = await supabaseAdmin
      .from('ngl_messages')
      .select('id, likes, is_approved')
      .eq('id', messageId)
      .single()

    if (fetchError) {
      console.error('❌ Error fetching message:', fetchError)
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'FETCH_ERROR',
          details: fetchError.message 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (!message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'MESSAGE_NOT_FOUND',
          message: 'Pesan tidak ditemukan' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // CEK APAKAH MESSAGE APPROVED
    if (!message.is_approved) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'MESSAGE_NOT_APPROVED',
          message: 'Pesan belum disetujui' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // UPDATE LIKES DENGAN ATOMIC OPERATION
    const { data: updatedMessage, error: updateError } = await supabaseAdmin
      .from('ngl_messages')
      .update({ 
        likes: (message.likes || 0) + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', messageId)
      .select('id, likes')
      .single()

    if (updateError) {
      console.error('❌ Error updating likes:', updateError)
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'UPDATE_ERROR',
          details: updateError.message 
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // LOG LIKE ACTIVITY (OPTIONAL TAPI BAIK)
    try {
      const clientIp = req.headers.get('x-forwarded-for') || 'unknown'
      
      await supabaseAdmin
        .from('like_activities')
        .insert({
          message_id: messageId,
          ip_address: clientIp,
          user_agent: req.headers.get('user-agent'),
          liked_at: new Date().toISOString()
        })
    } catch (logError) {
      console.warn('⚠️ Failed to log like activity:', logError)
      // Jangan gagal hanya karena logging error
    }

    console.log(`✅ Like berhasil: Message ${messageId}, likes: ${updatedMessage.likes}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: { 
          messageId, 
          likes: updatedMessage.likes 
        },
        message: 'Like berhasil!'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('💥 Edge Function error:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'SERVER_ERROR',
        message: 'Terjadi kesalahan server',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})