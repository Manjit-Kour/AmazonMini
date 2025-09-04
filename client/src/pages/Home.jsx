import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/products/view')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {/* One card for each category */}
      {['Pick up where you left off', 'Keep shopping for', 'Buy again'].map((title, idx) => (
        <article key={idx} className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">{title}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 4).map(product => (
              <div key={product._id} className="flex flex-col items-center text-center">
                <img
                  src={`http://localhost:8000${product.ImageUrl}`}
                  alt={product.Title}
                  className="w-full h-32 object-cover rounded"
                />
                <div className="mt-2 text-sm font-medium">{product.Title}</div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
};

export default Home;
