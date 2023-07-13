

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



// export function Profile({ user, setIsLoggedIn, setUser }) {
//     const [loggedInUsers, setLoggedInUsers] = useState([]);
//     const navigate = useNavigate();

//     const handleDeleteCourse = async () => {
//         try {
//             await axios.delete(`http://localhost:8000/Registration/${user.coursesUser.id}`);

//             // Esegui altre azioni dopo l'eliminazione del corso, se necessario
//             toast.success('Corso eliminato con successo');

//             // Aggiorna lo stato dell'utente per rimuovere i dati del corso
//             setUser(prevUser => ({
//                 ...prevUser,
//                 coursesUser: null
//             }));
//         } catch (error) {
//             console.error('Error deleting course:', error);
//             toast.error('Errore durante l\'eliminazione del corso');
//         }
//     };



//     const handleLogout = async () => {
//         try {
//             await axios.put(`http://localhost:8000/Registration/${user.id}`, {
//                 logged: false,
//             });
//             setLoggedInUsers(false)
//             setIsLoggedIn(false)

//             // Esegui altre azioni dopo il logout, se necessario
//             toast.success('Logout eseguito con successo');
//             navigate('/login');
//         } catch (error) {
//             console.error('Error updating user logged status:', error);
//             toast.error('Errore durante il logout.');
//         }
//     };

//     useEffect(() => {
//         const fetchLoggedInUsers = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/Registration');
//                 setLoggedInUsers(response.data.filter(user => user.logged === true));
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchLoggedInUsers();
//     }, []);

//     return (
//         <>
//             <div className='page4'>
//                 <div className='first-b' style={{ width: "50%", display: "flex", alignSelf: "flex-start", margin: "20px", backdropFilter: "blur(20px)" }} key={user.id}>
//                     <h2>Welcome, {user.userName}! {user.gender === 'female' ? 'benvenuta' : 'benvenuto'} nella stalla, {user.userName} sta cercando un server che sappia a cosa gli serva</h2>
//                     {/* Render other user details here */}

//                     <button onClick={handleLogout}>Log Out</button>
//                 </div>

//                 <div className='page3'>
//                     {/* Render coursesUser details here */}
//                     {user.coursesUser && user.coursesUser.map((e) => (
//                         <div className="sxCardProfile" key={e.id}>
//                             <h2>{e.name}</h2>
//                             <img src={e.image} alt={e.name} />
//                             <button onClick={handleDeleteCourse} style={{ borderRadius: "50%", width: "50px", height: "50px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>X</button>
//                         </div>
//                     ))}
//                 </div>


//                 <div className='page3' style={{ width: "100%", height: "100vh" }}>{user.userName}</div>
//             </div>
//             <ToastContainer></ToastContainer>
//         </>

//     );
// }







//prova2 ///

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Profile({ user, setIsLoggedIn, setUser }) {
    const [loggedInUsers, setLoggedInUsers] = useState([]);
    // const [showCourses, setShowCourses] = useState([])
    const navigate = useNavigate();

    const handleDeleteCourse = async (courseId) => {
        try {
            await axios.delete(`http://localhost:8000/Registration/${courseId}`);

            // Esegui altre azioni dopo l'eliminazione del corso, se necessario
            toast.success('Corso eliminato con successo');

            // Aggiorna lo stato dell'utente per rimuovere il corso
            setUser(prevUser => ({
                ...prevUser,
                coursesUser: prevUser.coursesUser.filter(course => course.id !== courseId)
            }));
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('Errore durante l\'eliminazione del corso');
        }
    };

    const handleLogout = async () => {
        try {
            await axios.put(`http://localhost:8000/Registration/${user.id}`, {
                logged: false,
            });
            setLoggedInUsers(false)
            setIsLoggedIn(false)

            // Esegui altre azioni dopo il logout, se necessario
            toast.success('Logout eseguito con successo');
            navigate('/login');
        } catch (error) {
            console.error('Error updating user logged status:', error);
            toast.error('Errore durante il logout.');
        }
    };

    useEffect(() => {
        const fetchLoggedInUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/Registration');
                setLoggedInUsers(response.data.filter(user => user.logged === true));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchLoggedInUsers();
    }, []);

    // useEffect(() => {
    //     const fetchCourses = async () => {
    //         const resp = await axios.get('http://lolaclhost:8000/Registration');
    //         setShowCourses(resp.data)
    //     }
    //     fetchCourses()
    // }, [])

    return (
        <>
            <div className='page4'>
                <div className='first-b' style={{ width: "50%", display: "flex", alignSelf: "flex-start", margin: "20px", backdropFilter: "blur(20px)" }} key={user.id}>
                    <h2>Welcome, {user.userName}! {user.gender === 'female' ? 'benvenuta' : 'benvenuto'} nella stalla, {user.userName} sta cercando un server che gli serva</h2>
                    {/* Render other user details here */}

                    <button onClick={handleLogout}>Log Out</button>
                </div>

                <div className='page3'>
                    {/* Render coursesUser details here */}
                    {user.coursesUser && user.coursesUser.map((course) => (
                        <div className="sxCardProfile" key={course.id}>
                            <h2>{course.name}</h2>
                            <img src={course.image} alt={course.name} />
                            <button onClick={() => handleDeleteCourse(course.id)} style={{ borderRadius: "50%", width: "50px", height: "50px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>X</button>
                        </div>
                    ))}
                </div>


                <div className='page3' style={{ width: "100%", height: "100vh" }}>{user.userName}</div>
            </div>
            <ToastContainer></ToastContainer>
        </>
    );
}
