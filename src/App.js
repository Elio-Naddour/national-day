import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routers/routes';
// Firebase setup (you'll need to install firebase: npm install firebase)
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Firebase configuration - replace with your own
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "national-day-ba19f",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
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
