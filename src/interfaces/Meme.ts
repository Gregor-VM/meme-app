export interface Meme {
    postLink: string;
    subreddit: string;
    title: string;
    url: string;
    nsfw: boolean;
    spoiler: boolean;
    author: string;
    ups: number;
    preview: string[];
}

export interface MemesResponse {
    count: number;
    memes: Meme[];
    nextIndex?: number;
}