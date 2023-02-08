import { useState } from 'react';
import { ResponsiveMasonry } from 'react-responsive-masonry';
import { Meme } from '../../interfaces/Meme';
import Masonry from 'react-responsive-masonry';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface propType {
    meme: Meme
}

function MemeItem({meme}: propType) {

    const [height, setHeight] = useState("400px");

    const {url, title, postLink, nsfw} = meme;



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
                    src={url}
                    width="100%"
                    height={height}
                    style={{minHeight: "200px"}} />
                </a>
            </Masonry>
        </ResponsiveMasonry>
    )
}

export default MemeItem