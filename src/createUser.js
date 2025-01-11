import { axios, fs, csv, authenticate } from "./config.js";

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
                'Content-Type': 'application/json',
            },
        });
        console.log('User created successfully', response.data);
    } catch (error) {
        console.log('Error creating user', error.response ? error.response.data : error.message);

    }
}

// Read users from a CSV file and create each user
fs.createReadStream('users.csv')
    .pipe(csv())
    .on('data', (row) => {
        const userData = {
            displayName: row.displayName,
            mailNickname: row.mailNickname,
            userPrincipalName: row.userPrincipalName,
            password: row.password,
        };
        createUser(userData);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });

