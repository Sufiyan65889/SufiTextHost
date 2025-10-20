// Simple serverless function to save text
import fs from 'fs';
import path from 'path';

export default async function handler(req, res){
  if(req.method !== 'POST'){
    return res.status(405).json({ok:false,error:'Method not allowed'});
  }

  try {
    const {slug,text,font,bg,fontSize} = await req.json();

    if(!slug || !text) return res.json({ok:false,error:'Missing slug or text'});

    // Save file
    const filePath = path.join('/tmp', slug + '.json'); // /tmp in Vercel serverless
    const payload = {text,font,bg,fontSize,slug,created:Date.now()};
    fs.writeFileSync(filePath, JSON.stringify(payload));

    res.json({ok:true});
  } catch(err){
    res.json({ok:false,error:err.message});
  }
}
