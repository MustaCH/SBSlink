import React, { createContext, useState, useContext } from "react";

const ClientContext = createContext();

export const useClient = () => useContext(ClientContext);

function ClientProvider({ children }) {
  const [clientData, setClientData] = useState(null);

  return (
    <ClientContext.Provider value={{ clientData, setClientData }}>
      {children}
    </ClientContext.Provider>
  );
}

export default ClientProvider;
