"use client";
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserContext } from '../userContext'; 
import styles from "../page.module.css";

const Home = () => {
  const [eventos, setEventos] = useState([]);
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      router.push("/"); 
      return;
    }

    const fetchEventos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/event');
        const data = await response.json();
        setEventos(data);
      } catch (error) {
        console.warn(error);
      }
    };

    fetchEventos();
  }, [user, router]);

  return (
    <>
      <Header />
      <main className={styles.container}>
        <h1>Eventos</h1>
        <div className={styles.eventList}>
          {eventos.length > 0 ? (
            eventos.map((event) => (
              <div key={event.id} className={styles.eventItem}>
                <h2>{event.name}</h2>
                <p>{event.description}</p>
                <button onClick={() => router.push(`/detalleEvento?id=${event.id}`)}>
                  Ver detalles
                </button>
              </div>
            ))
          ) : (
            <p>No existen eventos</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
