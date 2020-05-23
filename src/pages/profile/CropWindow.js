import React, { useState, useCallback, useRef } from 'react';
import DialogWindow from '../../components/DialogWindow';
import ReactCrop from 'react-image-crop';

const CropWindow = props => {
    const { open, handleClose, handleSave, onSelectFile } = props;

    const renderContent = () => (
        <>
            <input
                type="file"
                accept="image/*"
                onChange={event => onSelectFile(event)}
            />
            {/*<ReactCrop*/}
            {/*    src={upImg}*/}
            {/*    locked={true}*/}
            {/*    onImageLoaded={onLoad}*/}
            {/*    crop={crop}*/}
            {/*    onChange={c => setCrop(c)}*/}
            {/*    onComplete={makeClientCrop}*/}
            {/*/>*/}
        </>
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
            content={renderContent()}
            actions={renderActions()}
            open={open}
            handleClose={handleClose}
            width="sm"
        />
    );
};

export default CropWindow;
