import React, { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Create email content
      const emailSubject = `Contact Form Submission from ${formData.name}`;
      const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
      `.trim();
      
      // Create mailto link
      const mailtoLink = `mailto:admin@impakrintas.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Reset form and show success message
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="legal-page">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      
      <div className="contact-form-section">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                required
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
              required
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'error' : ''}
              placeholder="Please tell us how we can help you..."
              required
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>

        {submitStatus === 'success' && (
          <div className="success-message">
            <p>Thank you for your message! Your email client should have opened. If it didn't, please email us directly at <a href="mailto:admin@impakrintas.com">admin@impakrintas.com</a></p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="form-error-message">
            <p>There was an error sending your message. Please email us directly at <a href="mailto:admin@impakrintas.com">admin@impakrintas.com</a></p>
          </div>
        )}
      </div>

      <h2>Other Ways to Reach Us</h2>
      <p>Email: <a href="mailto:admin@impakrintas.com">admin@impakrintas.com</a></p>

      <style jsx>{`
        .contact-form-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 12px;
          padding: 2.5rem 3rem 3rem 3rem;
          margin: 1.5rem 0 2.5rem 0;
          position: relative;
        }

        .contact-form-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #3498db, #2980b9);
          border-radius: 0 0 2px 2px;
        }

        .contact-form {
          max-width: 700px;
          margin: 0 auto;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .form-group {
          margin-bottom: 2rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.75rem;
          font-weight: 600;
          color: #2c3e50;
          font-size: 1.05rem;
          letter-spacing: 0.3px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 2px solid #e1e8ed;
          border-radius: 8px;
          font-size: 1rem;
          font-family: 'Segoe UI', 'Arial', sans-serif;
          box-sizing: border-box;
          transition: all 0.3s ease;
          background: #ffffff;
          color: #2c3e50;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
          transform: translateY(-1px);
        }

        .form-group input.error,
        .form-group textarea.error {
          border-color: #e74c3c;
          box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .error-message {
          color: #e74c3c;
          font-size: 0.9rem;
          margin-top: 0.5rem;
          display: block;
          font-weight: 500;
          letter-spacing: 0.2px;
        }

        .form-actions {
          text-align: center;
          margin-top: 2.5rem;
        }

        .submit-button {
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          color: white;
          border: none;
          padding: 1rem 3rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Segoe UI', 'Arial', sans-serif;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        }

        .submit-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #2980b9 0%, #1f609d 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
        }

        .submit-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-button:disabled {
          background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
          cursor: not-allowed;
          transform: none;
          box-shadow: 0 2px 8px rgba(149, 165, 166, 0.3);
        }

        .success-message {
          background: linear-gradient(135deg, #d5f4e6 0%, #c8e6d0 100%);
          color: #155724;
          padding: 1.5rem;
          border-radius: 8px;
          margin: 1.5rem 0;
          border-left: 5px solid #27ae60;
          box-shadow: 0 4px 12px rgba(39, 174, 96, 0.15);
        }

        .form-error-message {
          background: linear-gradient(135deg, #f8d7da 0%, #f1c0c5 100%);
          color: #721c24;
          padding: 1.5rem;
          border-radius: 8px;
          margin: 1.5rem 0;
          border-left: 5px solid #e74c3c;
          box-shadow: 0 4px 12px rgba(231, 76, 60, 0.15);
        }

        .success-message a,
        .form-error-message a {
          color: inherit;
          text-decoration: underline;
          font-weight: 600;
        }

        .success-message a:hover,
        .form-error-message a:hover {
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .contact-form-section {
            padding: 2rem 1.5rem;
            margin: 1.5rem 0;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .submit-button {
            width: 100%;
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .contact-form-section {
            padding: 1.5rem 1rem;
          }

          .form-group input,
          .form-group textarea {
            padding: 0.875rem 1rem;
          }
        }
      `}</style>
    </main>
  );
}
