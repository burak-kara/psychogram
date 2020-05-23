import React from 'react';
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

    const renderContent = () => (
        <>
            <div className="col-12 d-flex justify-content-center">
                <input
                    type="file"
                    accept="image/*"
                    onChange={event => onSelectFile(event)}
                />
            </div>
            <div className="col-12 d-flex justify-content-center">
                <ReactCrop
                    src={upImg}
                    locked={true}
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
            width="md"
        />
    );
};

export default CropWindow;
