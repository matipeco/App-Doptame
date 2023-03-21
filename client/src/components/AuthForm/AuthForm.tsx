import { useState } from "react";
import { Login } from "../Login/Login";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";

export const AuthForm = () => {
    const [isLoginView, setIsLoginView] = useState(true);

    // function handleToggleView() {
    //     setIsLoginView(!isLoginView);
    // }


    return (
        <div>
            {/* <button onClick={handleToggleView}>
                {isLoginView ? "Switch to Sign Up" : "Switch to Login"}
            </button> */}


            <div>
                <Link to='/login'><button>Login</button></Link>
                <Link to='/formUser'><button>Registrarse como Usuario</button></Link>
                <Link to='/formApa'><button>Registrarse como Apa</button></Link>
            </div>

        </div>
    );
}