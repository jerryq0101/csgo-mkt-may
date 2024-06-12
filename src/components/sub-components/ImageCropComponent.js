import React from "react";

const ImageCrop = ({ src, width, height}) => {
    return (
        <div className="image-crop-container" style={{ width, height }}>
            <img src={src} alt="Cropped" className="image-crop" />
        </div>
    )
}
export default ImageCrop;