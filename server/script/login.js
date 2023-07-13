import axios from "axios"

//come posso modificare il codsice qua sotto per fare in modo che scriva sul file la login di utente x e quindi a passare dei valori di username e password che non sono fissi ma invece cambiano controllando una corrispondenza nella registrazione?   

async function login() {
    const res = await axios.post("http://localhost:8000/login", {
        username: "emanuele",
        password: "lugnellu"
    })
    // qua ci sara' il write file con un await davanti? 
    console.log(res.data, res.status());

}
login()