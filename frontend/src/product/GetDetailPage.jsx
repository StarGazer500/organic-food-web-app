import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`http://localhost:3000/product/get-product/${id}`, {
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
      console.log('Product details:', data);
      setProduct(data);
      setError('');
      
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-bold text-red-800">Error Loading Product</h2>
            </div>
            <p className="text-red-700 mb-6">{error}</p>
            <div className="flex gap-3">
              <button 
                onClick={fetchProduct}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
              <button 
                onClick={() => navigate(-1)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-20">
            <svg className="w-20 h-20 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-8">Sorry, we couldn't find the product you're looking for.</p>
            <button 
              onClick={() => navigate(-1)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    // <div className="min-h-screen bg-gray-50 py-8">
              <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-blue-600 hover:text-blue-800 font-medium text-lg transition-colors duration-200"
        >
          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="bg-gray-100 p-6 flex items-center justify-center min-h-80 lg:min-h-[500px]">
              <div className="w-full max-w-sm aspect-square bg-white rounded-xl overflow-hidden shadow-lg">
                <img
                  src={`http://localhost:3000${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 lg:p-8 flex flex-col">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
                
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-6">${product.price}</div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-800 mb-2">Quantity</label>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l-lg transition-colors duration-200"
                    >
                      -
                    </button>
                    <span className="bg-gray-100 py-2 px-4 text-lg font-semibold text-gray-800 min-w-12 text-center">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r-lg transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Product Meta Information */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Product Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium w-24">Product ID:</span>
                      <span className="text-gray-800">{product.id}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium w-24">Added:</span>
                      <span className="text-gray-800">{new Date(product.createdAt).toLocaleDateString()}</span>
                    </div>
                    {product.updatedAt && (
                      <div className="flex items-center text-gray-600">
                        <span className="font-medium w-24">Updated:</span>
                        <span className="text-gray-800">{new Date(product.updatedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-auto">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Add to Cart
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
}