import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onLogin = (e) => {
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

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setErrorMessage(errorMessage);
      });
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
              id="email-address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          <div className="flex justify-center">
            <button
              onClick={onLogin}
              className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-sm text-white text-center mt-4">
          No account yet?{" "}
          <NavLink to="/signup" className="text-indigo-500">
            Sign up
          </NavLink>
        </p>
      </section>
    </main>
  );
};

export default Login;
