import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/main.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Validar longitud mínima de la contraseña
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long.");
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErrorMessage(errorMessage);
      });
  };

  // Función para mostrar una alerta
  const showAlert = (fieldName, errorMessage) => {
    alert(`Please complete ${fieldName} ${errorMessage}`);
  };

  return (
    <main className="bg-gray-100 min-h-screen flex justify-center items-center">
      <section className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl mb-6 text-center font-semibold">FocusApp</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email-address" className="block mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email-address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
              onBlur={() => {
                if (!email) {
                  showAlert("email", "field.");
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              onBlur={() => {
                if (!password) {
                  showAlert("password", "field.");
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          <button
            type="submit"
            onClick={onSubmit}
            className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Sign up
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <NavLink to="/login" className="text-indigo-500">
            Log in
          </NavLink>
        </p>
      </section>
    </main>
  );
};

export default Signup;
