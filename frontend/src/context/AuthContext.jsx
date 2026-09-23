import { createContext, useContext, useState, useEffect } from "react"
import api from "../api/axiosInstance";

const AuthContext = createContext()


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, [])


    const login = (userData, token) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)

    }

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (err) {
            // even if backend call fails, still clear frontend session
            console.error("Logout request failed:", err.message);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
        }
    }

    return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)