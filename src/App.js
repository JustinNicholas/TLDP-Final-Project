import './App.css';
import Directory from './Directory';
import Login from './Login';
import Profile from './Profile';
import {BrowserRouter, Route, Routes } from "react-router-dom";
function App() {

  return (
    <>
    <BrowserRouter>

    <Routes>
      <Route path = "/" element= {<Login />} />
      <Route path="/directory" element={<Directory />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
