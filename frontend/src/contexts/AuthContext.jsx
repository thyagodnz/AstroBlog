import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [userData, setUserData] = useState(null)
    const [isLoadingUserData, setIsLoadingUserData] = useState(true)

    useEffect(() => {
        const initialize = async () => {
            try {
                await fetchUserData()
            } catch (error) {
                if (error.response?.status === 401) {
                    setUserData(null)
                } else {
                    logout(true)
                }
            } finally {
                setIsLoadingUserData(false)
            }
        }

        initialize()
    }, [])

    const fetchUserData = async () => {
        const response = await api.get('/me')
        setUserData(response.data)
    }

    const login = async () => {
        await fetchUserData()
    }

    const logout = async (silent = false) => {
        try {
            if (!silent) {
                await api.post('/logout')
            }
        } catch (e) {
            console.warn('Erro ao fazer logout no servidor:', e)
        } finally {
            setUserData(null)
        }
    }

    const updateUserData = (newData) => {
        setUserData((prev) => ({ ...prev, ...newData }))
    }

    return (
        <AuthContext.Provider value={{ userData, login, logout, updateUserData, isLoadingUserData }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}