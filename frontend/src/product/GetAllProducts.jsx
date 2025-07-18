import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function GetAllProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3000/product/get-all-products', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || `Error with response status ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log('Success:', data);
      
      // Assuming the API returns an array of products directly
      // If it's wrapped in an object, adjust accordingly
      setProducts(Array.isArray(data) ? data : data.products || []);
      setError('');
      
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
        <button 
          onClick={handleSubmit}
          className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found</p>
        <button 
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="aspect-square bg-gray-200 relative">
              <img
                src={`http://localhost:3000${product.imageUrl}`}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE2IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                }}
              />
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">${product.price}</span>
                <button 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the card click
                    // Add to cart logic here
                  }}
                >
                  Add to Cart
                </button>
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                Added: {new Date(product.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <button 
          onClick={handleSubmit}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-md"
        >
          Refresh Products
        </button>
      </div>
    </div>
  );
}