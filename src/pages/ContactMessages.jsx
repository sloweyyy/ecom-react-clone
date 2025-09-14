import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { seedContactMessages } from "../utils/seedData";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filter, setFilter] = useState("all");
  const auth = useSelector((state) => state.handleAuth);
  const navigate = useNavigate();

  useEffect(() => {
    // Simple admin check - in real app, you'd have proper admin roles
    if (!auth.isAuthenticated || auth.user?.email !== "demo@example.com") {
      toast.error("Access denied. Admin only.");
      navigate("/");
      return;
    }

    // Seed sample data if no messages exist
    const wasSeeded = seedContactMessages();
    if (wasSeeded) {
      toast.success("Sample contact messages loaded for demonstration");
    }

    // Load contact messages from localStorage
    const contactMessages = JSON.parse(localStorage.getItem("contactMessages") || "[]");
    setMessages(contactMessages.reverse()); // Show newest first
    setFilteredMessages(contactMessages.reverse());
  }, [auth, navigate]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredMessages(messages);
    } else {
      setFilteredMessages(messages.filter(msg => msg.subject === filter));
    }
  }, [filter, messages]);

  const deleteMessage = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      const updatedMessages = messages.filter(msg => msg.id !== id);
      setMessages(updatedMessages);
      localStorage.setItem("contactMessages", JSON.stringify(updatedMessages.reverse()));
      toast.success("Message deleted successfully");
    }
  };

  const clearAllMessages = () => {
    if (window.confirm("Are you sure you want to delete ALL messages? This cannot be undone.")) {
      setMessages([]);
      localStorage.removeItem("contactMessages");
      toast.success("All messages cleared");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (!auth.isAuthenticated || auth.user?.email !== "demo@example.com") {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Contact Messages Admin</h1>
          <div>
            <button 
              className="btn btn-danger me-2"
              onClick={clearAllMessages}
              disabled={messages.length === 0}
            >
              Clear All
            </button>
            <span className="badge bg-primary fs-6">{messages.length} Total Messages</span>
          </div>
        </div>
        <hr />

        {/* Filter Controls */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label htmlFor="filter" className="form-label">Filter by Subject:</label>
            <select 
              className="form-select" 
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Messages ({messages.length})</option>
              <option value="general">General Inquiry</option>
              <option value="support">Customer Support</option>
              <option value="order">Order Issue</option>
              <option value="return">Return/Refund</option>
              <option value="partnership">Partnership</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>
          <div className="col-md-6 d-flex align-items-end">
            <div className="text-muted">
              Showing {filteredMessages.length} of {messages.length} messages
            </div>
          </div>
        </div>

        {/* Messages List */}
        {filteredMessages.length === 0 ? (
          <div className="text-center py-5">
            <i className="fa fa-inbox fa-3x text-muted mb-3"></i>
            <h4 className="text-muted">No messages found</h4>
            <p className="text-muted">
              {messages.length === 0 
                ? "No contact messages have been submitted yet."
                : "No messages match the current filter."
              }
            </p>
          </div>
        ) : (
          <div className="row">
            {filteredMessages.map((message) => (
              <div key={message.id} className="col-12 mb-4">
                <div className="card shadow-sm">
                  <div className="card-header d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="mb-1">
                        <i className="fa fa-envelope me-2"></i>
                        {message.subject.charAt(0).toUpperCase() + message.subject.slice(1)}
                      </h5>
                      <small className="text-muted">
                        From: {message.name} ({message.email})
                      </small>
                    </div>
                    <div className="text-end">
                      <small className="text-muted d-block">{formatDate(message.timestamp)}</small>
                      <button 
                        className="btn btn-sm btn-outline-danger mt-1"
                        onClick={() => deleteMessage(message.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>
                      {message.message}
                    </p>
                    
                    {/* Quick Actions */}
                    <div className="border-top pt-3 mt-3">
                      <small className="text-muted">Quick Actions:</small>
                      <div className="mt-2">
                        <a 
                          href={`mailto:${message.email}?subject=Re: ${message.subject}&body=Hi ${message.name},%0D%0A%0D%0AThank you for contacting us regarding "${message.subject}".%0D%0A%0D%0A`}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          <i className="fa fa-reply me-1"></i>Reply
                        </a>
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => {
                            navigator.clipboard.writeText(message.email);
                            toast.success("Email copied to clipboard!");
                          }}
                        >
                          <i className="fa fa-copy me-1"></i>Copy Email
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ContactMessages;
