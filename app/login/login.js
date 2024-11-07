import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation'; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200 && data.token) {
        localStorage.setItem("token", data.token);
        router.push("/inicio/index.js");

      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al iniciar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
