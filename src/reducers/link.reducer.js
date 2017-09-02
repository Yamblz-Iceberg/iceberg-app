import { postLink, postLinkToCollection } from './../services/link.service';

const ADD_LINK = 'ADD_LINK';
const ADD_COMMENT = 'ADD_COMMENT';
const CLEAR_LINK = 'CLEAR_LINK';
const PUSH_LINK_TO_COLLECTION = 'PUSH_LINK_TO_COLLECTION';

const initialState = {
    result: {
        url: '',
        title: '',
        photo: '',
        favicon: '',
    },
    created: false,
    comment: '',
};

const addLink = res => ({ type: ADD_LINK, payload: res });
const addComment = comment => ({ type: ADD_COMMENT, payload: comment });
const clearLink = () => ({ type: CLEAR_LINK });
const pushLinkToCollection = () => ({ type: PUSH_LINK_TO_COLLECTION });

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case ADD_LINK:
        return { ...state, ...action.payload };
    case ADD_COMMENT:
        return { ...state, comment: action.payload };
    case PUSH_LINK_TO_COLLECTION:
        return state;
    case CLEAR_LINK:
        return { ...initialState };
    default:
        return state;
    }
};

export const createLink = (data, token) => (
    (dispatch) => {
        postLink(data, token).then((res) => {
            dispatch(addLink(res));
        });
    }
);

export const addLinkToCollection = (collectionId, linkId, token, comment, callback) => (
    (dispatch) => {
        postLinkToCollection(collectionId, linkId, token, comment).then(() => {
            dispatch(pushLinkToCollection());
        }).then(() => callback);
    }
);

export { reducer, addComment, clearLink };
