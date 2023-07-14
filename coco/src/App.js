import React, { useState } from 'react';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import { Home } from './pages/Home';
import { Course } from './pages/Course';
import { NotFound } from './pages/NotFound';
import { NewCourse } from './pages/NewCourse';
import { CoursesList } from './pages/Courses';
import { Aboutus } from './pages/Aboutus';
import { Login } from './pages/Login';
import { RegistrationForm } from './pages/Registration';
import { ToastContainer } from 'react-toastify';
import { Profile } from './pages/Profile';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ coursesUser: [] });

  return (
    <>
      <nav className="nav">
        <ul className="ul">
          <Link to="/"><img id="logo" src="https://img.freepik.com/premium-vector/chicken-logo-template-design-vector_20029-835.jpg" /></Link>
          <li className="menu">
            <Link className="link" to="/">Home</Link>
          </li>
          {isLoggedIn ? (
            <li className="menu">
              <Link className="link" to="/Courses">Courses</Link>
            </li>
          ) : ('')}
          <li className="menu">
            <Link className="link" to="/Aboutus">About Coco'</Link>
          </li>
          {isLoggedIn ? (
            <li className="menu">
              <Link className="link" to={`/Profile/${user ? user.id : ''}`}>{user ? <h3 style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: "5px", }}><img style={{ width: "30px" }} src='https://img.freepik.com/free-icon/user_318-159711.jpg' />{user.userName}</h3> : ''}</Link>
            </li>
          ) : (
            <li id="login">
              <Link className="login" to="/Login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Courses">
          <Route index element={<CoursesList user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path=":id" element={<Course />} />
          <Route path="new" element={<NewCourse />} />
        </Route>
        <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
        <Route path="/Profile/:id" element={<Profile user={user} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/Registration" element={<RegistrationForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer theme="colored" position="top-center" />
    </>
  );
}


export default App;