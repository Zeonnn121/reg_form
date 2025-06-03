import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    rollNo: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // WhatsApp message function
  const sendWhatsAppMessage = (number) => {
    const message = `Hello Rotaract CRCE team,\nI'm interested in Beach Cleanup 2025 and would like more information.`;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Contact Us
          </h2>
          <div className="w-20 h-1 bg-cyan-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions or need more information? Reach out to us!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h3>
            <p className="text-gray-600 mb-8">
              Our team is happy to answer your questions about Beach Cleanup 2025. Fill out the form or contact us directly via WhatsApp.
            </p>
            
            {/* WhatsApp Contact Options */}
            <div className="mb-8">
              <h4 className="font-bold text-gray-800 mb-4">Quick Connect via WhatsApp</h4>
              <div className="space-y-4">
                <button 
                  onClick={() => sendWhatsAppMessage('918928034018')}
                  className="w-full flex items-center justify-between bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="text-green-600" size={20} />
                    </div>
                    <div className="text-left">
                      <h5 className="font-medium text-gray-800">Main Contact</h5>
                      <p className="text-sm text-gray-600">Primary coordinator</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-medium">Chat Now</span>
                </button>
                
                <button 
                  onClick={() => sendWhatsAppMessage('918928034018')}
                  className="w-full flex items-center justify-between bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="text-green-600" size={20} />
                    </div>
                    <div className="text-left">
                      <h5 className="font-medium text-gray-800">Alternate Contact</h5>
                      <p className="text-sm text-gray-600">Secondary coordinator</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-medium">Chat Now</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-cyan-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Email</h4>
                  <a href="mailto:rotaractfrcrce@gmail.com" className="text-cyan-600 hover:underline">
                    rotaractfrcrce@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-cyan-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Phone</h4>
                  <a href="tel:+91 89280304018" className="text-cyan-600 hover:underline">
                    +91 8928034018
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* FR CRCE Location Section */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">FR CRCE Location</h3>
            
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-cyan-600" size={20} />
              </div>
              <div>
                <address className="not-italic text-gray-600">
                  <p className="font-bold text-gray-800 mb-1">Fr. Conceicao Rodrigues College of Engineering</p>
                  Father Agnel Ashram, Bandstand<br />
                  Bandra West, Mumbai - 400050<br />
                  Maharashtra, India
                </address>
              </div>
            </div>
            
            {/* Embedded Map */}
            <div className="rounded-lg overflow-hidden shadow-lg h-64">
              <iframe
                title="FR CRCE Location"
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.441013713026!2d72.81779557492925!3d19.04433805296634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9410830616d%3A0x111b63353dbbce01!2sFr.%20Conceicao%20Rodrigues%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1748863436551!5m2!1sen!2sin" 
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            
            {/* Connect With Us Section */}
            <div className="mt-8">
              <h4 className="font-bold text-gray-800 mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/rotaract_crce?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-cyan-100 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="text-gray-600 hover:text-cyan-600" size={20} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-cyan-100 transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="text-gray-600 hover:text-cyan-600" size={20} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-cyan-100 transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="text-gray-600 hover:text-cyan-600" size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;