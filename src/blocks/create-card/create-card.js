import React from 'react';
import { PropTypes } from 'prop-types';

import { cardBlue } from '../../variables.scss';
import './create-card.scss';

import { Icon } from './../../blocks';
import { TemplateCard } from './..';

const CreateCard = ({ data }) => {
    const maxNumberOfCharacters = (event) => {
        // "event.keyCode !== 8" для backspace
        if (event.target.textContent.length > 50 && event.keyCode !== 8) {
            event.preventDefault();
        }

        data.callback(event.target.textContent);
    };

    const component = (
        <div className="create-card">
            <button className="create-card__button">
                <Icon
                    iconName={'plus'}
                    iconColor={'#fff'}
                />
                <span className="create-card__text">добавить категории</span>
            </button>
            <div
                className="create-card__input"
                role="textbox"
                tabIndex="0"
                onKeyUp={maxNumberOfCharacters}
                contentEditable
            />
        </div>
    );

    const tempCard = {
        component,
        background: cardBlue,
        userName: data.userName,
        avatar: data.avatar,
        linksCount: 0,
        savedTimesCount: 0,
    };

    return (
        <TemplateCard data={tempCard} />
    );
};

CreateCard.propTypes = {
    data: PropTypes.object.isRequired,
};

export default CreateCard;