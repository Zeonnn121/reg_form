import React, { useState } from 'react';
import { Send, CheckCircle, Clock, MapPin, Calendar } from 'lucide-react';

interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  rollNo: string;
  emergencyContact: string;
  emergencyPhone: string;
  year: string;
  branch: string;
}

const initialFormData: RegistrationFormData = {
  name: '',
  email: '',
  phone: '',
  rollNo: '',
  emergencyContact: '',
  emergencyPhone: '',
  year: '',
  branch: ''
};

// Branch options by year
const branchOptionsByYear: Record<string, string[]> = {
  'FE': ['Comps A', 'Comps B', 'Comps C', 'CSE A', 'CSE B', 'CSE C', 'Mech', 'ECS'],
  'SE': ['Comps A', 'Comps B', 'Comps C', 'CSE', 'ECS', 'Mech'],
  'TE': ['Comps A', 'Comps B', 'Mech', 'ECS', 'AIDS'],
  'BE': ['Comps A', 'Comps B', 'Mech', 'ECS', 'AIDS']
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Partial<RegistrationFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [branchOptions, setBranchOptions] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'year') {
      // Update branch options when year changes
      const newBranchOptions = branchOptionsByYear[value] || [];
      setBranchOptions(newBranchOptions);
      
      // Reset branch if it's not available in the new year
      if (!newBranchOptions.includes(formData.branch)) {
        setFormData(prev => ({ ...prev, [name]: value, branch: '' }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name as keyof RegistrationFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<RegistrationFormData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.rollNo.trim()) {
      newErrors.rollNo = 'Roll number is required';
    }
    
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact name is required';
    
    if (!formData.emergencyPhone.trim()) {
      newErrors.emergencyPhone = 'Emergency contact number is required';
    } else if (!/^\d{10}$/.test(formData.emergencyPhone.replace(/\D/g, ''))) {
      newErrors.emergencyPhone = 'Emergency contact number is invalid';
    }
    
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.branch) newErrors.branch = 'Branch is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (validateForm()) {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setFormData(initialFormData);
        setIsSubmitted(false);
        setBranchOptions([]);
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
      alert('Registration failed. Please try again.');
    }
  }
};

  return (
    <section id="register" className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Register for Beach cleanup 2025
          </h2>
          <div className="w-20 h-1 bg-cyan-600 mx-auto mb-6"></div>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-2 bg-cyan-600 p-8 text-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Event Details</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <Calendar size={20} className="mt-0.5 flex-shrink-0" />
                  <span>Date: July, 2025</span>
                </li>
                <li className="flex items-start space-x-2">
                  <MapPin size={20} className="mt-0.5 flex-shrink-0" />
                  <span>Girgaon Chowpatty</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Clock size={20} className="mt-0.5 flex-shrink-0" />
                  <span>7:30 am to 9:30 am</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={20} className="mt-0.5 flex-shrink-0" />
                  <span>Certificate of participation</span>
                </li>
              </ul>
              <p className="mt-6 text-sm opacity-90">
                *Ticket will be mailed after registration confirmation.
              </p>
            </div>
            
            <div className="md:col-span-3 p-8">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <CheckCircle size={64} className="text-green-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for registering for Beach cleanup 2025. Check your email for confirmation details.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700 mb-1">
                        Roll Number *
                      </label>
                      <input
                        type="text"
                        id="rollNo"
                        name="rollNo"
                        value={formData.rollNo}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none ${
                          errors.rollNo ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.rollNo && <p className="mt-1 text-sm text-red-600">{errors.rollNo}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                        Year *
                      </label>
                      <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none ${
                          errors.year ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Year</option>
                        <option value="FE">FE</option>
                        <option value="SE">SE</option>
                        <option value="TE">TE</option>
                        <option value="BE">BE</option>
                      </select>
                      {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
                        Branch *
                      </label>
                      <select
                        id="branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        disabled={!formData.year}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none ${
                          errors.branch ? 'border-red-500' : 'border-gray-300'
                        } ${
                          !formData.year ? 'bg-gray-100 cursor-not-allowed' : ''
                        }`}
                      >
                        <option value="">Select Branch</option>
                        {branchOptions.map((branch) => (
                          <option key={branch} value={branch}>
                            {branch}
                          </option>
                        ))}
                      </select>
                      {errors.branch && <p className="mt-1 text-sm text-red-600">{errors.branch}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">
                        Emergency Contact Name *
                      </label>
                      <input
                        type="text"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none ${
                          errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.emergencyContact && <p className="mt-1 text-sm text-red-600">{errors.emergencyContact}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 mb-1">
                        Emergency Contact Number *
                      </label>
                      <input
                        type="tel"
                        id="emergencyPhone"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none ${
                          errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.emergencyPhone && <p className="mt-1 text-sm text-red-600">{errors.emergencyPhone}</p>}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send size={20} className="mr-2" />
                          Register Now
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;