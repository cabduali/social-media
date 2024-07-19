import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from './Header';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import Groups from './pages/Groups';
import Gaming from './pages/Gaming';
import SideBar from './components/SideBar';

function App() {
  return (
 
      <div className="App bg-gray-900 min-h-screen flex-1 p-4">
        <Header />
        <SideBar/>
        <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Groups />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Gaming />} />
        </Routes>
      </div>
   
  );
}

export default App;
