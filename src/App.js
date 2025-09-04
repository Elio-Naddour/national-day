import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routers/routes';
import Header from './components/header/header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
