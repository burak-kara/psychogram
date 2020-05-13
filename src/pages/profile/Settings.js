import React from 'react';
import DialogWindow from '../../components/DialogWindow';

const Settings = props => {
    const { open, settings, handleClose, handleSave, onChange } = props;

    const renderContent = () => (
        <form className="profile-settings" onChange={onChange}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="username">Username</label>
                    <input
                        className="form-control"
                        type="text"
                        name="username"
                        id="username"
                        disabled
                        value={settings.username}
                    />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="private" className="col-12 no-padding">
                        Profile Accessibility
                    </label>
                    <div className="switch-container">
                        <label className="switch">
                            <input
                                className="primary"
                                id="private"
                                name="private"
                                type="checkbox"
                                checked={settings.private}
                            />
                            <span className="slider round" />
                        </label>
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="email">Email</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        id="email"
                        value={settings.email}
                        disabled
                    />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="phone">Phone</label>
                    <input
                        className="form-control"
                        type="tel"
                        name="phone"
                        id="phone"
                        value={settings.phone}
                        placeholder="05xx.."
                    />
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

    const renderActions = () => (
        <>
            <button className="btn btn-secondary" onClick={handleClose}>
                Vazgeç
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
                Kaydet
            </button>
        </>
    );

    return (
        <DialogWindow
            title="Profili Düzenle"
            content={settings ? renderContent() : null}
            actions={renderActions()}
            open={open}
            handleClose={handleClose}
            width="sm"
        />
    );
};

export default Settings;
