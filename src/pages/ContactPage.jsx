import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.handleAuth);

  // Pre-fill email if user is logged in
  React.useEffect(() => {
    if (auth.isAuthenticated && auth.user?.email) {
      setFormData(prev => ({
        ...prev,
        email: auth.user.email,
        name: auth.user.name || ""
      }));
    }
  }, [auth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.message.length < 10) {
      toast.error("Message must be at least 10 characters long");
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock contact form submission
      const contactData = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
      };
      
      // Store in localStorage for demo purposes
      const existingContacts = JSON.parse(localStorage.getItem("contactMessages") || "[]");
      existingContacts.push(contactData);
      localStorage.setItem("contactMessages", JSON.stringify(existingContacts));
      
      toast.success("Message sent successfully! We'll get back to you soon.");
      
      // Reset form
      setFormData({
        name: auth.isAuthenticated ? auth.user?.name || "" : "",
        email: auth.isAuthenticated ? auth.user?.email || "" : "",
        subject: "",
        message: ""
      });
      
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Contact Us</h1>
        <hr />
        
        {/* Contact Information Section */}
        <div className="row mb-5">
          <div className="col-md-8 mx-auto">
            <div className="row text-center">
              <div className="col-md-4 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <i className="fa fa-map-marker fa-3x text-primary mb-3"></i>
                    <h5 className="card-title">Visit Us</h5>
                    <p className="card-text">123 E-commerce Street<br />Digital City, DC 12345</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <i className="fa fa-phone fa-3x text-primary mb-3"></i>
                    <h5 className="card-title">Call Us</h5>
                    <p className="card-text">+1 (555) 123-4567<br />Mon - Fri, 9AM - 6PM</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <i className="fa fa-envelope fa-3x text-primary mb-3"></i>
                    <h5 className="card-title">Email Us</h5>
                    <p className="card-text">support@reactecommerce.com<br />We reply within 24h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="row my-4">
          <div className="col-md-8 col-lg-6 mx-auto">
            <div className="card shadow">
              <div className="card-header bg-dark text-white">
                <h4 className="mb-0 text-center">Send us a Message</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group my-3">
                        <label htmlFor="name">Full Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group my-3">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@example.com"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-group my-3">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      className="form-control"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="order">Order Issue</option>
                      <option value="return">Return/Refund</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                  
                  <div className="form-group my-3">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      rows={6}
                      className="form-control"
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Enter your message here... (minimum 10 characters)"
                      required
                    />
                    <small className="text-muted">
                      {formData.message.length}/500 characters
                    </small>
                  </div>
                  
                  <div className="text-center">
                    <button
                      className="btn btn-dark px-5"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="fa fa-paper-plane me-2"></i>
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="row mt-5">
          <div className="col-md-10 mx-auto">
            <h3 className="text-center mb-4">Frequently Asked Questions</h3>
            <div className="accordion" id="faqAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="faq1">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                    How long does shipping take?
                  </button>
                </h2>
                <div id="collapse1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.
                  </div>
                </div>
              </div>
              
              <div className="accordion-item">
                <h2 className="accordion-header" id="faq2">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                    What is your return policy?
                  </button>
                </h2>
                <div id="collapse2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    We offer a 30-day return policy for all items in original condition. Free returns on orders over $50.
                  </div>
                </div>
              </div>
              
              <div className="accordion-item">
                <h2 className="accordion-header" id="faq3">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                    Do you offer international shipping?
                  </button>
                </h2>
                <div id="collapse3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Yes, we ship worldwide! International shipping rates and delivery times vary by location.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
