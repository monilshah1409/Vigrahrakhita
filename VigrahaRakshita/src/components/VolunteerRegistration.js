import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const VolunteerRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    skill: '',
    state: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const skills = ['Medical', 'Rescue', 'Logistics'];
  const states = ['Gujarat', 'Maharashtra', 'Assam', 'Odisha', 'Andhra Pradesh', 'Bihar', 'Chennai', 'Patna', 'Bhuj'];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.skill) newErrors.skill = 'Please select a skill';
    if (!formData.state) newErrors.state = 'Please select a state';
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
      'service_309pt3c',
      'template_8vqc2bc',
      {
        ...formData,
        to_email: formData.email
      },
      'x14g7EOVwwfyEmUuN'
    )
    .then((result) => {
      console.log('Volunteer email sent:', result.text);
    }, (error) => {
      console.error('Failed to send volunteer email:', error.text);
    });
    
    // Send email to your team
    emailjs.send(
      'service_x99elqq',
      'template_wvw1xrs',
      formData,
      'F3_0F_npMiqn7gctX'
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
      <div className="fixed inset-0 bg-green-50 transition-all duration-1000 ease-in-out flex items-center justify-center">
        <div className="p-6 rounded shadow max-w-4xl mx-auto text-center">
          <div className="animate-bounce mb-8">
            <svg className="mx-auto h-24 w-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold mb-6 text-green-700">🎉 Application Submitted!</h2>
          <p className="text-lg text-gray-700 mb-8">We appreciate your willingness to volunteer. We will contact you soon.</p>
          <div className="w-full bg-green-50 p-4 rounded-lg">
            <div className="h-2 bg-green-200 rounded-full">
              <div className="h-2 bg-green-500 rounded-full w-0 animate-progress"></div>
            </div>
            <p className="mt-2 text-sm text-green-700">Processing your application...</p>
          </div>
          <div className="mt-8">
            <button 
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
            >
              Submit Another Response
            </button>
          </div>
        </div>
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
        <div>
          <label className="block mb-2 font-semibold text-gray-800" htmlFor="skill">Skill</label>
          <select
            id="skill"
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            className={`w-full border rounded p-3 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.skill ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select skill</option>
            {skills.map((skill) => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
          {errors.skill && <p className="text-red-600 mt-1 text-sm">{errors.skill}</p>}
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-800" htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`w-full border rounded p-3 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select state</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <p className="text-red-600 mt-1 text-sm">{errors.state}</p>}
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