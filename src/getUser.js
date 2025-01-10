import { axios, authenticate } from "./config.js";

async function getUser(userId){
    const token = await authenticate(); // get the access token
    const response = await axios.get(`https://graph.microsoft.com/v1.0/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    console.log('User Data:', response.data);
}

getUser('tobi@ym4df.onmicrosoft.com').catch(Error => {
    console.error('Error:', Error);
});