import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function CoursesList({ user, setUser }) {
    const [courses, setCourses] = useState([]);


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


                    // Update the local state after successful enrollment
                    setCourses((prevCourses) =>
                        prevCourses.map((c) =>
                            c.id === courseId ? { ...c, posti: c.posti - 1 } : c
                        )
                    );
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
                <h1>Scegli il tuo corso</h1>
                <div className="box">
                    <ul className="corsi">
                        {courses.map((course) => (
                            <li key={course.id} className="card">
                                <div className="sxCard">
                                    <h2>
                                        {course.name}
                                    </h2>
                                    <img
                                        src={course.image}
                                        alt="courses"
                                    />
                                </div>

                                <div className="dxCard">
                                    <div className="dxDiv"

                                    >
                                        <h3 className="descrizione">Descrizione: </h3>
                                        <p className="p-courses">{course.descrizione}</p>
                                        <h3>
                                            {course.inizio !== "gia' iniziato"
                                                ? `inizio corso: ${course.inizio}`
                                                : `disponibile dal ${course.fine}`}
                                        </h3>
                                        <div className="iscriviti">
                                            <button
                                                onClick={() => handleEnroll(course, user)}

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
            </div >
            <ToastContainer></ToastContainer>
        </>
    );
}


