import express from 'express';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Your Firebase configuration from the Firebase console
const firebaseConfig = {
    apiKey: "AIzaSyBZJpUkDfGUO0x2P24LXlAH25klGfGoc74",
    authDomain: "synth-bc6c1.firebaseapp.com",
    projectId: "synth-bc6c1",
    storageBucket: "synth-bc6c1.appspot.com",
    messagingSenderId: "573326753740",
    appId: "1:573326753740:web:934f5e53a3ec4ee0a16769"
  };
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const app = express();
const PORT = 3000;


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index'); 
  });

// Serve the sign-up page
app.get('/signup', (req, res) => {
    res.render('signup');
    
});

// Handle the sign-up request
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // User created successfully, redirect to index page
      res.redirect('/'); 
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  });

// Serve the login page
app.get('/login', (req, res) => {
  res.render('login');
});

// Handle the login request
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User signed in successfully, redirect to index page
      res.redirect('/'); 
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  });
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // User created successfully, redirect to index page
    res.redirect('/'); 
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

