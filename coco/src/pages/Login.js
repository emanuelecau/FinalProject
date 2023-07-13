import App from '../App';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegistrationForm } from './Registration';

export function Login({ setIsLoggedIn, setUser }) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleLogin = async () => {

        try {
            const response = await axios.get("http://localhost:8000/Registration");
            const registrations = response.data;

            const matchedUser = registrations.find(
                user => user.userName === userName && user.email === email && user.password === password
            );

            if (matchedUser) {
                try {
                    await axios.put(`http://localhost:8000/Registration/${matchedUser.id}`, {
                        ...matchedUser,
                        logged: true,
                    });
                    setUser(matchedUser);
                    setIsLoggedIn(true)
                } catch (error) {
                    console.error("Error updating user logged status:", error);
                }

                toast.success('Login successful.');
                navigate('/Profile/' + matchedUser.id); // Reindirizza alla pagina del profilo con l'ID dell'utente
            } else {
                toast.error('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.log("Error details:", error);
            toast.error('Failed to fetch registration data.');
        }
    };

    return (
        <>
            <div className='log-box'>
                <div className="sec-b">
                    <img id="logo" src="https://png.pngtree.com/png-vector/20191009/ourlarge/pngtree-user-icon-png-image_1796659.jpg" alt="" />
                    <div className="space-div">
                        <label htmlFor="name">NameAccount</label>
                        <input style={{ border: "1px solid yellowgreen" }} value={userName} onChange={(e) => setUserName(e.target.value)} type="text" name="name" id="name" required />
                    </div>
                    <div className="space-div">
                        <label htmlFor="email">Email</label>
                        <input style={{ border: "1px solid yellowgreen" }} value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" required />
                    </div>
                    <div className="space-div">
                        <label htmlFor="password">Password</label>
                        <input style={{ border: "1px solid yellowgreen" }} value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" required />
                    </div>
                    <div className="space-div4">
                        <label htmlFor="password"></label>
                        <button style={{ color: "whitesmoke", backgroundColor: "yellowgreen", border: "1px solid yellow" }} type="button" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
            <p style={{ marginTop: "-170px", color: "black", fontSize: "23px", }}>ancora non sei registrato? che aspetti!  <Link style={{ fontSize: "32px", }} className="link" to="/Registration" element={<RegistrationForm />}> Registrati </Link>  </p>
            <ToastContainer></ToastContainer>
        </>
    );
}







//LOGINCORRETTTTOOOO???///


