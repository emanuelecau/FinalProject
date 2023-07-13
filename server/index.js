import express from 'express';
import multer from 'multer';
import session from 'express-session';
import fs from 'node:fs/promises';
import _ from 'lodash';

let registrations = [];
const upload = multer({ dest: 'upload/' });

import {
    addCourses,
    deleteCourses,
    getCourses,
    getCoursesId,
} from './routesCourses.mjs';

import { getSoci } from './routesSoci.mjs';

const app = express();
import bodyParser from 'body-parser';
app.use(bodyParser.json());
import cors from 'cors';
app.use(cors({ origin: 'http://localhost:3000' }));

const port = 8000;
const pathCoursesID = '/Courses/:id';


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/Aboutus', getSoci);
app.get('/Courses', getCourses);
app.get(pathCoursesID, getCoursesId);
app.delete(pathCoursesID, deleteCourses);
app.post('/Courses', addCourses);




app.get('/Registration', async (req, res) => {
    try {
        const data = await fs.readFile('db/Registration.json');
        registrations = JSON.parse(data);
        res.send(registrations);
    } catch (error) {
        console.log(error);
        res.status(500).send('Errore nel server');
    }
});

app.get('/Registration/:id', async (req, res) => {
    const data = await fs.readFile('db/Registration.json');
    const registrations = JSON.parse(data);
    for (let i = 0; i < registrations.length; i++) {
        if (registrations[i].id == req.params.id) {
            res.send(registrations[i]);
            return;
        }
    }
    res.status(404).send({ message: "utente non trovato" });
});

app.post('/Registration', async (req, res) => {
    const { userName, email, password, avatar, gender } = req.body;

    try {
        // Leggi il file JSON esistente
        const data = await fs.readFile('db/Registration.json');
        const registrations = JSON.parse(data);

        // Trova l'ID massimo tra le registrazioni esistenti
        const maxID = registrations.reduce((max, reg) => (reg.id > max ? reg.id : max), 0);


        // Incrementa l'ID per la nuova registrazione
        const newID = maxID + 1;
        const coursesUser = []
        const registrationData = {
            id: newID, // Assegna l'ID all'oggetto della registrazione
            userName,
            email,
            password,
            avatar,
            gender,
            coursesUser

        };

        // Aggiungi i dati di registrazione all'array delle registrazioni
        registrations.push(registrationData);

        // Scrivi il file JSON aggiornato
        await fs.writeFile('db/Registration.json', JSON.stringify(registrations, null, ' '));

        res.status(200).send('Registrazione completata con successo');
    } catch (err) {
        console.log(err);
        res.status(500).send('Errore nel server');
    }
});


app.post('/login', (req, res) => {
    const { userName, email, password } = req.body;

    // Verifica se l'utente è presente nella lista degli utenti registrati
    const user = registrations.find(
        (user) => user.email === email && user.password === password && user.userName === userName
    );

    if (user) {
        res.json({ message: 'Login effettuato con successo' });
        res.redirect('/Profile/:id');
        res.send(req.body.userName)
    } else {
        res.status(400).json({ error: 'Credenziali di accesso errate' });
    }
});

app.get('/profile/:id', async (req, res) => {

    const data = await fs.readFile('db/Registration.json');
    const profileUser = JSON.parse(data);
    for (let i = 0; i < profileUser.length; i++) {
        if (profileUser[i].id == req.params.id) {
            res.send(profileUser[i]);
            return;
        }
    }
    res.status(404).send({ message: "utente non trovato" });
});
app.put('/Courses/:id', async (req, res) => {
    const idCourses = req.params.id;
    const coursesData = JSON.parse(await fs.readFile("db/Courses.json"));

    for (let i = 0; i < coursesData.length; i++) {
        if (coursesData[i].id == idCourses && coursesData[i].posti > 0) {
            coursesData[i].posti -= 1;

            await fs.writeFile("db/Courses.json", JSON.stringify(coursesData, null, '  '));

            // Aggiungi le informazioni del corso all'oggetto coursesUser nel JSON dei registrati
            const registrationData = JSON.parse(await fs.readFile("db/Registration.json"));
            let updatedRegistrationData = [...registrationData];
            let userId = updatedRegistrationData.id
            for (let j = 0; j < updatedRegistrationData.length; j++) {
                if (updatedRegistrationData[j].logged === true && updatedRegistrationData[j].id === userId) {
                    const isCourseAlreadyAdded = updatedRegistrationData[j].coursesUser.some(course => course.id === coursesData[i].id);
                    if (!isCourseAlreadyAdded) {
                        updatedRegistrationData[j].coursesUser.push(coursesData[i]);
                    }
                }
            }

            await fs.writeFile("db/Registration.json", JSON.stringify(updatedRegistrationData, null, '  '));
            res.status(201).send({ message: 'corso aggiunto' });

            return;
        }
    }


    res.status(404).send({ message: 'Corso esaurito' });
});

app.put('/Registration/:id', async (req, res) => {
    const { id } = req.params;
    const updatedUserData = req.body;

    try {
        const data = await fs.readFile('db/Registration.json');
        const registrations = JSON.parse(data);
        const updatedRegistrations = registrations.map(user => {
            if (user.id.toString() === id) {
                return {
                    ...user,
                    ...updatedUserData,
                };
            }
            return user;
        });

        await fs.writeFile('db/Registration.json', JSON.stringify(updatedRegistrations, null, ' '));

        res.send(updatedRegistrations.find(user => user.id.toString() === id));
    } catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).send('Failed to update user data.');
    }
});
app.delete('/Registration/:id', async (req, res) => {
    const courseId = parseInt(req.params.id); // Converto l'id in un numero intero

    try {
        // Leggi i dati dei registrati dal file JSON
        const registrationData = JSON.parse(await fs.readFile('db/Registration.json'));

        // Cerca l'utente registrato che contiene il corso da eliminare
        const userIndex = registrationData.findIndex(user =>
            user.coursesUser && user.coursesUser.some(course => course.id === courseId)
        );

        if (userIndex !== -1) {
            // Rimuovi il corso dalla proprietà coursesUser dell'utente registrato
            registrationData[userIndex].coursesUser = registrationData[userIndex].coursesUser.filter(
                course => course.id !== courseId
            );

            // Aggiorna il file JSON con i nuovi dati dei registrati
            await fs.writeFile('db/Registration.json', JSON.stringify(registrationData, null, '  '));

            res.status(200).send({ message: 'Corso eliminato con successo' });
        } else {
            res.status(404).send({ message: 'Corso non trovato' });
        }
    } catch (error) {
        console.error('Errore durante l\'eliminazione del corso:', error);
        res.status(500).send({ message: 'Errore durante l\'eliminazione del corso' });
    }
});





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});











