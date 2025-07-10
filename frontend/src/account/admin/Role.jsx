import { useState } from 'react'

export function CreateAdminRole() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive:true
    
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.checked
      }));
    }  else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    try {
      const response = await fetch('http://localhost:3000/roles/create-role', {
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
       name: '',
       description: '',
       isActive:true
      });
      
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create Admin Account</h1>
      <form onSubmit={handleSubmit}>
        

        <div>
          <label htmlFor="name">Role Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={1}
            maxLength={50}
          />
        </div>

        <div>
          <label htmlFor="description">Role Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            minLength={1}
            maxLength={50}
          />
        </div>

       

        <div>
          <label htmlFor="isActive">
            <input
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
        <button type="submit">Create Admin Role</button>
      </form>
    </div>
  );
}