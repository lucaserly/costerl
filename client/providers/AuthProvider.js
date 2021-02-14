import React, { useContext, useState } from 'react';

const AuthContext = React.createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={[authenticated, setAuthenticated]}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthProvider,
  useAuth,
};
