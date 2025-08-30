import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routers/routes';

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsW4bz5bSdvTugqTBChLrhXKdtTP5wHbU",
  authDomain: "national-day-ba19f.firebaseapp.com",
  projectId: "national-day-ba19f",
  storageBucket: "national-day-ba19f.firebasestorage.app",
  messagingSenderId: "326397426375",
  appId: "1:326397426375:web:fc7355c6060ddd9c6b1ce2",
  measurementId: "G-TM49ZJPBS0"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

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
// gsutil cors set cors.json gs://national-day-ba19f.appspot.com 
// gcloud init
// need more setup