import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { putToSavedLoader, delFromSavedLoader } from '../../../reducers/collection.reducer';
import { ToggleText } from '../../index';
import { HashTag, Icon, Button, CardFooter } from '../../../blocks';

import './collection-detail-info.scss';

import { mainYellow } from '../../../variables.scss';

class CollectionDetailInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAllText: false,
        };
    }

    createLink = () => {
        this.props.history.push({ pathname: './create-link' });
    };

    putToSaved = () => {
        this.props.putToSavedLoader(this.props.collection._id, this.props.token);
    }

    delFromSaved = () => {
        this.props.delFromSavedLoader(this.props.collection._id, this.props.token);
    }

    renderButton() {
        if (this.props.collection.saved) {
            return (
                <Button
                    type="light"
                    icon={<Icon iconName={'save-small'} iconColor={mainYellow} />}
                    text="вы подписаны"
                    size="max-width"
                    onClick={this.delFromSaved}
                />
            );
        }

        return (
            <Button
                icon={<Icon iconName={'save-big'} />}
                text="подписаться"
                size="max-width"
                onClick={this.putToSaved}
            />
        );
    }

    render() {
        const collection = this.props.collection;

        const avatarOptions = {
            size: '25',
            photo: collection.author.photo,
            iconColor: '#fff',
        };

        const userName = `${collection.author.firstName} ${collection.author.lastName}`;

        return (
            <section>
                <div className="collection-detail-info">
                    <div className="collection-detail-card">
                        <div
                            className="collection-detail-card__img"
                            style={{ backgroundImage: `url(${collection.photo})` }}
                        />

                        <div className="collection-detail-card__info">
                            <div className="collection-detail-card__header">
                                {collection.tags.map(hash => (
                                    <HashTag
                                        {...hash}
                                        size={'small'}
                                        key={hash._id}
                                    />)) }
                                <h2 className="collection-detail-card__title">{ collection.name }</h2>
                            </div>

                            <CardFooter
                                avatarOptions={avatarOptions}
                                userName={userName}
                                linksCount={collection.links.length}
                                savedTimesCount={collection.savedTimesCount}
                            />
                        </div>

                        <div className="collection-detail-card__overlay" />
                    </div>

                    <ToggleText text={this.props.collection.description} />

                    <div className="collection-detail-actions">
                        { this.renderButton() }
                        <button className="collection-detail-actions__add-link" onClick={this.createLink}>
                            <Icon iconName={'link'} />
                            <Icon iconName={'plus'} />
                        </button>
                    </div>
                </div>
            </section>
        );
    }
}

CollectionDetailInfo.propTypes = {
    collection: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    history: PropTypes.any.isRequired,
    putToSavedLoader: PropTypes.func.isRequired,
    delFromSavedLoader: PropTypes.func.isRequired,
};

export default connect(
    state => ({
        collection: state.collection,
        token: state.app.token,
    }),
    { putToSavedLoader, delFromSavedLoader },
)(withRouter(CollectionDetailInfo));
