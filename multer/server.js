const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  // Access the uploaded file via req.file
  const file = req.file;
  res.send('File uploaded successfully!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// Handling Multiple File Uploads

const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Handle multiple file uploads
app.post('/upload', upload.array('files', 5), (req, res) => {
  // Access the uploaded files via req.files
  const files = req.files;
  res.send('Files uploaded successfully!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// Customizing file storage

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Custom storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  // Access the uploaded file via req.file
  const file = req.file;
  res.send('File uploaded successfully!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// Handling file validation 

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  // Access the uploaded file via req.file
  const file = req.file;
  res.send('File uploaded successfully!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});