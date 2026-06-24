export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Grab the hidden Google variable from Vercel environment configurations
  const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!googleScriptUrl) {
    return res.status(500).json({ error: 'Backend misconfiguration: Missing target sheet endpoint.' });
  }

  try {
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}