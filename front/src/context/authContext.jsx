import {createContext, useState, useEffect, useContext} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
// import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState()

    const navigate = useNavigate()

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         try {
    //             const decodedToken = jwtDecode(token);
    //             setUser(decodedToken);
    //             setIsAuthenticated(true)
    //         } catch (e) {
    //             setUser(null);
    //             setIsAuthenticated(false)
    //         }
    //     }
    // }, []);

    const register = (formData) => {
        axios({
            method: 'post',
            url: "http://localhost:3000/register",
            data: formData
        }).then((response) => {
            if (response.status === 201) {
                navigate("/")
            }
        }).catch((error) => {
            setError("Email deja utilisé")
            console.log(error)
        })
    }

    const login = (formData) => {
        axios({
            method: 'post',
            url: "http://localhost:3000/login",
            data: formData
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate("/")
                setError(null)
            }
        }).catch((e)=>{
            console.error(e)
            setError(e.response.data.message)
        })
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
        navigate("/connection")
    };

    return (
        <AuthContext.Provider value={{login, register, logout, isAuthenticated, user, error, setError}}>
            {children}
        </AuthContext.Provider>
    );
};