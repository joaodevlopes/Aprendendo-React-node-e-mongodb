import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./App.css";
import "./pages/Home/style.css";
import Home from './pages/home';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
