import './App.css';
import Auth from './components/pages/Auth/Auth';
//import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
//import { Routes, Route } from 'react-router-dom';
import { Routes, Route } from "react-router-dom"




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Auth/> } />
    
      </Routes>
     
     
     
      </div>

      
    
  );
}

export default App;
