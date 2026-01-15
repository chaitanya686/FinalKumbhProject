import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    accommodationType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        accommodationType: 'general'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const faqs = [
    {
      id: 1,
      question: "How do I book accommodation for Kumbh Mela 2027?",
      answer: "You can book accommodation directly through our platform. Simply select your preferred dates, choose from hotels, homestays, or tents, and complete the booking process. Our team will confirm your booking within 24 hours."
    },
    {
      id: 2,
      question: "What is the cancellation policy?",
      answer: "Cancellations made 30+ days before check-in receive full refund. 15-30 days: 75% refund, 7-14 days: 50% refund, Less than 7 days: No refund. Special conditions apply during peak pilgrimage days."
    },
    {
      id: 3,
      question: "Are the accommodations near the main bathing ghats?",
      answer: "Yes, we carefully select accommodations based on proximity to the main bathing ghats. Most properties are within 1-3 km walking distance or have shuttle services available."
    },
    
    {
      id: 5,
      question: "Is food provided at the accommodations?",
      answer: "Most accommodations offer meal plans. Hotels provide restaurant services, homestays offer home-cooked vegetarian meals, and tent accommodations have dedicated langar (community kitchen) arrangements."
    }
  ];

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Visit Our Office",
      details: ["Kumbhathon Headquarters", "Near Ram Kund, Panchavati", "Nashik, Maharashtra 422003"],
      color: "#FF9933"
    },
    {
      icon: "fas fa-phone",
      title: "Call Us",
      details: ["General Enquiries: +91 1800 123 4567", "Booking Support: +91 1800 123 4568", "Emergency: +91 98230 12345"],
      color: "#4CAF50"
    },
    {
      icon: "fas fa-envelope",
      title: "Email Us",
      details: ["General: info@kumbhathon2027.com", "Support: support@kumbhathon2027.com", "Partnerships: partner@kumbhathon2027.com"],
      color: "#2196F3"
    },
    {
      icon: "fas fa-clock",
      title: "Working Hours",
      details: ["Monday - Friday: 8:00 AM - 10:00 PM", "Saturday - Sunday: 9:00 AM - 11:00 PM", "24/7 Emergency Support Available"],
      color: "#9C27B0"
    }
  ];

  const accommodationTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'hotel', label: 'Hotel Booking' },
    { value: 'homestay', label: 'Homestay Booking' },
    { value: 'tent', label: 'Tent Accommodation' },
    { value: 'group', label: 'Group Booking' },
    { value: 'emergency', label: 'Emergency Support' }
  ];

  return (
    <div className="contact-page">
      {/* Success Message at Top */}
      {submitSuccess && (
        <div className="success-message-top">
          <div className="success-content">
            <i className="fas fa-check-circle"></i>
            <div>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for contacting Kumbhathon 2027. Our team will respond within 24 hours.</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <p className="hero-title">Contact Kumbhathon 2027</p>
            <p className="hero-subtitle"><span>Your Sacred Journey, Our Responsibility .</span>
            <br />
              Planning your stay for Kumbh Mela 2027 in Nashik? Our dedicated support team is here to assist you with accommodations, safety, and a peaceful spiritual experience.
            </p>
          </div>
        </div>
      </div>

      <div className="contact-container">
        {/* Contact Cards */}
        <div className="contact-info-section">
          <h2 className="section-title">Get in Touch</h2>
          
          <div className="contact-cards-grid">
            {contactInfo.map((item, index) => (
              <div key={index} className="contact-card">
                <div className="card-icon" style={{ backgroundColor: item.color }}>
                  <i className={item.icon}></i>
                </div>
                <h3 className="card-title">{item.title}</h3>
                <div className="card-details">
                  {item.details.map((detail, idx) => (
                    <p key={idx} className="card-detail">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form & Map */}
        <div className="contact-main-section">
          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <h2 className="form-title">Send us a Message</h2>
              <p className="form-subtitle">Fill out the form below and we'll get back to you within 24 hours</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <i className="fas fa-user"></i> Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <i className="fas fa-envelope"></i> Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <i className="fas fa-phone"></i> Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="accommodationType" className="form-label">
                    <i className="fas fa-bed"></i> Inquiry Type *
                  </label>
                  <select
                    id="accommodationType"
                    name="accommodationType"
                    value={formData.accommodationType}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    {accommodationTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="subject" className="form-label">
                    <i className="fas fa-tag"></i> Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter subject"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message" className="form-label">
                    <i className="fas fa-comment-alt"></i> Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Please describe your inquiry in detail..."
                    rows="6"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="form-footer">
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Send Message
                    </>
                  )}
                </button>
                <p className="form-note">
                  * Required fields. We respect your privacy and will never share your information.
                </p>
              </div>
            </form>
          </div>

          {/* Map Section */}
          <div className="map-section">
            <div className="map-container">
              <div className="map-header">
                <h3 className="map-title">
                  <i className="fas fa-map-marked-alt"></i>
                  Our Location in Nashik
                </h3>
                <p className="map-subtitle">Visit our office near the sacred Godavari River</p>
              </div>
              
              <div className="map-placeholder">
                <div className="map-image"></div>
              </div>

              <div className="map-footer">
                <div className="map-info-card">
                  <div className="map-info">
                    <h4><i className="fas fa-building"></i> Kumbhathon Headquarters</h4>
                    <p>Near Ram Kund, Panchavati</p>
                    <p>Nashik, Maharashtra 422003</p>
                  </div>
                  <div className="map-actions">
                    <button className="map-btn directions-btn">
                      <i className="fas fa-directions"></i>
                      Get Directions
                    </button>
                    <button className="map-btn call-btn">
                      <i className="fas fa-phone"></i>
                      Call Now
                    </button>
                    <button className="map-btn email-btn">
                      <i className="fas fa-envelope"></i>
                      Email Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <div className="faq-header">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <p className="faq-subtitle">Quick answers to common questions about Kumbh Mela 2027</p>
          </div>
          
          <div className="faq-list">
            {faqs.map((faq) => (
              <div 
                key={faq.id} 
                className={`faq-item ${activeFAQ === faq.id ? 'active' : ''}`}
                onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <i className={`fas fa-chevron-${activeFAQ === faq.id ? 'up' : 'down'}`}></i>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="faq-footer">
            <p>Still have questions? <button className="chat-btn">
              <i className="fas fa-comments"></i>
              Start Live Chat
            </button></p>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="social-newsletter-section">
          <div className="social-section">
            <h3>Connect With Us</h3>
            <p>Follow us for updates on Kumbh Mela 2027</p>
            <div className="social-icons">
              <a href="#" className="social-icon facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon youtube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="social-icon whatsapp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          
          <div className="newsletter-section">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for Kumbh Mela updates</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button className="subscribe-btn">
                <i className="fas fa-paper-plane"></i>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
