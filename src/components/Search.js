import React, { useState } from 'react';
import styles from './Search.module.css';
import { SearchOutlined } from '@mui/icons-material';
import { useImage } from '../context/imageContext';

const Search = () => {

    const { searchImage, searchList, clearSearchHistory } = useImage();

    const [wordEntered, setWordEntered] = useState("");
    const [focus, setFocus] = useState(false);
    return (
        <div>
            <div className={styles.search}>
                <div className={styles.searchInputs}>
                    <input
                        type="text"
                        placeholder="Type here to search"
                        value={wordEntered}
                        onFocus={() => setFocus(true)}
                        onChange={(e) => setWordEntered(e.target.value)}
                    />
                    <div className={styles.searchIcon}>
                        <SearchOutlined onClick={() => {
                            searchImage(wordEntered);
                            setFocus(false);
                        }} />
                    </div>
                </div>
                {searchList && focus && wordEntered && (
                    <div
                        className={styles.dataResult}
                    >
                        {searchList.map((value, key) => {
                            return (
                                <div className={styles.dataItem} key={key} onClick={() => {
                                    setWordEntered(value)
                                }}>
                                    <span>{value} </span>
                                </div>
                            );
                        })}
                        {searchList.length ? <div className={styles.btn}>
                            <button
                                onClick={() => {
                                    setWordEntered("");
                                    clearSearchHistory();
                                }}
                            >
                                clear
                            </button>
                        </div> : ""
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search;