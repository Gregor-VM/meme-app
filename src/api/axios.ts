import axios from 'axios';

const memes = axios.create({
    baseURL: "https://meme-api.com/gimme"
});

export default memes;