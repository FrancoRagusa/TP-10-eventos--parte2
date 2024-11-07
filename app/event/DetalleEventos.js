"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './detalleEventos.css'; 

const EventDetail = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    const idFromQuery = new URLSearchParams(window.location.search).get('id');
    if (idFromQuery) {
      const fetchEvento = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/event/${idFromQuery}`);
          const data = await response.json();
          setEvento(data[0]); 
        } catch (e) {
          console.warn(e);
        } finally {
          setLoading(false);
        }
      };

      fetchEvento();
    }
  }, []);

  if (loading) {
  }

  if (!evento) {
    return <div className={styles.container}><h1>No existe este eventos</h1></div>;
  }

  return (
    <>
      <Header />
      <main className={styles.container}>
        <h1>{evento.name}</h1>
        <h2>{evento.description}</h2>
        <h3>Duración: {evento.duration_in_minutes} minutos</h3>
        <h4>Precio: ${evento.price}</h4>
        <button onClick={() => router.push('/inicio')}>Regresar</button>
      </main>
      <Footer />
    </>
  );
};

export default EventDetail;
