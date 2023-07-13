
// import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
//useparams ci permette di passare :id del percorso mpath a comparsa sul nostro file in modo da modularizzare il contenuto :id dei corsi
//e' un parametro dinamico uno dei tanti state presenti all'interno di react
export function Course() {
    const { id } = useParams()
    return (
        <h1>Course {id}</h1>
    )
}