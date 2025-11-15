// server.js
// Express server that forwards registrations to Telegram Bot API
// This version supports CORS so the client can be hosted on GitHub Pages or elsewhere.
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); // allow cross-origin requests (adjust in production)
app.use(express.json());

const TOKEN = process.env.TG_BOT_TOKEN;
const CHAT = process.env.TG_CHAT_ID;

if(!TOKEN || !CHAT) {
  console.warn("WARNING: TG_BOT_TOKEN or TG_CHAT_ID not set in environment.");
}

app.post('/notify', async (req, res) => {
  try {
    const { type, value, timestamp } = req.body || {};
    if(!type || !value) return res.status(400).json({ ok:false, msg:'missing fields' });

    const text = `🔔 تسجيل جديد\nالطريقة: ${type}\nالقيمة: ${value}\nالوقت: ${timestamp || new Date().toISOString()}`;

    const tgUrl = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    const payload = { chat_id: CHAT, text };

    const r = await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await r.json();
    if(!data.ok) {
      console.error('Telegram API response error:', data);
      return res.status(502).json({ ok:false, tg:data });
    }
    return res.json({ ok:true, tg:data });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ ok:false, error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Notify server running on port', port));
