import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function RegistrationForm() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, genderchange] = useState("female");
    const [registrations, setRegistrations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const response = await axios.get("http://localhost:8000/Registration");
                setRegistrations(response.data);
            } catch (error) {
                console.log("Error fetching registration data:", error);
            }
        };

        fetchRegistrations();
    }, []);

    const IsValidate = () => {
        let isProceed = true;
        let errorMessage = 'Please enter a value in ';

        if (!userName) {
            isProceed = false;
            errorMessage += 'userName';
        }
        if (!password) {
            isProceed = false;
            errorMessage += 'password';
        }
        if (!email) {
            isProceed = false;
            errorMessage += 'email';
        }

        if (registrations.some((user) => user.userName === userName)) {
            isProceed = false;
            toast.warning('Username already exists. Please choose a different one.');
        }

        if (registrations.some((user) => user.email === email)) {
            isProceed = false;
            toast.warning('Email already registered. Please use a different one.');
        }

        if (!isProceed) {
            toast.warning(errorMessage);
        } else {
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                isProceed = false;
                toast.warning('Please enter a valid email');
            }
        }

        return isProceed;
    };

    const handleSubmit = async () => {
        let regobj = {
            userName, password, email, gender,
        };
        if (IsValidate()) {
            try {
                await axios.post("http://localhost:8000/Registration", regobj);
                toast.success('Registered successfully.');
                navigate('/login');
            } catch (error) {
                console.log("Error details:", error);
                // toast.error('Failed: ' + error.message);
            }
        } else {
            toast.warning('Please fill in all fields correctly.');
        }
    };

    return (
        <>
            <div className='log-box'>
                <div className="first-b" style={{ height: "fit-content" }}>
                    <img id="logo" src="https://png.pngtree.com/png-vector/20191009/ourlarge/pngtree-user-icon-png-image_1796659.jpg" alt="" />
                    <form>
                        <div className="space-div">
                            <label htmlFor="name">NameAccount</label>
                            <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" name="name" id="name" required />
                        </div>
                        <div className="space-div">
                            <label htmlFor="email">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" required />
                        </div>
                        <div className="space-div">
                            <label htmlFor="password">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" required />
                        </div>
                        <div className="space-div">
                            <div className="form-group">
                                <label>Gender</label>
                                <br></br>
                                <input type="radio" checked={gender === 'male'} onChange={e => genderchange(e.target.value)} name="gender" value="male" className="app-check"></input>
                                <label>Male</label>
                                <input type="radio" checked={gender === 'female'} onChange={e => genderchange(e.target.value)} name="gender" value="female" className="app-check"></input>
                                <label>Female</label>
                            </div>
                        </div>
                        <div className="space-div4">
                            <label htmlFor="password"></label>
                            <button type="button" onClick={handleSubmit}>Sign-In</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </>
    );
}




