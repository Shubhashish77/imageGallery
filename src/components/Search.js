import React, { useState } from 'react';
import styles from './Search.module.css';
import { CloseOutlined, SearchOutlined } from '@mui/icons-material';
import { useImage } from '../context/imageContext';

const Search = () => {

    const { searchImage, searchList, clearSearchHistory } = useImage();

    const [wordEntered, setWordEntered] = useState("");
    const [focus, setFocus] = useState(false);
    // const handleFilter = (event) => {
    //     const searchWord = event.target.value;
    //     setWordEntered(searchWord);
    //     const newFilter = data.filter((value) => {
    //         return value.toLowerCase().includes(searchWord.toLowerCase());
    //     });

    //     if (searchWord === "") {
    //         setFilteredData([]);
    //     } else {
    //         setFilteredData(newFilter);
    //     }
    // };
    // const clearInput = () => {
    //     setWordEntered("");
    // };
    return (
        <div>
            <div className={styles.search}>
                <div className={styles.searchInputs}>
                    <input
                        type="text"
                        placeholder="Type here to search"
                        value={wordEntered}
                        onFocus={() => setFocus(true)}
                        // onBlur={() => setFocus(false)}
                        onChange={(e) => setWordEntered(e.target.value)}
                    />
                    <div className={styles.searchIcon}>
                        {/* {searchList ? ( */}
                        <SearchOutlined onClick={() => {
                            searchImage(wordEntered);
                            setFocus(false);
                        }} />
                        {/* ) : (
                            <CloseOutlined id="clearBtn" onClick={clearInput} />
                        )} */}
                    </div>
                </div>
                {searchList && focus && wordEntered && (
                    <div
                        className={styles.dataResult}
                    // onFocus={() => setFocus(true)}
                    // onBlur={() => setFocus(false)}
                    >
                        {searchList.map((value, key) => {
                            return (
                                <div className={styles.dataItem} key={key} onClick={() => {
                                    setWordEntered(value)
                                    // searchImage(value);
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