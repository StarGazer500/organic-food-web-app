import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';


export function CreateNormalUserAccount() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
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
      const response = await fetch('http://localhost:3000/normaluser/create-account', {
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
        isActive: false,
      });
      
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error occurred. Please try again.");
    }
  };

  return (
    <div className='text-center border rounded bg-green-400' >
        <h1>Create  Account</h1>
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
                    className='border ml-2.5'
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
                    className='border ml-0.5'
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

                <div>
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

            

                <div>
                <label htmlFor="isActive">
                    <input
                    className='border'
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
                <button type="submit">Create Account</button>
                <p>Already have account? <Link to="/login"> <span className='text-blue-800'>login </span> </Link></p>
            </form>
        </div>
        </div>
    </div>
  );
}


export function NormauserLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    
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
      const response = await fetch('http://localhost:3000/normaluser/login', {
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
    //   navigate('/create-admin-account')
      console.log('Success:', data,data.access_token);
      setError(''); // Clear any previous errors
      
      // Optionally reset form after successful submission
      setFormData({
        email: '',
        password: '',
        
        
      });
      
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error occurred. Please try again.");
    }
  };

  return (
    
    <div className='text-center border rounded bg-green-400'>
      <h1>Login User</h1>
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

        <div>
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

        

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit"> Login </button>
        <p>Don’t have an account? <Link to="/create-account"><span className='text-blue-800'>signup </span> </Link></p>
      </form>
      </div>
    </div>
    </div>
  );
}
