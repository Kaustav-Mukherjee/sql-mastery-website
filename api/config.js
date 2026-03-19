export default function handler(req, res) {
  // Return Firebase configuration from environment variables
  res.status(200).json({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "sql-mastery-auth.firebaseapp.com",
    projectId: "sql-mastery-auth",
    storageBucket: "sql-mastery-auth.firebasestorage.app",
    messagingSenderId: "356247907572",
    appId: "1:356247907572:web:0b9badf5cfb69682f5c2a1",
    measurementId: "G-KZJ47QF6FN"
  });
}
