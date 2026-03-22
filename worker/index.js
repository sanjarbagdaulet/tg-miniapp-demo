const ALLOWED_ORIGIN = 'https://sanjarbagdaulet.github.io';

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const body = await request.json();
      const { method } = body;

      if (method === 'sendMessage') {
        const result = await sendMessage(env.BOT_TOKEN, body);
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (method === 'getPosters') {
        const posters = [
          'https://image.tmdb.org/t/p/w500/wNEHNqo3MgHmj3BUiPSqqq5czcm.jpg',
          'https://image.tmdb.org/t/p/w500/46xqGOwHbh2TH2avWSw3SMXph4E.jpg',
          'https://image.tmdb.org/t/p/w500/lUtVoRukW7WNtUySwd8hWlByBds.jpg',
        ];
        return new Response(JSON.stringify({ ok: true, posters }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ error: 'Unknown method' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }
};

async function sendMessage(token, body) {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: body.chat_id,
      text: body.text || 'Hello, World!',
    }),
  });
  return response.json();
}