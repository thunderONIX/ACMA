const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

export const logar = async (mail, password) => {
    try {
        return await fetch(`${BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: mail,
                password: password,
            }),
        });

    } catch (error) {
        console.error("Erro ao fazer login:", error.message);
        throw new Error("Erro ao autenticar usuário");
    }
}


export const fetchUserFunctions = async (profileType) => {
    try {
        const response = await fetch(`${BASE_URL}/user/functions/${profileType}`);

        if (!response.ok) {
            throw new Error(`Erro na requisição para obter funções do usuário: ${response.statusText}`);
        }

        const data = await response.json();
        return data.functions.map((func) => ({
            functionName: func.functionName,
            icon: func.icon,
        }));
    } catch (error) {
        console.error('Erro ao obter funções do usuário:', error.message);
        throw error;
    }
}

export const cadastrarUsuarios = async (username, senha, perfil, nome) => {
    try {
        const response = await fetch(`${BASE_URL}/user/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: senha,
                profileType: perfil,
                name: nome,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição para cadastrar usuário: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error.message);
        throw error;
    }
};

export const excluirUsuario = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/user/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição para excluir usuário: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error('Erro ao excluir usuário:', error.message);
        throw error;
    }
};

export const listarUsuarios = async (excludeUserId, profileType = '') => {
    try {
        const response = await fetch(`${BASE_URL}/user/users/${excludeUserId}${profileType ? `?profileType=${profileType}` : ''}`);

        if (!response.ok) {
            throw new Error(`Erro na requisição para listar usuários: ${response.statusText}`);
        }

        const data = await response.json();
        return data.users;
    } catch (error) {
        console.error('Erro ao listar usuários:', error.message);
        throw error;
    }
};