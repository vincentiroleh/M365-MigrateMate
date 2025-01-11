import 'dotenv/config';
import axios from 'axios';

async function authenticate() {
    const { TENANT_ID, CLIENT_ID, CLIENT_SECRET } = process.env;

    if (!TENANT_ID || !CLIENT_ID || !CLIENT_SECRET) {
        throw new Error('Missing required environment variables: TENANT_ID, CLIENT_ID, CLIENT_SECRET');
    }

    const authUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;

    try {
        const response = await axios.post(authUrl, new URLSearchParams({
            client_id: CLIENT_ID,
            scope: 'https://graph.microsoft.com/.default',
            client_secret: CLIENT_SECRET,
            grant_type: 'client_credentials'
        }));
        return response.data.access_token;
    } catch (error) {
        console.error('Error during authentication:', error.response ? error.response.data : error.message);
        throw error;
    }
}

authenticate().then(token => {
    console.log('Access Token:', token);
}).catch(error => {
    console.error('Authentication error:', error);
});

export default authenticate;