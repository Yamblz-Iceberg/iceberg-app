import { fetchCollection } from '../services/collection.service';

const FETCH_COLLECTION = 'FETCH_COLLECTION';

const initialState = {};

const loadCollection = collection => ({ type: FETCH_COLLECTION, payload: collection });

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_COLLECTION:
        return { ...state, ...action.payload };
    default:
        return state;
    }
};

const collectionLoader = collectionId => (
    (dispatch) => {
        fetchCollection(collectionId).then((collection) => {
            dispatch(loadCollection(collection.collection[0]));
        });
    }
);

export { reducer, collectionLoader };
