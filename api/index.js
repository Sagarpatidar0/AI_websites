const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
const multer = require('multer')
const OpenAIroute = require('./routes/OpenAI')
const Authroute = require('./routes/auth')
const Postroute = require('./routes/post')
require('./config/mongo') 

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, '/uploads')))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/api/upload',upload.single('file'),(req,res)=>{ 
  try {
    res.status(200).json(req.file.filename); 
    
  } catch (error) {
    res.status(500).json(error);
  }
});

app.use('/api', OpenAIroute);
app.use('/api', Authroute);
app.use('/api', Postroute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});