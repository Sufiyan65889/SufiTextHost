import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { slug } = req.query;

  if (!slug) return res.status(400).json({ ok: false, error: 'Missing slug' });

  try {
    // Serverless environment me /tmp folder hi writable hai
    const filePath = path.join('/tmp', slug + '.json');

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ ok: false, error: 'Not found' });
    }

    const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Return JSON with text + formatting
    return res.status(200).json({ ok: true, data: payload });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}