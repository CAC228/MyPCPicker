import React from 'react';

interface ProductImageProps {
  imageUrl: string;
  name: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, name }) => (
  <div className="w-auto p-4">
    <img src={imageUrl} alt={name} className="w-auto h-45 object-cover mb-4" />
  </div>
);

export default ProductImage;
