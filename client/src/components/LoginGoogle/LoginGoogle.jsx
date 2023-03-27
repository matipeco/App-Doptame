import { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginWithGoogle() {
  const navigate = useNavigate();

  const onSuccess = async (response) => {
    console.log(response.accessToken);
    console.log(response.profileObj);

    try {
      // Envía el token al servidor mediante una solicitud HTTP POST
      const res = await axios.post(
        "http://localhost:3001/auth/apa/user/loginGoogle",
        {
          tokenId: response.tokenId,
        }
      );

      // Guarda el token de autenticación recibido del servidor en el almacenamiento local
      localStorage.setItem("token", res.data.token);

      // Navega a la página de inicio
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const onFailure = (response) => {
    console.log("Something went wrong");
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "817874744115-ee1kibhts2530v58ogrb55cn2jl3757c.apps.googleusercontent.com",
        scope: "profile email",
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <div className="center">
      <h1>Login</h1>

      <div className="btn">
        <GoogleLogin
          clientId={
            "817874744115-ee1kibhts2530v58ogrb55cn2jl3757c.apps.googleusercontent.com"
          }
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Continue with Google"
          cookiePolicy={"single_host_origin"}
          isSecure={true}
        />
      </div>
    </div>
  );
}

export default LoginWithGoogle;