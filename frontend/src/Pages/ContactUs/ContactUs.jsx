/* eslint-disable react/jsx-pascal-case */
import React, { useRef, useState } from 'react';
import "./ContactUs.css"
import SideBar from '../../Components/SideBar/SideBar';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import emailjs from '@emailjs/browser';
import Pop_up from "../../Components/Pop_up/Pop_up";

function ContactUs() {
  const [profession] = useState(localStorage.getItem('profession'));
  const popUpRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      await emailjs
        .sendForm("deptwise_gmail", "contact_us_deptwise", e.target, {
          publicKey: "UJ9LFwc1LWo6bfrpw",
        })
        .then(
          () => {
            popUpRef.current.showToast("Emailsent");
          },
          (error) => {
            popUpRef.current.showToast("GoingWrong");
          },
        );
    } catch (error) {
      popUpRef.current.showToast("EmailFailed");
    } finally {
      setSubmitting(false);
    }
  };

  return (

    <div className="page-container">
      <SideBar userType={profession?.replace(/\s+/g, '')} />
      <><Header />
        <div className="contact-container">
          <div style={{ height: '70px' }} />
          <div className="content-wrapper">

            <div className="main-content">
              <h1>Contact Us</h1>
              <div style={{ height: '50px' }} />
              <div className="small-para-on-top">Whether you have a question, feedback, or a collaboration idea, we’re here to listen. Your voice drives us forward, and we’re committed to providing prompt, personalized responses. Reach out via the form below, email, or phone—we’ll ensure your message lands in the right hands. Let’s connect and create something great together! </div>
              <div style={{ height: '50px' }} />
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">

                  <label className='contactUsLabel'>Name:</label>
                  <input
                    type="text"
                    name="name"
                    className='contact-us-input'
                    value={formData.name}
                    onChange={handleChange}
                    required />

                  <label className='contactUsLabel'>Email:</label>
                  <input
                    type="text"
                    name="email"
                    className='contact-us-input'
                    value={formData.email}
                    onChange={handleChange}
                    required />

                  <label className='contactUsLabel'>Subject:</label>
                  <input
                    type="text"
                    name="subject"
                    className='contact-us-input'
                    value={formData.subject}
                    onChange={handleChange}
                    required />

                  <label className='contactUsLabel'>Message:</label>
                  <textarea
                    name="message"
                    class='contact-us-input-textarea'
                    value={formData.message}
                    onChange={handleChange}
                    required />
                </div>

                <button class='contact-us-submit-button' type="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>

                {status && <div className="status-message">{status}</div>}
              </form>
            </div>

          </div>
        </div>
      </>
      <div className='contact-us-contact-lables'>
        <div className='cont-us-label'>
          <div class='cont-us-label-icon'><i class='bx bx-location-plus'  ></i></div>
          <div class='cont-us-label-text'>
            <div class='cont-us-label-heading'><p1><b>Address</b></p1></div>
            <div class='cont-us-label-content'><p1>Ariviyal Nagar , Kilinochchi , SriLanka</p1></div>
          </div>
        </div>

        <div className='cont-us-label'>
          <div class='cont-us-label-icon'><i class='bx bx-envelope'></i></div>
          <div className='cont-us-label-text'>
            <div class='cont-us-label-heading'><p1><b>Email</b></p1></div>
            <div class='cont-us-label-content'><p1>deptwise.uoje@gmail.com</p1></div>
          </div>
        </div>
        <div className='cont-us-label'>
          <div class='cont-us-label-icon'><i class='bx bx-phone'></i></div>
          <div className='cont-us-label-text'>
            <div class='cont-us-label-heading'><p1><b>Contact Number</b></p1></div>
            <div class='cont-us-label-content'><p1>+94 076-8758499</p1></div>

          </div>
        </div>
      </div>

      <div style={{ height: '60px' }} />
      <Footer />

      {/* Conditionally render PopUp */}
      <Pop_up ref={popUpRef} />
    </div>
  );
}

export default ContactUs
