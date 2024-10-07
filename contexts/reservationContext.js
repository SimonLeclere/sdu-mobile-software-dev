import React, { createContext, useContext, useState } from 'react';

const ReservationContext = createContext();

export const useReservations = () => useContext(ReservationContext);

export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);

  const addReservation = async (reservation) => {    

      // wait 1s
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      setReservations([...reservations, reservation]);
  };

  return (
    <ReservationContext.Provider value={{ reservations, addReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};