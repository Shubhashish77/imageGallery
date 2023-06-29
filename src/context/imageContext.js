import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react'

const ImageContext = createContext();

const BASE_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${process.env.REACT_APP_API_KEY}&per_page=12&format=json&nojsoncallback=1&safe_search=1`;

const SEARCH_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&safe_search=1&content_type=1&content_types=0&per_page=12&format=json&nojsoncallback=1`;

const initialState = {
    images: [],
    isLoading: false,
    error: "",
    page: 1,
    searchList: [],
    currentSearch: ""
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return { ...state, isLoading: true };
        case 'updatePage':
            return { ...state, page: action?.payload || state.page + 1 };
        case 'image/loaded':
            return { ...state, isLoading: false, images: [...state.images, ...action.payload] };
        case 'searchImage/loaded':
            const newVal = state.searchList?.includes(action.payload.tag) ? "" : action.payload.tag;
            if (newVal)
                return { ...state, isLoading: false, page: 2, searchList: [...state.searchList, newVal], currentSearch: action.payload.tag, images: [...action.payload.img] };
            return { ...state, isLoading: false, page: 2, searchList: [...state.searchList], currentSearch: action.payload.tag, images: [...action.payload.img] };
        case 'moreSearch/loaded':
            return { ...state, isLoading: false, images: [...state.images, ...action.payload] };
        case 'clearSearchHistory':
            return { ...state, currentSearch: "", searchList: [] };
        case 'rejected':
            return { ...state, isLoading: false, error: action.payload };
        default:
            throw new Error("Unknown action type");
    }

}

const ImageProvider = ({ children }) => {
    const [{ images, isLoading, error, page, searchList, currentSearch }, dispatch] = useReducer(reducer, initialState);

    const updatePage = () => {
        dispatch({ type: 'updatePage' });
    }

    const fetchImages = async () => {
        dispatch({ type: 'loading' })
        try {
            const res = await fetch(`${BASE_URL}/&page=${page}`);
            const data = await res.json();
            dispatch({ type: 'image/loaded', payload: data.photos.photo });
        } catch {
            dispatch({ type: 'rejected', payload: "There was an error loading the images..." })
        }
    }

    useEffect(() => {
        fetchImages();
    }, [])

    const searchImage = async (tag) => {
        dispatch({ type: 'loading' })
        try {

            const res = await fetch(`${SEARCH_URL}&page=${1}&text=${tag}&tags=${tag}`);
            const data = await res.json();
            dispatch({ type: 'searchImage/loaded', payload: { img: data.photos.photo, tag } });
        } catch {
            dispatch({ type: 'rejected', payload: "There was an error searching the images..." })
        }
    }

    const moreSearchResult = async () => {
        dispatch({ type: 'loading' })
        try {
            const res = await fetch(`${SEARCH_URL}&page=${page}&text=${currentSearch}`);
            const data = await res.json();
            dispatch({ type: 'moreSearch/loaded', payload: data.photos.photo });
        } catch {
            dispatch({ type: 'rejected', payload: "There was an error searching the images..." })
        }
    }

    const clearSearchHistory = () => {
        dispatch({ type: 'clearSearchHistory' });
    }


    return (
        <ImageContext.Provider value={{
            images, isLoading, error, fetchImages, searchImage, moreSearchResult, updatePage, page, currentSearch, searchList, clearSearchHistory
        }}>
            {children}
        </ImageContext.Provider>
    )
}

const useImage = () => {
    const context = useContext(ImageContext);
    if (context === undefined)
        throw new Error("ImageContext was used outside the ImageProvider");
    return context;
}

export { ImageProvider, useImage, ImageContext };