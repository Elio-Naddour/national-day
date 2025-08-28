import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routers/routes';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsW4bz5bSdvTugqTBChLrhXKdtTP5wHbU",
  authDomain: "national-day-ba19f.firebaseapp.com",
  projectId: "national-day-ba19f",
  storageBucket: "national-day-ba19f.firebasestorage.app",
  messagingSenderId: "326397426375",
  appId: "1:326397426375:web:fc7355c6060ddd9c6b1ce2",
  measurementId: "G-TM49ZJPBS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);// Initialize Firebase
export const storage = getStorage(app);
console.log(analytics);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
