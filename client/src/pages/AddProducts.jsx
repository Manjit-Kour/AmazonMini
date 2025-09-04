import React, { useState } from "react";

const AddProducts = () => {
  const [products, setProducts] = useState([
    { Title: "", Description: "" , Price: "" },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...products];
    updated[index][name] = value;
    setProducts(updated);
  };

  const addProductField = () => {
    setProducts([...products, { Title: "", Description: "" , Price: ""}]);
  };

  const removeProductField = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Products:", products);
    // Send `products` to backend API
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-[#131921]">Add Products</h2>
      <form onSubmit={handleSubmit}>
        {products.map((product, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 mb-4 relative"
          >
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Title
                </label>
                <input
                  type="text"
                  name="Title"
                  value={product.Title}
                  onChange={(e) => handleChange(index, e)}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
             
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  name="Description"
                  value={product.Description}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="Price"
                  value={product.Price}
                  onChange={(e) => handleChange(index, e)}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>

            {products.length > 1 && (
              <button
                type="button"
                onClick={() => removeProductField(index)}
                className="absolute top-2 right-2 text-red-500 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={addProductField}
            className="bg-[#FFD814] hover:bg-[#F7CA00] text-black font-bold py-2 px-4 rounded"
          >
            + Add Another Product
          </button>

          <button
            type="submit"
            className="bg-[#131921] hover:bg-[#232F3E] text-white font-bold py-2 px-4 rounded"
          >
            Submit All
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
