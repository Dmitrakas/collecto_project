const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dodebtfwq', 
  api_key: '271793643133581', 
  api_secret: 'A9UJ0BPc46-kJtHt028cW5MaxOk' 
});

module.exports = cloudinary;
