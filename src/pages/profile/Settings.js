import React from 'react';
import DialogWindow from '../../components/DialogWindow';

const Settings = props => {
    const { open, settings, handleClose, handleSave } = props;
    const renderContent = () => {
        console.log(settings);
        return (
            <form className="profile-settings">
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="username">Username</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            id="name"
                            disabled
                            value={settings.username}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="private" className="col-12 no-padding">
                            Profile Accessibility
                        </label>
                        {/* TODO*/}
                        {/*<input*/}
                        {/*    className="form-control"*/}
                        {/*    type="text"*/}
                        {/*    name="private"*/}
                        {/*    id="private"*/}
                        {/*    value={settings.private}*/}
                        {/*/>*/}
                        <div className="switch">
                            <input className="slider-input" type="checkbox" />
                            <span className="slider round" />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="name">Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            id="name"
                            value={settings.name}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="surname">Surname</label>
                        <input
                            className="form-control"
                            type="text"
                            name="surname"
                            id="surname"
                            value={settings.surname}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        rows="5"
                        name="description"
                        id="description"
                        value={settings.description}
                    />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="location">Location</label>
                        <input
                            className="form-control"
                            type="text"
                            name="location"
                            id="location"
                            value={settings.location}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="birthday">Birthday</label>
                        <input
                            className="form-control"
                            type="date"
                            name="birthday"
                            id="birthday"
                            value={settings.birthday}
                        />
                    </div>
                </div>
            </form>
        );
    };

    const renderActions = () => {
        return (
            <>
                <button className="btn btn-secondary" onClick={handleClose}>
                    Vazgeç
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                    Kaydet
                </button>
            </>
        );
    };

    return (
        <DialogWindow
            title="Profili Düzenle"
            content={settings ? renderContent() : null}
            actions={renderActions()}
            open={open}
            handleClose={handleClose}
            width="lg"
        />
    );
};

export default Settings;
