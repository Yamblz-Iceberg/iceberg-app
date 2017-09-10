export const postLink = (data, token) => {
    const headers = new Headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    });

    return fetch('https://iceberg-project.herokuapp.com/links/', {
        method: 'post',
        body: JSON.stringify(data),
        headers,
    }).then(res => res.json());
};

export const postDeleteLink = (id, token) => {
    const headers = new Headers({
        Authorization: `Bearer ${token}`,
    });

    return fetch(`https://iceberg-project.herokuapp.com/users/bookmarks/addedLinks/${id}`, {
        method: 'delete',
        headers,
    }).then(res => res.json());
};

export const postLinkToCollection = (collectionId, linkId, token, description) => {
    const headers = new Headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    });

    return fetch(`https://iceberg-project.herokuapp.com/collections/addLink/${collectionId}/${linkId}`, {
        method: 'post',
        body: JSON.stringify({ description }),
        headers,
    });
};

export const putOpenLink = (id, token) => {
    const headers = new Headers({
        Authorization: `Bearer ${token}`,
    });

    return fetch(`https://iceberg-project.herokuapp.com/links/open/${id}`, {
        headers,
        method: 'put',
    });
};

export const changeLikeOfLink = (id, token) => {
    const headers = new Headers({
        Authorization: `Bearer ${token}`,
    });

    return fetch(`https://iceberg-project.herokuapp.com/links/like/${id}`, {
        headers,
        method: 'put',
    });
};

export const putSaveOfLink = (id, token) => {
    const headers = new Headers({
        Authorization: `Bearer ${token}`,
    });

    return fetch(`https://iceberg-project.herokuapp.com/users/bookmarks/savedLinks/${id}`, {
        headers,
        method: 'put',
    });
};

export const deleteSaveOfLink = (id, token) => {
    const headers = new Headers({
        Authorization: `Bearer ${token}`,
    });

    return fetch(`https://iceberg-project.herokuapp.com/users/bookmarks/savedLinks/${id}`, {
        headers,
        method: 'delete',
    });
};
