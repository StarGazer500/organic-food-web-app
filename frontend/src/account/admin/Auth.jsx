import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';

export function CreateAdminAccount() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    roleIds: [],
    isActive: false,
  });

  const [error, setError] = useState('');

  

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.checked
      }));
    } else if (name === 'roleIds') {
      // Handle roleIds as comma-separated string converted to array of numbers
      const roleIdsArray = value.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
      setFormData((prev) => ({
        ...prev,
        [name]: roleIdsArray
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    try {
      const response = await fetch('http://localhost:3000/admin-auth/create-account', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData) // Send actual form data
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || `Error with response status ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log('Success:', data.message);
      setError(''); // Clear any previous errors
      
      // Optionally reset form after successful submission
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        roleIds: [],
        isActive: false,
      });
      
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error occurred. Please try again.");
    }
  };

  return (
    <div className='text-center border rounded bg-green-400'>
      <h1>Create Admin Account</h1>
       <div className='flex flex-row justify-center'>
        <div className='flex flex-col ml-10 mb-7 justify-center border'>
             <img src="https://i.pinimg.com/736x/e9/60/d1/e960d1d667d6d6c89227b8abe23ec905.jpg" className='w-full h-full object-cover' alt="No Image" />
        </div>
      <div className='flex flex-col ml-10 mr-10 justify-center'>
      <form onSubmit={handleSubmit} className='border rounded p-4'>
        <div className='mb-5'>
          <label htmlFor="email">Email:</label>
          <input
            className='border ml-10'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="password">Password:</label>
          <input
          className='border ml-3'
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            maxLength={100}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="firstName">First Name:</label>
          <input
          className='border ml-1'
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            minLength={1}
            maxLength={50}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="lastName">Last Name:</label>
          <input
          className='border ml-1'
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            minLength={1}
            maxLength={50}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="roleIds">Role IDs:</label>
          <input
          className='border ml-5'
            type="text"
            id="roleIds"
            name="roleIds"
            value={formData.roleIds.join(', ')}
            onChange={handleChange}
            placeholder="e.g., 1, 2, 3"
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="isActive">
            <input
            className='border ml-10'
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active
          </label>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Create Admin Account</button>
        <p>Don’t have an account? <Link to="/admin-login"><span className='text-blue-800'>login </span> </Link></p>
      </form>
      </div>
    </div>
    </div>
  );
}

export function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    
  });
const navigate = useNavigate()  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;

      if (value===''){
        setError("entries cannot be empty")
        return
      } 

      setFormData((prev) => ({ ...prev,[name]: value}));

      if(error!=="") setError("")
   
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    try {
      const response = await fetch('http://localhost:3000/admin-auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData) // Send actual form data
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || `Error with response status ${response.status}`);
        return;
      }

      const data = await response.json();
      navigate('/create-admin-account')
      console.log('Success:', data,data.access_token);
      setError(''); // Clear any previous errors
      
      // Optionally reset form after successful submission
      setFormData({
        email: '',
        password: '',
        role: '',
        
      });
      
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error occurred. Please try again.");
    }
  };

  return (
    <div className='text-center border rounded bg-green-400'>
      <h1>Admin Login</h1>
      <div className='flex flex-row justify-center'>
        <div className='flex flex-col ml-10 mb-7 justify-center border'>
             <img src="https://i.pinimg.com/736x/e9/60/d1/e960d1d667d6d6c89227b8abe23ec905.jpg" className='w-full h-full object-cover' alt="No Image" />
        </div>
      <div className='flex flex-col ml-10 mr-10 justify-center '>
      <form onSubmit={handleSubmit} className='border rounded p-4'>
        <div className='mb-5'>
          <label htmlFor="email">Email:</label>
          <input
          className='border ml-10'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="password">Password:</label>
          <input
            className='border ml-3'
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="role">role:</label>
          <input
          className='border ml-13'
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            minLength={1}
            maxLength={50}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit"> Login Admin</button>
        <p>Don’t have an account? <Link to="/create-admin-account"><span className='text-blue-800'>signup </span> </Link></p>
      </form>
      </div>
    </div>
    </div>
  );
}