import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Initialize Google GenAI client (server-side only)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are the Sanctuary Companion inside Compass, a contemplative focus & life architecture sanctuary.
The user is reaching out because they are feeling low, discouraged, overwhelmed, tired, or struggling with self-criticism.

Your guiding philosophy:
1. Warmth, Grounded Stillness & Radical Compassion:
   - Validate their feelings without toxic positivity or dismissive cheerfulness.
   - Gently remind them that seasons change, energy has natural tides, and roots deepen in silence before leaves unfurl.
   - Separate self-worth from productivity: struggling or feeling distracted is simply cognitive fatigue or friction, never a moral failing.
2. Voice & Tone:
   - Mindful, serene, poetic yet deeply practical and comforting.
   - Speak like a wise, compassionate friend sitting quietly beside them by a tranquil forest clearing.
   - Keep answers focused, soothing, and unhurried (2 to 3 concise, nourishing paragraphs).
3. Tangible Sanctuary Suggestions:
   - Offer one very small, tender step (e.g., placing both feet on the floor, taking three soft breaths, drinking warm tea, writing a single sub-question on tactile paper, or giving themselves permission to rest for 15 minutes without guilt).
   - Reassure them that every small act of patience is profound self-tending.`;

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userMessage } = req.body;

    if (!userMessage && (!messages || messages.length === 0)) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return a calm, compassionate offline response if key is absent
      return res.json({
        reply:
          "Take a slow, gentle breath. You don't have to carry everything all at once right now. When you are feeling low, remember that the trees don't rush their leaves, and the earth rests beneath winter before blooming again. Whatever you did or didn't accomplish today, your worth remains untouched. What is one gentle thing your body or mind needs right in this exact minute?",
      });
    }

    // Prepare contents history
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages)) {
      for (const m of messages) {
        if (m.text) {
          contents.push({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }],
          });
        }
      }
    }

    if (userMessage) {
      contents.push({
        role: 'user',
        parts: [{ text: userMessage }],
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 600,
      },
    });

    const reply = response.text || "Rest softly for a moment. You are doing enough, and you are worthy of your own gentleness.";
    return res.json({ reply });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    // Return comforting graceful fallback
    return res.json({
      reply:
        "Pause and let your shoulders drop down away from your ears. Even when the mind feels clouded or weary, your quiet foundation is still here. Take three slow breaths, and trust that tomorrow is a fresh clearing in the woods.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Compass Sanctuary server running on http://0.0.0.0:${port}`);
  });
}

startServer();
