import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Emoji from 'a11y-react-emoji';
import { faceEmojis, profileInfoEmojis } from '../../_utility/emojis';
import { Tooltip, Zoom } from '@material-ui/core';
import moment from 'moment';
import * as ROLES from '../../_constants/roles';

const PersonalInfo = props => {
    const { user, openSettings, handleStatus } = props;

    const renderOverlay = () => (
        <OverlayTrigger
            placement="right"
            trigger="click"
            delay={{ show: 250, hide: 400 }}
            overlay={
                <Popover id="popover-basic">
                    <Popover.Title as="h3">Durumunu Değiştir</Popover.Title>
                    <Popover.Content>
                        <div className="container-fluid">
                            <div className="row">{renderEmojis()}</div>
                        </div>
                    </Popover.Content>
                </Popover>
            }
        >
            <Emoji symbol={faceEmojis.get(user.status)} className="emoji-32" />
        </OverlayTrigger>
    );

    const renderEmojis = () => {
        let allEmojis = [];
        faceEmojis.forEach((value, key) => {
            allEmojis.push(
                <Tooltip title={key} TransitionComponent={Zoom}>
                    <div className="col-3">
                        <Emoji
                            symbol={value}
                            onClick={() => handleStatus(key)}
                            style={{ fontSize: '32px', cursor: 'pointer' }}
                        />
                    </div>
                </Tooltip>
            );
        });

        return allEmojis;
    };

    return (
        <div className="col-lg-3 col-md-3 col-sm-12 col-12 pl-5 pr-5 pt-2 pb-4 profile-info">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-12 col-md-12 col-sm-6 col-6 h-auto text-center">
                    <img
                        src={user.profilePictureSource}
                        className="img-fluid rounded-circle"
                        alt=""
                    />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-lg-9 col-9">
                    <div className="row font-18 font-weight-bold">
                        <span>{`${user.name} ${user.surname}`}</span>
                    </div>
                    <div className="row font-weight-lighter font-italic">
                        <span>{`${user.username}`}</span>
                    </div>
                </div>
                <Tooltip
                    title="Durum"
                    TransitionComponent={Zoom}
                    placement="bottom-end"
                >
                    <div className="col-lg-3 col-3 text-right pr-0">
                        {renderOverlay()}
                    </div>
                </Tooltip>
            </div>
            <div className="row mt-2 h-auto">
                <span>{`${user.description}`}</span>
            </div>
            <div className="row mt-3">
                <button
                    className="btn btn-secondary btn-block"
                    type="button"
                    onClick={openSettings}
                >
                    Profili Düzenle
                </button>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <div className="row text-capitalize">
                        <div className="col-12 no-padding">
                            <Emoji
                                symbol={profileInfoEmojis.get('Round Pushpin')}
                                className="font-18 ml-1"
                            />
                            <span className="align-middle ml-1">
                                {` ${user.location}`}
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 no-padding">
                            <Emoji
                                symbol={profileInfoEmojis.get('E-Mail')}
                                className="font-18"
                            />
                            <span className="align-middle">{` ${user.email}`}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 no-padding">
                            <Emoji
                                symbol={profileInfoEmojis.get(
                                    'Spiral Calendar'
                                )}
                                className="font-18"
                            />
                            <span className="align-middle ml-1">
                                {moment(user.birthday).format('DD.MM.YYYY')}
                            </span>
                        </div>
                    </div>
                    {user.role && user.role === ROLES.DOCTOR ? (
                        <div className="row">
                            <div className="col-12 no-padding">
                                <span className="align-middle ml-2">{` ${props.user.experties}`}</span>
                            </div>
                        </div>
                    ) : null}
                    {user.role && user.role === ROLES.DOCTOR ? (
                        <div className="row">
                            <div className="col-12 no-padding">
                                <span className="align-middle ml-2">
                                    {' '}
                                    Rating:{` ${props.user.rating}`}/5
                                </span>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
