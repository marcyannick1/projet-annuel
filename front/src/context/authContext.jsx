import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Nouvel état de chargement
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decodedToken = jwtDecode(storedToken);

                if (decodedToken.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    setUser(null);
                    setIsSuperAdmin(false);
                } else {
                    const storedUser = localStorage.getItem('user');
                    const userData = storedUser ? JSON.parse(storedUser) : decodedToken;

                    setUser(userData);
                    setIsSuperAdmin(userData.isSuperAdmin);
                }
            } catch (error) {
                console.error("Erreur lors du décodage du token :", error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setIsLoading(false); // Fin du chargement après vérification
    }, []);

    const login = async (userData) => {
        setError(null);
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);

                const decodedUser = jwtDecode(data.token);
                setUser(decodedUser);
                setIsSuperAdmin(userData.isSuperAdmin);
                localStorage.setItem('user', JSON.stringify(decodedUser));
                navigate("/");
            } else {
                setError("Email ou mot de passe incorrect");
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsSuperAdmin(false);
        navigate("/LoginJSX");
    };

    const updateUser = (newUser) => {
        setUser(newUser);
        setIsSuperAdmin(newUser.isSuperAdmin);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    return (
        <AuthContext.Provider value={{ user, isSuperAdmin, updateUser, login, logout, error, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;