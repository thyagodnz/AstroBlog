import { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null)
    const [userData, setUserData] = useState(null)
    const [isLoadingUserData, setIsLoadingUserData] = useState(true)

    useEffect(() => {
        const initialize = async () => {
            if (token) {
                try {
                    const decoded = jwtDecode(token)
                    const currentTime = Date.now() / 1000

                    if (decoded.exp && decoded.exp < currentTime) {
                        console.warn('Sessão expirada')
                        logout()
                    } else {
                        await fetchUserData()
                    }
                } catch (error) {
                    console.error('Token inválido:', error)
                    logout()
                }
            } else {
                setUserData(null)
            }

            setIsLoadingUserData(false)
        }

        initialize()
    }, [token])

    const fetchUserData = async () => {
        try {
            const response = await api.get(`/me`)
            setUserData(response.data)
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error)
            logout()
        }
    }

    const login = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
    }

    const logout = () => {
        setToken(null)
        setUserData(null)
        localStorage.removeItem('token')
    }

    const updateUserData = (newData) => {
        setUserData((prev) => ({ ...prev, ...newData }))
    }

    return (
        <AuthContext.Provider value={{ token, userData, login, logout, updateUserData, isLoadingUserData }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}