import React, { useState } from 'react';
import DialogWindow from '../../components/DialogWindow';
import ReactCrop from 'react-image-crop';

const CropWindow = props => {
    const {
        open,
        handleClose,
        handleSave,
        onSelectFile,
        upImg,
        onLoad,
        crop,
        setCrop,
        makeClientCrop,
    } = props;
    const [disabled, setDisabled] = useState(true);

    const renderContent = () => (
        <>
            <div className="col-12 d-flex justify-content-center mb-3">
                <input
                    type="file"
                    accept="image/*"
                    onChange={event => {
                        onSelectFile(event);
                        setDisabled(false);
                    }}
                />
            </div>
            <div className="col-12 d-flex justify-content-center">
                <ReactCrop
                    src={upImg}
                    locked={true}
                    ruleOfThirds={true}
                    circularCrop={true}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={c => setCrop(c)}
                    onComplete={makeClientCrop}
                />
            </div>
        </>
    );

    const renderActions = () => (
        <>
            <button className="btn btn-secondary" onClick={handleClose}>
                Vazgeç
            </button>
            <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={disabled}
            >
                Kaydet
            </button>
        </>
    );

    return (
        <DialogWindow
            title="Yeni Fotoğraf Yükle"
            content={renderContent()}
            actions={renderActions()}
            open={open}
            handleClose={handleClose}
            width="md"
        />
    );
};

export default CropWindow;
