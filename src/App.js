import { Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './App.scss';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/Homepage';
import AddCategory from './components/AddCategories';
import AddCar from './components/AddCar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path="/add-category" element={<AddCategory />} />
      </Routes>
    </div>
  );
}

export default App;
