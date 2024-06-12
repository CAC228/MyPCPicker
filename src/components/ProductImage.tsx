import React from 'react';

interface ProductImageProps {
  imageUrl: string;
  name: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, name }) => (
  <div className="w-full p-4">
    <img src={imageUrl} alt={name} className="w-full h-auto object-cover mb-4" />
  </div>
);

export default ProductImage;
