import {useContext, useEffect, useMemo} from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMemes } from '../api/memes';
import { SettingsContext } from '../context/Settings';
import { MemesResponse, Meme } from '../interfaces/Meme';
import { getUniqueListBy } from '../utils/utils';

function useMemes() {

    const {batchSize, serverList, nsfwFilter} = useContext(SettingsContext);

    const {data: memes, isLoading, status, fetchNextPage, hasNextPage, refetch} = useInfiniteQuery<MemesResponse>(
        ['characters', serverList], 
        ({pageParam = 0}) => getMemes(pageParam, batchSize, serverList),
        {
            getNextPageParam: (memesResponse: MemesResponse) => {
            return memesResponse.nextIndex;
            }
    });

    const memeList = useMemo(() => memes?.pages.reduce((prev, page) => {
        let newMemeList: Meme[] | never[] = [];
        if(nsfwFilter) newMemeList = getUniqueListBy([...prev.memes, ...page.memes], "url").filter(memes => !memes.nsfw)
        else getUniqueListBy([...prev.memes, ...page.memes], "url")

        return ({
          count: page.count,
          nextIndex: page?.nextIndex,
          memes: newMemeList
        })
      }), [memes]);

      useEffect(() => {
        refetch();
      }, [serverList, batchSize, nsfwFilter])


  return {isLoading, status, fetchNextPage, hasNextPage, memes, memeList};
}

export default useMemes