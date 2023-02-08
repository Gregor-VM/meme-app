import {useContext, useEffect, useMemo} from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMemes } from '../api/memes';
import { SettingsContext } from '../context/Settings';
import { MemesResponse } from '../interfaces/Meme';

function useMemes() {

    const {batchSize, serverList} = useContext(SettingsContext);

    const {data: memes, isLoading, status, fetchNextPage, hasNextPage, refetch} = useInfiniteQuery<MemesResponse>(
        ['characters', serverList], 
        ({pageParam = 0}) => getMemes(pageParam, batchSize, serverList),
        {
            getNextPageParam: (memesResponse: MemesResponse) => {
            return memesResponse.nextIndex || false;
            }
    });

    const memeList = useMemo(() => memes?.pages.reduce((prev, page) => {
        return ({
          count: page.count,
          nextIndex: page?.nextIndex,
          memes: [...prev.memes, ...page.memes]
        })
      }), [memes]);

      useEffect(() => {
        refetch();
      }, [serverList])


  return {isLoading, status, fetchNextPage, hasNextPage, memes, memeList};
}

export default useMemes