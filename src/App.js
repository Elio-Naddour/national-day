import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routers/routes';

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
