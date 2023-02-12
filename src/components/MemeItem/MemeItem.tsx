import { useContext, useMemo, useState } from 'react';
import { ResponsiveMasonry } from 'react-responsive-masonry';
import { Meme } from '../../interfaces/Meme';
import Masonry from 'react-responsive-masonry';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { SettingsContext } from '../../context/Settings';

interface propType {
    meme: Meme
}

function MemeItem({meme}: propType) {

    const [height, setHeight] = useState("400px");

    const {lowRes} = useContext(SettingsContext);

    const {url, title, postLink, nsfw, preview} = meme;

    const selectedUrl = useMemo(() => {
        return lowRes ? preview[1] : url;
    }, [lowRes]);



    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{350: 1, 750: 1, 900: 1}}
        >
            <Masonry gutter="10px">
                <a href={postLink} target="_blank">
                <LazyLoadImage
                    afterLoad={() => setHeight("auto")}
                    alt={title}
                    effect="blur"
                    src={selectedUrl}
                    width="100%"
                    height={height}
                    style={{minHeight: "200px"}} />
                </a>
            </Masonry>
        </ResponsiveMasonry>
    )
}

export default MemeItem