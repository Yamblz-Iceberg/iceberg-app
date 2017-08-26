import React from 'react';
import { PropTypes } from 'prop-types';

import './create-card.scss';

import { Icon } from './../../elements';
import { TemplateCard } from './..';

const CreateCard = ({ data }) => {
    const component = () => (
        <div className="create-card">
            <button className="create-card__button">
                <Icon
                    iconName={'plus'}
                    iconColor={'#fff'}
                    iconWidth={'14'}
                    iconHeight={'14'}
                />
                <span className="create-card__text">добавить категории</span>
            </button>
            <br />
            <div
                className="create-card__input"
                contentEditable
            />
        </div>
    );

    const tempCard = {
        component,
        background: 'blue',
        userName: data.userName,
        avatar: data.avatar,
        linksCount: data.linksCount,
        savedLinksCount: data.savedLinksCount,
    };

    return (
        <TemplateCard data={tempCard} />
    );
};

CreateCard.defaultProps = {
    data: PropTypes.objectOf(
        PropTypes.shape({
            linksCount: 0,
            savedLinksCount: 0,
        }),
    ),
};

CreateCard.propTypes = {
    data: PropTypes.objectOf(
        PropTypes.shape({
            userName: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
            linksCount: PropTypes.number,
            savedLinksCount: PropTypes.number,
        }),
    ).isRequired,
};

export default CreateCard;
