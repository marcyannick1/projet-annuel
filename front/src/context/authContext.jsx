import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);

            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
                setUser(null);
            } else {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                    setUser(decodedToken);
                }
            }
        }
    }, []);

    const login = async (userData) => {
        setError(null)
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
        navigate("/LoginJSX");
    };

    const updateUser = (newUser) => {
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    return (
        <AuthContext.Provider value={{ user, updateUser, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;