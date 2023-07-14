import fs from 'node:fs/promises'
import Courses from "./db/Courses.json" assert {type: "json"}
import Registration from "./db/Registration.json" assert {type: "json"}


const DB_PATH = "db/Courses.json" // qua devo specificare il path del file che andra' modificato e non il path relativo alla posizione nel server

export const getCourses = (req, res) => {
    res.send(Courses)
}

export const getCoursesId = (req, res) => {
    for (let i = 0; i < Courses.length; i++) {
        if (Courses[i].id == req.params.id) {

            res.send(Courses[i])
            res.status(200).end()
            return
        }
    }
    res.send({ message: "corso non trovato" })
}

export const deleteCourses = async (req, res) => {
    let index = -1

    for (let i = 0; i < Courses.length; i++) {
        if (Courses[i].id == req.params.id) {
            index = i
        }
    }

    if (index == -1) {
        res.status(404).end()
    } else {
        Courses.splice(index, 1)
        await fs.writeFile(DB_PATH, JSON.stringify(Courses, null, '  '))

        res
            .status(201)
            .send({
                message: 'corso calcellato'
            })
        res.status(200).end()
    }
}

export const addCourses = async (req, res) => {
    let lastID = Courses.reduce((comulator, p) => p.id > comulator ? p.id : comulator, 0)
    lastID++
    Courses.push({ ...{ "id": lastID }, ...req.body })
    console.log(Courses);
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(Courses, null, '  '))
        res
            .status(201)
            .send({
                message: 'corso creato'
            })
    } catch (error) {
        console.log(error);
    }
    res.status(200).end()
}
