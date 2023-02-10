import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import MemeItem from '../MemeItem/MemeItem'
import InfiniteScroll from "react-infinite-scroll-component"
import useMemes from '../../hooks/useMemes';
import Settings from "../Settings/Settings";


function Memes() {

  //const {data: memes, isLoading} = useQuery<MemesResponse>({ queryKey: ['memes', server], queryFn: () => getMemes(server) })
  const {memeList, isLoading, isError, fetchNextPage, hasNextPage} = useMemes();

  if(isLoading) return <div className="text-center">Loading...</div>;

  if(isError) return <div className="text-center">Couldn't bring any data :(</div>;

  return (
    <>
    <Settings />
    <InfiniteScroll
      dataLength={memeList ? memeList.memes.length : 0}
      next={() => fetchNextPage()}
      hasMore={!!hasNextPage}
      loader={<div>Loading...</div>}
    >
    <ResponsiveMasonry
            columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
        >
            <Masonry gutter="10px">
                {memeList?.memes.map(meme => {
                  return <MemeItem key={meme.url} meme={meme}></MemeItem>
                })}
            </Masonry>
        </ResponsiveMasonry>
    </InfiniteScroll>
    </>
  )
}

export default Memes