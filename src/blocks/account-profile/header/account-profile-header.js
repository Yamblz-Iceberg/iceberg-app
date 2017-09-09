import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authDemoUser } from '../../../utils/shared-functions';
import { Icon, ContextMenu } from '../../../blocks';
import { logOut, registerDemoUser } from '../../../reducers/authorization.reducer';

import './account-profile-header.scss';

class ProfileHeader extends Component {
    logOut = () => {
        this.props.logOut(
            this.props.authorization.access_token,
            this.props.authorization.refresh_token,
            this.logOutLocal,
        );
    };
    logOutLocal = () => {
        authDemoUser(
            this.props.registerDemoUser,
            this.saveLocal,
        );
    };
    saveLocal = () => {
        localStorage.setItem('IcebergUserData', JSON.stringify(this.props.authorization));
        this.props.history.push('/feed');
    };
    render() {
        const contextMenuItems = [
            {
                title: 'Выйти',
                id: 0,
                onClick: () => { this.logOut(); },
                icon: <Icon iconName={'arrow-back'} />,
            },
        ];
        return (
            <header className="profile-header">
                <div className="profile-header__container">
                    <div className="profile-header__block">
                        <NavLink to={'/feed'}>
                            <Icon iconName="arrow-back" iconColor="#fff" />
                        </NavLink>
                    </div>
                    <div className="profile-header__block">
                        <ContextMenu iconName={'settings'} iconColor="#fff" items={contextMenuItems} />
                    </div>
                </div>
            </header>
        );
    }
}

ProfileHeader.propTypes = {
    authorization: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
    registerDemoUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default connect(
    state => ({ authorization: state.authorization }),
    { logOut, registerDemoUser },
)(withRouter(ProfileHeader));
