import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LinkCard } from './../../../blocks';

import { actions as modalActions } from '../../../reducers/modal.reducer';
import { openLinkLoader } from '../../../reducers/link.reducer';

import './collection-detail-links.scss';

class CollectionDetailLinks extends Component {
    openLink(href, id) {
        if (window.cordova) {
            window.SafariViewController.isAvailable((available) => {
                if (available) {
                    window.SafariViewController.show({
                        url: href,
                        hidden: false,
                        animated: false,
                        transition: 'curl',
                        enterReaderModeIfAvailable: false,
                        tintColor: '#fff',
                        barColor: '#000',
                        controlTintColor: '#ffffff',
                    },
                    // success
                    () => {},
                    // error
                    () => {
                        this.props.showModal('ERROR_MESSAGE',
                            {
                                title: 'Упс!',
                                text: 'Такая ссылка не существует.',
                                buttonText: 'Понятно',
                            });
                    });
                } else {
                    window.open(href);
                }
            });
        } else {
            window.open(href);
        }
        this.props.openLinkLoader(id, this.props.token);
    }

    render() {
        const filteredLinks = this.props.links.filter((link) => {
            if (this.props.filter !== '') {
                return link.name.length > 60;
            }
            return link;
        });

        return (
            <section className="collection-detail-links">
                {
                    filteredLinks.map(link => (
                        <div className="collection-detail-links__item" key={link._id} onClick={() => this.openLink(link.url, link._id)}>
                            <LinkCard data={{ ...link }} />
                        </div>
                    ))
                }
            </section>
        );
    }
}

CollectionDetailLinks.propTypes = {
    links: PropTypes.array.isRequired,
    filter: PropTypes.string,
    showModal: PropTypes.func.isRequired,
    openLinkLoader: PropTypes.func.isRequired,
    token: PropTypes.any.isRequired,
};

CollectionDetailLinks.defaultProps = {
    filter: '',
};

function mapStateToProps(state) {
    return {
        links: state.collection.links,
        token: state.authorization.access_token,
    };
}


export default
connect(mapStateToProps, { ...modalActions, openLinkLoader })(withRouter(CollectionDetailLinks));
