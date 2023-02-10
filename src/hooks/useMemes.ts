import {useContext, useEffect, useMemo} from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMemes } from '../api/memes';
import { SettingsContext } from '../context/Settings';
import { MemesResponse, Meme } from '../interfaces/Meme';
import { getUniqueListBy } from '../utils/utils';
import useFetchMemes from './useFetchMemes';

function useMemes() {

    const {batchSize, serverList, nsfwFilter} = useContext(SettingsContext);

    const savedCursor: {cursor: number, pageParam: number} = useMemo(() => {
      const savedCursorTemp = localStorage.getItem("cursor");
      return savedCursorTemp ? JSON.parse(savedCursorTemp) : null;
    }, []);

    const getMemesLimited = useFetchMemes({cursorParam: savedCursor?.cursor || 0});

    const {data: memes, isLoading, isError, fetchNextPage, hasNextPage, refetch} = useInfiniteQuery<MemesResponse>(
        ['characters', serverList], 
        ({pageParam = 0}) => {
          if(pageParam === 0 && savedCursor?.pageParam){
            pageParam = savedCursor.pageParam;
            localStorage.removeItem("cursor");
          }
          return getMemesLimited(pageParam, batchSize, serverList)
        },
        {
            getNextPageParam: (memesResponse: MemesResponse) => {
            return memesResponse.nextIndex;
            }
    });

    const memeList = useMemo(() => memes?.pages.reduce((prev, page) => {
        let newMemeList: Meme[] | never[] = [];
        if(nsfwFilter) newMemeList = getUniqueListBy([...prev.memes, ...page.memes], "url").filter(memes => memes.nsfw === false)
        else newMemeList = getUniqueListBy([...prev.memes, ...page.memes], "url")

        return ({
          count: page.count,
          nextIndex: page?.nextIndex,
          memes: newMemeList
        })
      }), [memes]);

      useEffect(() => {
        refetch();
      }, [serverList, batchSize, nsfwFilter])


  return {isLoading, isError, fetchNextPage, hasNextPage, memes, memeList};
}

export default useMemes