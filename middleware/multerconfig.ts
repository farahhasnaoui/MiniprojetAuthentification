import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Déterminer le type d'upload (user,ou quelque soit ) 
    const uploadType = req.baseUrl.split('/')[2]   //hethi pour model
    const year = new Date().getFullYear(); //bech ye5ou annee 

    const destPath = `uploads/${uploadType}/${year}/`;

    // Créer le dossier ken mouch mawjoud 
    fs.mkdirSync(destPath, { recursive: true });

    cb(null, destPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({ storage: storage });