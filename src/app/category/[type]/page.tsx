import mongoose from 'mongoose';
import Product from '@/models/Product';
import Price from '@/models/Price';
import dbConnect from '@/lib/mongoose';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const categoryNames: { [key: string]: string } = {
  gpu: 'Видеокарты',
  cpu: 'Процессоры',
  motherboards: 'Материнские платы',
  ram: 'Оперативная память',
  storage: 'Накопители',
  // Добавьте другие категории здесь
};

interface PriceType {
  price: string;
  site: string;
  link: string;
}

interface ProductType {
  _id: string;
  name: string;
  specs: string;
  url: string;
  type: string;
  image: string;
  partNumber: string;
  prices: PriceType[];
}

interface Params {
  params: {
    type: string;
  };
}

const CategoryPage = async ({ params }: Params) => {
  await dbConnect();

  const productData: ProductType[] = await Product.find({ type: params.type }).lean();
  const productsWithPrices: ProductType[] = await Promise.all(
    productData.map(async (product) => {
      const prices: PriceType[] = await Price.find({ partNumber: product.partNumber }).lean();
      return { ...product, prices };
    })
  );

  const categoryName = categoryNames[params.type] || params.type;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Категория: {categoryName}</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productsWithPrices.length > 0 ? (
            productsWithPrices.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">Нет продуктов в этой категории</p>
          )}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
