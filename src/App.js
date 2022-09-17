import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Form from './pages/form';
import FormAxios from './pages/form/indexAxios';
import UserDetails from './pages/form/userDetails';

function App() {
  return (
    <div>
      {/* <Form /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/userDetails/:id" element={<UserDetails />}></Route>
          <Route path="/formAxios" element={<FormAxios />}></Route>
          <Route path="/" element={<Form />}></Route>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
