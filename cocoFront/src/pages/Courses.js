
//prova 3 TAP MTAP

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function CoursesList({ user, setUser }) {
    const [courses, setCourses] = useState([]);
    console.log(user.coursesUser);

    useEffect(() => {
        async function getCourses() {
            const res = await axios.get("http://localhost:8000/Courses");
            setCourses(res.data);
        }
        getCourses();
    }, []);


    async function handleEnroll(course, user) {

        const courseId = course.id;

        if (course.posti > 0 && course.inizio !== "gia' iniziato") {
            try {
                // Check if the user is already enrolled in the course
                const isEnrolled = Array.isArray(user.coursesUser) && user.coursesUser.some(c => c.id === courseId);

                if (isEnrolled) {
                    toast.warning("Sei già iscritto a questo corso.");
                } else if (Array.isArray(user.coursesUser) && user.coursesUser.length >= 2) {
                    toast.warning("Hai raggiunto il limite massimo di iscrizioni.");
                } else {
                    // Update the course's available seats
                    await axios.put(`http://localhost:8000/Courses/${courseId}`, {
                        ...course,
                        posti: course.posti - 1,
                    });
                    console.log(user.coursesUser);
                    // Update the user's enrolled courses
                    const updatedCoursesUser = user.coursesUser ? [...user.coursesUser, course] : [course];
                    await axios.put(`http://localhost:8000/Registration/${user.id}`, {
                        ...user,
                        logged: true,
                        coursesUser: updatedCoursesUser,
                    });

                    // const updatedUserRes = await axios.get(`http://localhost:8000/Users/${user.id}`);
                    // setUser(updatedUserRes.data);

                    // Update the local state after successful enrollment
                    setCourses((prevCourses) =>
                        prevCourses.map((c) =>
                            c.id === courseId ? { ...c, posti: c.posti - 1 } : c
                        )
                    );
                    console.log(user);
                    setUser((prevUser) => {
                        if (Array.isArray(prevUser.coursesUser)) {
                            return {
                                ...prevUser,
                                coursesUser: [...updatedCoursesUser],
                            };
                        } else {
                            return {
                                ...prevUser,
                                coursesUser: updatedCoursesUser,
                            };
                        }
                    });




                    toast.success("Iscrizione effettuata con successo!");
                }
            } catch (error) {
                console.error("Errore durante l'iscrizione:", error);
                toast.warning("Errore durante l'iscrizione");
            }
        } else {
            toast.warning("Impossibile iscriversi al corso.");
        }
    }

    return (
        <>
            <div className="page">
                <h1 style={{ fontSize: "50px", padding: "50px" }}>Scegli il tuo corso</h1>
                <div className="box">
                    <ul className="corsi">
                        {courses.map((course) => (
                            <li style={{ margin: "50px" }} key={course.id} className="card">
                                <div className="sxCard">
                                    <h2 style={{ fontSize: "40px", margin: "20px", marginTop: "0" }}>
                                        {course.name}
                                    </h2>
                                    <img
                                        src={course.image}
                                        alt="courses"
                                        width="300"
                                        height="380px"
                                        style={{
                                            objectFit: "cover",
                                            border: "1px solid",
                                            backgroundColor: "#fd5f00",
                                            borderRadius: "10px",
                                            color: "white",
                                        }}
                                    />
                                </div>

                                <div className="dxCard">
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-around",
                                        }}
                                    >
                                        <h3 className="descrizione">Descrizione: </h3>
                                        <p className="p-courses">{course.descrizione}</p>
                                        <h3>
                                            {course.inizio !== "gia' iniziato"
                                                ? `inizio corso: ${course.inizio}`
                                                : `disponibile dal ${course.fine}`}
                                        </h3>
                                        <div
                                            className="iscriviti"
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                marginTop: "20px",
                                            }}
                                        >
                                            <button
                                                onClick={() => handleEnroll(course, user)}
                                                style={{
                                                    display: "flex",
                                                    justifySelf: "center",
                                                    alignSelf: "center",
                                                    width: "120px",
                                                    textAlign: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {course.posti > 0 && course.inizio !== "gia' iniziato"
                                                    ? "Iscriviti"
                                                    : "Chiuso"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </>
    );
}










//funzione giusta aggiunta corsi utente

//     async function handleEnroll(course, user) {
    //         const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    //         console.log(course.data + ' aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    //         const courseId = course.id;
    //         if (course.posti > 0 && course.inizio !== "gia' iniziato" && course.id) {
    //             try {
    //                 await axios.put(`http://localhost:8000/Courses/${courseId}`, {
    //                     ...course,
    //                     posti: course.posti - 1,
    //                 });
    //                 await axios.put(`http://localhost:8000/Registration/${user.id}`, {
    //                     ...user,
    //                     coursesUser: [{ ...course }]
    //                 })
    //                 // Update the local state after successful enrollment
    //                 setCourses((prevCourses) =>
    //                     prevCourses.map((c) =>
    //                         c.id === courseId ? { ...c, posti: c.posti - 1 } : c
    //                     )
    //                 );
    //                 toast.success("Iscrizione effettuata con successo!");
    //                 // navigate(`/Profile/${user.id}`)

    //             } catch (error) {
    //                 console.error("Errore durante l'iscrizione:", error);
    //                 toast.warning("Errore durante l'iscrizione");
    //             }
    //         } else {
    //             toast.warning("Impossibile iscriversi al corso.");
    //         }
    //     }
