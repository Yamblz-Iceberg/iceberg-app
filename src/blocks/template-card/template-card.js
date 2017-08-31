import React from 'react';
import { PropTypes } from 'prop-types';

import './template-card.scss';

import { Icon, Avatar } from '../../blocks';

const TemplateCard = ({ data }) => {
    const cardStyles = {
        background: data.background,
    };

    const avatarOptions = {
        size: '25',
        photo: data.avatar,
        iconColor: '#fff',
    };

    return (
        <div className="template-card" style={cardStyles}>
            {data.component}

            <div className="template-card-footer">

                <div className="template-card-footer__user">
                    <Avatar {...avatarOptions} />
                    <span className="template-card-footer__user-name">{data.userName}</span>
                </div>

                <div className="template-card-footer__actions">
                    <div className="template-card-footer__link-action">
                        <Icon iconName={'link'} iconColor={'#fff'} />
                        <span>{data.linksCount}</span>
                    </div>
                    <div className="template-card-footer__save-action">
                        <Icon iconName={'save-big'} iconColor={'#fff'} />
                        <span>{data.savedTimesCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

TemplateCard.defaultProps = {
    data: PropTypes.objectOf(
        PropTypes.shape({
            linksCount: 0,
            savedTimesCount: 0,
        }),
    ),
};

TemplateCard.propTypes = {
    data: PropTypes.shape({
        // React Component
        component: PropTypes.object.isRequired,
        background: PropTypes.string.isRequired,
        // User
        userName: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        linksCount: PropTypes.number.isRequired,
        savedTimesCount: PropTypes.number.isRequired,
    }),
};

export default TemplateCard;