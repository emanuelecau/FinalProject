
import { Link } from 'react-router-dom'
import { RegistrationForm } from './Registration'


export function Home() {
    return (
        <>
            <main className="home">
                <div className="mid-cont">

                    <div className="mid-cont ">
                        <h1>CoCò</h1>

                        <p style={{ display: "flex", flexDirection: "row" }}> <div className="rowdiv"><div>Coworking</div> <div>or</div> <div>Coliving</div> <div>o'utsiders</div> </div>
                        </p>

                        <Link to='/registration' element={<RegistrationForm />}> <button type="button" style={{ width: "300px", backgroundColor: "white" }}> Subscribe</button> </Link>

                    </div>


                </div>
            </main>


        </>


    )
}
