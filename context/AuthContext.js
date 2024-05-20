import { createContext, useState } from 'react';

import { logar } from '../services/api';

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState({});

    async function login(mail, password) {
        const response = await logar(mail, password, setUser);

        const data = await response.json();

        if (response.ok) {
            setUser({
                id: data.user.id,
                username: data.user.username,
                profileType: data.user.profileType,
                name: data.user.name,
            });

            return "success";
        } else {
            return "Credenciais inválidas.";
        }
    };

    return (
        <AuthContext.Provider value={{ user, login }}>
            {children}
        </AuthContext.Provider>
    )
}