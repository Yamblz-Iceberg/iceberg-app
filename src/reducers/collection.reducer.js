import { getCollectionFetch, setCollectionAsSavedFetch, deleteCollectionFromSavedFetch, removeCollectionFetch } from '../services/collection.service';
import { changeStatusLikeOfLinkFetch, setLinkAsSavedFetch, deleteLinkFromeSavedFetch } from './../services/link.service';

const FETCH_COLLECTION = 'FETCH_COLLECTION';
const CLEAR_COLLECTION = 'CLEAR_COLLECTION';
const REMOVE_COLLECTION = 'REMOVE_COLLECTION';
const CHANGE_SAVED_STATUS = 'CHANGE_SAVED_STATUS';
const CHANGE_LIKED_STATUS_BY_ID = 'CHANGE_LIKED_STATUS_BY_ID';
const CHANGE_LINK_SAVED_STATUS_BY_ID = 'CHANGE_LINK_SAVED_STATUS_BY_ID';
const CHANGE_LINK_OPENED_STATUS_BY_ID = 'CHANGE_LINK_OPENED_STATUS_BY_ID';
const REMOVE_FROM_COLLECTION = 'REMOVE_FROM_COLLECTION';

const initialState = {
    description: '',
    photo: '',
    author: {
        firstName: '',
        lastName: '',
        photo: '',
    },
    name: '',
    tags: [],
    links: [],
    savedTimesCount: 0,
    saved: false,
};

const loadCollection = collection => ({ type: FETCH_COLLECTION, payload: collection });
const changeSavedStatus = status => ({ type: CHANGE_SAVED_STATUS, payload: status });
const changeLikedStatusOfLinkById =
    (id, status) => ({ type: CHANGE_LIKED_STATUS_BY_ID, id, status });
const changeSavedStatusOfLinkById =
    (id, status) => ({ type: CHANGE_LINK_SAVED_STATUS_BY_ID, id, status });
const changeOpenStatusOfLinkById =
    id => ({ type: CHANGE_LINK_OPENED_STATUS_BY_ID, id });
const clearCollection = () => ({ type: CLEAR_COLLECTION });
const removeCollectionAction = () => ({ type: REMOVE_COLLECTION });
const deleteLinkFromCollection = id => ({ type: REMOVE_FROM_COLLECTION, id });

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_COLLECTION:
        return { ...state, ...action.payload };
    case REMOVE_COLLECTION:
        return initialState;
    case CHANGE_SAVED_STATUS:
        return { ...state,
            saved: action.payload,
            savedTimesCount: state.savedTimesCount + (action.payload ? 1 : -1),
        };
    case CHANGE_LIKED_STATUS_BY_ID: {
        const update = (items, id, status) => {
            const editedLinksList = [].concat(items);
            const editindLink = editedLinksList[items.findIndex(x => x._id === id)];
            editindLink.liked = status;
            if (status) {
                editindLink.likes += 1;
            } else {
                editindLink.likes -= 1;
            }
            return editedLinksList;
        };

        return { ...state,
            links: update([...state.links], action.id, action.status),
        };
    }
    case CHANGE_LINK_SAVED_STATUS_BY_ID: {
        const update = (items, id, status) => {
            const editedLinksList = [].concat(items);
            const editindLink = editedLinksList[items.findIndex(x => x._id === id)];
            editindLink.saved = status;
            if (status) {
                editindLink.savedTimesCount += 1;
            } else {
                editindLink.savedTimesCount -= 1;
            }
            return editedLinksList;
        };

        return { ...state,
            links: update([...state.links], action.id, action.status),
        };
    }
    case CHANGE_LINK_OPENED_STATUS_BY_ID: {
        const update = (items, id) => {
            const editedLinksList = [].concat(items);
            const editindLink = editedLinksList[items.findIndex(x => x._id === id)];
            editindLink.opened = true;
            return editedLinksList;
        };

        return { ...state,
            links: update([...state.links], action.id),
        };
    }
    case REMOVE_FROM_COLLECTION: {
        return { ...state,
            links: state.links.filter(x => x._id !== action.id),
        };
    }
    case CLEAR_COLLECTION: {
        return initialState;
    }
    default:
        return state;
    }
};

const getCollection = (collectionId, token) => (
    (dispatch) => {
        getCollectionFetch(collectionId, token).then((res) => {
            dispatch(loadCollection(res.collection));
        });
    }
);

const setCollectionAsSaved = (id, token) => (
    (dispatch) => {
        setCollectionAsSavedFetch(id, token).then(() => {
            dispatch(changeSavedStatus(true));
        });
    }
);

const deleteCollectionFromSaved = (id, token) => (
    (dispatch) => {
        deleteCollectionFromSavedFetch(id, token).then(() => {
            dispatch(changeSavedStatus(false));
        });
    }
);

const removeCollection = (id, token) => (
    (dispatch) => {
        removeCollectionFetch(id, token).then(() => {
            dispatch(removeCollectionAction());
        });
    }
);

const changeStatusLikeOfLink = (id, status, token) => (
    (dispatch) => {
        dispatch(changeLikedStatusOfLinkById(id, status));
        changeStatusLikeOfLinkFetch(id, token);
    }
);

const changeStatusSavedOfLink = (id, status, token) => (
    (dispatch) => {
        dispatch(changeSavedStatusOfLinkById(id, status));
        if (!status) {
            deleteLinkFromeSavedFetch(id, token);
        } else {
            setLinkAsSavedFetch(id, token);
        }
    }
);

export {
    reducer,
    getCollection,
    setCollectionAsSaved,
    deleteCollectionFromSaved,
    changeStatusLikeOfLink,
    changeStatusSavedOfLink,
    changeOpenStatusOfLinkById,
    clearCollection,
    removeCollection,
    deleteLinkFromCollection,
};
