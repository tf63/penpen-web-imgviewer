import React from 'react'

interface ImgGridProps {
    images: string[]
}

export const ImgGrid: React.FC<ImgGridProps> = ({ images }) => {
    return (
        <div className="img-grid">
            {images.map((image, index) => (
                <div key={index} className="img-item">
                    <img src={image} alt={`Image ${index}`} />
                </div>
            ))}
        </div>
    )
}
