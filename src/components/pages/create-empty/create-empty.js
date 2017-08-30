import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, Icon } from './../../elements';
import { CreateCard, CreateEmptyHeader, Option, ToggleText } from './../../blocks';

import './create-empty.scss';

class CreateEmpty extends Component {
    handleSubmitData = e => e;

    render() {
        const {
            description,
            user,
        } = this.props;

        const createCardProps = {
            userName: `${user.firstName} ${user.lastName}`,
            avatar: user.photo,
        };

        const optionsProperties = [
            {
                num: 1,
                option: 'Предлагать ссылки',
                noticeText: 'Нотификация1',
            },
            {
                num: 2,
                option: 'Модерировать ссылки',
                noticeText: 'Нотификация2',
            },
        ];

        return (
            <main className="create-empty">
                <CreateEmptyHeader callback={this.handleSubmitData} />
                <div className="create-empty__card-wrapper">
                    <CreateCard data={createCardProps} />
                </div>
                {description === ''
                    ? (
                        <NavLink
                            to={'/create-description'}
                            className="create-empty__add-description"
                        >
                            <Button
                                icon={<Icon iconName={'plus'} />}
                                text="Добавить описание"
                                background="rgba(255,255,255, 0)"
                            />
                        </NavLink>
                    )
                    : (
                        <div className="create-empty__toggle-text">
                            <ToggleText text={description} />
                        </div>
                    )
                }
                { optionsProperties.map(option => <Option key={option.num} {...option} />) }
            </main>
        );
    }
}

CreateEmpty.propTypes = {
    description: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
};

export default connect(
    state => ({
        description: state.createCollection.description,
        user: state.user.data,
    }),
)(CreateEmpty);
