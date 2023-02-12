export type PackType = keyof (typeof packObj);

const spanish = [
    //"SpanishMeme",
    //"spanishmemes",
    "MemesEnEspanol",
    //"DankHispano",
    "MemesESP",
    "MAAU",
    //"yo_elvr",
    "argentina",
    "LatinoPeopleTwitter",
    "Yointerneto",
    //"SpanishHistoryMemes",
    "memexico",
    "dankgentina",
    //"SquarePosting",
    //"memewordES",
    //"ImagenesChistosas2007"
]

const english = [
    "memes",
    "dankmemes",
    "funny",
    //"soccercirclejerk",
    //"soccercirclejerk",
    //"vexillogycirclejerk",
    //"BicyclingCirclejerk",
    "shitposting",
    "Animemes",
    //"TrueReddit",
    "holesome",
    //"comedyhomicide",
    "animefunny",
    "anime_irl",
    //"goodanimememes",
    "animenocontext",
    "ShitPostCrusaders",
    "Angryupvote",
    "depression_memes",
    //"artmemes",
    //"Im15AndThisIsYeet",
    //"genealogymemes",
    "BPDmemes",
    //"comedyheaven",
    "formuladank",
    "HistoryMemes"
]

export const packObj = {
    spanish: spanish,
    english: english, 
    all: [...spanish, ...english].sort(() => Math.random() - 0.5),
}