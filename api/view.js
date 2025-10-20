import fs from 'fs';
import path from 'path';

export default function handler(req,res){
  const {slug} = req.query;
  if(!slug) return res.status(400).send('Missing slug');

  try {
    const filePath = path.join('/tmp', slug + '.json');
    if(!fs.existsSync(filePath)) return res.status(404).send('Not found');

    const payload = JSON.parse(fs.readFileSync(filePath,'utf-8'));
    res.setHeader('Content-Type','application/json');
    res.json(payload);
  } catch(e){
    res.status(500).send('Server error');
  }
}
