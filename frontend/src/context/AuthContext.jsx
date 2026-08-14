import { createContext, useState, useEffect } from "react";
import { getMe } from "../features/auth/services/auth.service";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function clearUser() {
        setUser(null);
    }

    useEffect(() => {
        async function initializeAuth() {
            try {
                const response = await getMe();

                setUser(response.data.user);
            } catch (error) {
                clearUser();
            } finally {
                setLoading(false);
            }
        }

        initializeAuth();
    }, []);

    useEffect(() => {
        function handleUnauthorized(){
            clearUser();
            console.log("unauthorized access")
        }

        window.addEventListener("unauthorized", handleUnauthorized)

        return ()=>{
            window.removeEventListener("unauthorized", handleUnauthorized)
        }
    },[]);

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                setUser,
                clearUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
export default AuthContext;