import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const VolunteerRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    skill: '',
    state: '',
    availability: '',
    emergencyContact: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const skills = ['Medical', 'Rescue', 'Logistics'];
  const states = ['Gujarat', 'Maharashtra', 'Assam', 'Odisha', 'Andhra Pradesh', 'Bihar', 'Chennai', 'Patna', 'Bhuj'];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    // Removed phone and email validation
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.skill) newErrors.skill = 'Please select a skill';
    if (!formData.state) newErrors.state = 'Please select a state';
    if (!formData.availability) newErrors.availability = 'Please select availability';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send email to the volunteer
    emailjs.send(
      'service_309pt3c',  // Service ID for the volunteer
      'template_8vqc2bc',  // Template ID for the volunteer
      {
        ...formData,
        to_email: formData.email  // Assuming you want to send to the volunteer's email
      },
      'x14g7EOVwwfyEmUuN'  // Public key for the volunteer
    )
    .then((result) => {
      console.log('Volunteer email sent:', result.text);
    }, (error) => {
      console.error('Failed to send volunteer email:', error.text);
    });
    
    // Send email to your team
    emailjs.send(
      'service_x99elqq',  // Service ID for your team
      'template_wvw1xrs',  // Template ID for your team
      formData,
      'F3_0F_npMiqn7gctX'  // Public key for your team
    )
    .then((result) => {
      console.log('Team email sent:', result.text);
      setSubmitted(true);
    }, (error) => {
      console.error('Failed to send team email:', error.text);
      alert('Submission failed. Please try again.');
    });
  };

  if (submitted) {
    return (
      <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto text-center transition-opacity duration-700 ease-in-out opacity-100">
        <h2 className="text-3xl font-extrabold mb-6 text-green-700">🎉 Thank You for Registering!</h2>
        <p className="text-lg text-gray-700">We appreciate your willingness to volunteer. We will contact you soon.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-green-700 flex items-center gap-2">
        <span role="img" aria-label="pencil">📝</span> Volunteer Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        <div>
          <label className="block mb-2 font-semibold text-gray-800" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border rounded p-3 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-600 mt-1 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-800" htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="10-digit phone number"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full border rounded p-3 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phone && <p className="text-red-600 mt-1 text-sm">{errors.phone}</p>}
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-800" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border rounded p-3 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-600 mt-1 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-800" htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter your full address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full border rounded p-3 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            rows="3"
          />
          {errors.address && <p className="text-red-600 mt-1 text-sm">{errors.address}</p>}
        </div>

        {/* Similar simplified styling for select elements */}

        <div>
          <label className="block mb-2 font-semibold text-gray-800" htmlFor="availability">Availability</label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className={`w-full border rounded p-3 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.availability ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select availability</option>
            <option value="immediately">Immediately</option>
            <option value="1_week">Within 1 week</option>
            <option value="2_weeks">Within 2 weeks</option>
          </select>
          {errors.availability && <p className="text-red-600 mt-1 text-sm">{errors.availability}</p>}
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-800" htmlFor="emergencyContact">
            Emergency Contact (optional)
          </label>
          <input
            id="emergencyContact"
            name="emergencyContact"
            type="tel"
            placeholder="10-digit emergency number"
            value={formData.emergencyContact}
            onChange={handleChange}
            className={`w-full border rounded p-3 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.emergencyContact ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.emergencyContact && <p className="text-red-600 mt-1 text-sm">{errors.emergencyContact}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded transition-colors"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default VolunteerRegistration;