import { axios, authenticate } from "./config.js";

async function createUser(userData) {
    const token = await authenticate();

    const user = {
        accountEnabled: true,
        displayName: userData.displayName,
        mailNickname: userData.mailNickname,
        userPrincipalName: userData.userPrincipalName,
        passwordProfile: {
            password: userData.password,
            forceChangePasswordNextSignIn: true,
        },
    };

    try {
        const response = await axios.post('https://graph.microsoft.com/v1.0/users', user, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('User created successfully', response.data);
    } catch (error) {
        console.log('Error creating user', error.response ? error.response.data : error.message);
        
    }
}

// Example: Create a user with dummy data
const userData = {
    displayName: 'John Doe',
    mailNickname: 'johndoe',
    userPrincipalName: 'johndoe@ym4df.onmicrosoft.com',
    password: '@Password123',
};

createUser(userData);