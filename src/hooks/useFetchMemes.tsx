import { useState } from 'react';
import { getMemes } from '../api/memes';
import { MemesResponse } from '../interfaces/Meme';

const limit = 50;

function useFetchMemes({cursorParam = 0}) {

  const [memes, setMemes] = useState<MemesResponse | null>(null);
  const [cursor, setCursor] = useState(cursorParam);

  const getMemesLimited = async (pageParam: number, batchSize: number, serverList: string[]) => {

    if(memes === null){
      const response = await getMemes(pageParam, limit, serverList);
      setMemes({...response, nextIndex: pageParam});
      setCursor(batchSize + cursor);
      return {...response, memes: response?.memes.slice(0, batchSize), nextIndex: pageParam}
    }

    if(cursor + batchSize > limit){
      setCursor(batchSize);
      const response = await getMemes(pageParam, limit, serverList);
      setMemes(response);
      return {...response, memes: response?.memes.slice(0, batchSize), nextIndex: pageParam + 1}
    }

    const limitedMemesResponse = {...memes, memes: memes?.memes.slice(cursor, cursor + batchSize)};
    setCursor(cursor + batchSize);
    localStorage.setItem("cursor", JSON.stringify({
      pageParam, cursor
    }));

    return limitedMemesResponse;

  }



  return getMemesLimited;
}

export default useFetchMemes