import React, { useEffect } from 'react'
import { useImage } from '../context/imageContext';
import styles from './ImageContainer.module.css';
import Spinner from './Spinner';


const ImageContainer = () => {

    const { images, fetchImages, isLoading, currentSearch, moreSearchResult, updatePage, page } = useImage();

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight)
            updatePage();
    };

    useEffect(() => {
        currentSearch ? moreSearchResult(currentSearch) : fetchImages();
    }, [page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    return (
        <>

            <div className={styles.imageGrid}>
                {images.map((image, key) => {
                    return (
                        <div key={key}>
                            <img
                                className={styles.img}
                                src={`https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_b.jpg`}
                                alt={image.title}

                            />
                        </div>

                    )
                })}
            </div>

            <div className='spin'>
                {isLoading && <Spinner />}
            </div>
        </>
    )
}

export default ImageContainer