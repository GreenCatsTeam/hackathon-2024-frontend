import { useContext, createContext, useState } from "react";
import axios from 'axios'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
 
  const loginActionJWT = async (data) => {
        setUser(data.email)
        setToken(data.jwtToken);
        localStorage.setItem("site", data.jwtToken);
  }

  const loginAction = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", data, {
          headers: {
              "Content-Type": "application/json",
              "Host": "localhost:8080",
              "Content-Length": JSON.stringify(data).length.toString()

          }
      }).then(res =>  {
        
        setUser(data.email)
        setToken(res.data.jwtToken);
        localStorage.setItem("site", res.data.jwtToken);
        
        return;
      });
      /*const res = response.data;
      if (res.data) {
          setUser(res.data.user);
          setToken(res.token);
          localStorage.setItem("site", res.token);
          //navigate("/dashboard");
          return;
      }
      throw new Error(res.message);*/
  } catch (err) {
      console.error(err);
  }
  };

  const logOut =  () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
   
    //navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};


