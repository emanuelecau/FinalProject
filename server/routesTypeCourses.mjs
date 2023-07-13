import Courses from "./db/Courses.json"  assert { type: 'json' }
import TypeCourses from "./db/typeCourses.json"  assert { type: 'json' }

export const CoursesByType = (req, res) => {

    let typeID
    for (let i = 0; i < TypeCourses.length; i++) {
        if (TypeCourses[i].type.toLowerCase() == req.params.type) {
            typeID = TypeCourses[i].id
        }
    }
    let filtered = Courses.filter((p) => {
        if (p.typeCourses == typeID) {
            return p
        }
    })

    res.send(filtered)

    if (!typeID) { res.status(404).end() }
}