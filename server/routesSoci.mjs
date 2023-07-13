
import Soci from "./db/Soci.json" assert {type: "json"}

const DB_PATH = "db/Soci.json" // qua devo specificare il path del file che andra' modificato e non il path relativo alla posizione nel server

export const getSoci = (req, res) => {
    res.send(Soci)
}

