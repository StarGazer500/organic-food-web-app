import { useState } from 'react'

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
    <div>
      <h1>Create Admin Account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
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
          <label htmlFor="firstName">First Name:</label>
          <input
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
          <label htmlFor="roleIds">Role IDs (comma-separated):</label>
          <input
            type="text"
            id="roleIds"
            name="roleIds"
            value={formData.roleIds.join(', ')}
            onChange={handleChange}
            placeholder="e.g., 1, 2, 3"
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
        <button type="submit">Create Admin Account</button>
      </form>
    </div>
  );
}