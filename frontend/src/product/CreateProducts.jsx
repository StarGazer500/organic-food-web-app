import { useState } from 'react';

export function CreateProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageFile: null,
  });

  const [imagePreview, setImagePreview] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          setError('Please select a valid image file');
          return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setError('Image file must be less than 5MB');
          return;
        }
        
        setFormData((prev) => ({
          ...prev,
          [name]: file
        }));
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.checked
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async () => {
    
    // Client-side validation
    if (!formData.name.trim()) {
      setError('Product name is required');
      return;
    }
    
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    
    if (!formData.price.trim()) {
      setError('Price is required');
      return;
    }
    
    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Price must be a valid positive number');
      return;
    }
    
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('name', formData.name.trim());
      submitData.append('description', formData.description.trim());
      submitData.append('price', priceNum.toString());
      
      if (formData.imageFile) {
        submitData.append('image', formData.imageFile);
      }
      
      const response = await fetch('http://localhost:3000/product/create-product', {
        method: 'POST',
        credentials: 'include',
        body: submitData // Don't set Content-Type header for FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || `Error with response status ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log('Success:', data.message);
      setError('');
      setSuccess('Product created successfully!');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        description: '',
        price: '',
        imageFile: null,
      });
      setImagePreview('');
      
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error occurred. Please try again.");
    }
  };

  return (
    <div className='text-center border rounded bg-green-400 p-4'>
      <h1 className='text-2xl font-bold mb-6'>Create Product</h1>
      <div className='flex flex-row justify-center gap-8'>
        
        <div className='flex flex-col justify-center border rounded p-4 bg-white'>
          <div className='w-64 h-64 border-2 border-dashed border-gray-300 rounded flex items-center justify-center'>
            {imagePreview ? (
              <img 
                src={imagePreview} 
                className='w-full h-full object-cover rounded' 
                alt="Product preview"
              />
            ) : (
              <div className='text-gray-500 text-center'>
                <p>Product Image Preview</p>
                <p className='text-sm'>Upload an image below</p>
              </div>
            )}
          </div>
        </div>
        
        <div className='flex flex-col justify-center'>
            <div onSubmit={handleSubmit} className='border rounded p-6 bg-white min-w-96'>
            <div className='mb-5'>
              <label htmlFor="name" className='block text-left font-medium mb-2'>
                Product Name: <span className='text-red-500'>*</span>
              </label>
              <input
                className='border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={50}
                placeholder="Enter product name"
              />
              <small className='text-gray-500 text-left block'>Max 50 characters</small>
            </div>

            <div className='mb-5'>
              <label htmlFor="description" className='block text-left font-medium mb-2'>
                Description: <span className='text-red-500'>*</span>
              </label>
              <textarea
                className='border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                maxLength={255}
                rows={3}
                placeholder="Enter product description"
              />
              <small className='text-gray-500 text-left block'>Max 255 characters</small>
            </div>

            <div className='mb-5'>
              <label htmlFor="price" className='block text-left font-medium mb-2'>
                Price: <span className='text-red-500'>*</span>
              </label>
              <input
                className='border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="Enter price"
              />
              <small className='text-gray-500 text-left block'>Enter a positive number</small>
            </div>

            <div className='mb-5'>
              <label htmlFor="imageFile" className='block text-left font-medium mb-2'>
                Product Image: <span className='text-gray-500'>(optional)</span>
              </label>
              <input
                className='border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                type="file"
                id="imageFile"
                name="imageFile"
                onChange={handleChange}
                accept="image/*"
              />
              <small className='text-gray-500 text-left block'>
                Select an image file (JPG, PNG, etc.) - Max 5MB
              </small>
            </div>

            {error && (
              <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
                {error}
              </div>
            )}
            
            {success && (
              <div className='mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded'>
                {success}
              </div>
            )}
            
            <button 
              type="button" 
              onClick={handleSubmit}
              className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mb-4 transition-colors'
            >
              Create Product
            </button>
            
            <p className='text-sm text-gray-600'>
              Need to go back? 
              <a href="/products" className='text-blue-600 hover:text-blue-800 ml-1'>
                View Products
              </a>
            </p>
            <p className='text-sm text-gray-600'>
              Not logged in? 
              <a href="/admin-login" className='text-blue-600 hover:text-blue-800 ml-1'>
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;