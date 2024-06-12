// src/app/category/[type]/page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { IProduct } from '../../../types';
import ProductCard from '../../../components/ProductCard';
import Filter from '../../../components/Filter';
import Sort from '../../../components/Sort';

interface CategoryPageProps {
  params: {
    type: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [sortType, setSortType] = useState<string>('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products?category=${params.type}`);
        setProducts(response.data);
        setFilteredProducts(response.data);

        const uniqueBrands: string[] = Array.from(new Set(response.data.map((product: IProduct) => product.brand)));
        setBrands(uniqueBrands);

        const productPrices: number[] = response.data.flatMap((product: IProduct) => product.prices.map(price => price.price));
        const minProductPrice = Math.min(...productPrices);
        const maxProductPrice = Math.max(...productPrices);

        setMinPrice(minProductPrice);
        setMaxPrice(maxProductPrice);
        setPriceRange([minProductPrice, maxProductPrice]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [params.type]);

  useEffect(() => {
    const filtered = products.filter(product => {
      const productPrices = product.prices.map(price => price.price);
      const minProductPrice = Math.min(...productPrices);
      const maxProductPrice = Math.max(...productPrices);
      const matchesPrice = minProductPrice >= priceRange[0] && maxProductPrice <= priceRange[1];
      const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;

      return matchesPrice && matchesBrand;
    });

    const sorted = filtered.sort((a, b) => {
      if (sortType === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortType === 'price') {
        const aMinPrice = Math.min(...a.prices.map(price => price.price));
        const bMinPrice = Math.min(...b.prices.map(price => price.price));
        return aMinPrice - bMinPrice;
      }
      return 0;
    });

    setFilteredProducts(sorted);
  }, [sortType, priceRange, selectedBrand, products]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPriceRange = [...priceRange] as [number, number];
    newPriceRange[index] = parseFloat(e.target.value);
    setPriceRange(newPriceRange);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <div className="flex justify-between mb-4">
          <Sort sortType={sortType} onChange={handleSortChange} />
          <Filter
            brands={brands}
            selectedBrand={selectedBrand}
            onBrandChange={handleBrandChange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">Нет продуктов в этой категории</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
