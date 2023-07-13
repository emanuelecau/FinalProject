import axios from "axios"

async function getUsers() {
    const res = await axios.get("http://localhost:3000/users")
    console.log(res.data, res.status)
}
getUsers()