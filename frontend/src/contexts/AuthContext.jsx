import { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token)
                setUserId(decoded.id)
            } catch (error) {
                console.error('Token inválido:', error)
                logout()
            }
        } else {
            setUserId(null)
        }
    }, [token])

    const login = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
    }

    const logout = () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ token, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
