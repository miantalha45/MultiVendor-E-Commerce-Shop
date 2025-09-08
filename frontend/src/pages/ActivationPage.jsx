import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import axios from "axios";

function ActivationPage() {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          console.log(activation_token);
          const res = await axios.post(`${server}/user/activation`, {
            activation_token,
          });
          console.log(res);
        } catch (error) {
          console.log(error);
          setError(true);
        }
      };

      activationEmail();
    }
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {error ? (
        <p>Your token is expired</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
}

export default ActivationPage;
