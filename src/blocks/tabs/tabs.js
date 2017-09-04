import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './tabs.scss';

class Tabs extends Component {
    componentDidMount = () => {
        this.animateUnderline();
    }

    componentDidUpdate = () => {
        this.animateUnderline();
    }

    refItemListActive = (listItem) => {
        this.activeListItem = listItem;
    }

    goTo = (linkTo) => {
        this.props.history.replace(linkTo);
    }

    animateUnderline = () => {
        const activeListItemPosition = this.activeListItem.offsetLeft;
        const activeListItemWidth = this.activeListItem.offsetWidth;

        this.underline.style.cssText = `
            left:${activeListItemPosition}px;
            width:${activeListItemWidth}px;
        `;
    }

    render() {
        const { tabs, history } = this.props;

        return (
            <div className="tabs-container">
                <ul className="tabs__list">
                    <div
                        className="tabs__underlining"
                        ref={(underline) => { this.underline = underline; }}
                    />
                    { tabs.length > 0 && tabs.map((tab) => {
                        const isItemActive = history.location.pathname === tab.linkTo;
                        const itemProps = {
                            className: `tab__item ${isItemActive ? 'tabs__item--active' : ''}`,
                            key: `${tab.id}`,
                            onClick: tab.onClick,
                        };

                        if (isItemActive) {
                            itemProps.ref = this.refItemListActive;
                        }

                        return (
                            <li {...itemProps}>
                                <span
                                    className="tabs__link"
                                    onClick={() => this.goTo(tab.linkTo)}
                                >{tab.title}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    })),
    history: PropTypes.object.isRequired,
};

Tabs.defaultProps = {
    tabs: [],
};

export default withRouter(Tabs);
