import React from 'react'
import CustomerNav from './customerNav'
import Footer from './Footer'
import { BiUser } from "react-icons/bi";
import { AiOutlineFunction, AiOutlineMail } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';




function ContactUs() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

    emailjs.sendForm('service_qmrosvz', 'template_kvste8l', form.current, {
        publicKey: '-cV39SrZxb9xctzI-',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
      e.target.reset();
  };


  return (
    <div>ContactUs
        <CustomerNav/>
        <section className="container">
        <div className="contactHeader">
        <div className="text"><p>Contact Us</p></div>
        <form className="inputs" ref={form} onSubmit={sendEmail}>
            <input className="input" type="text" name="name" placeholder=' Full Name' required />
            <input className="input" type="email" name="email" placeholder=' Email' required/>
            <textarea className="input" name="message" placeholder=' Enter Your Message...' required />
            <button className="send" type="submit" value="Send">Send Message</button>
       </form>
       </div>
       </section>
       <Footer/>
  </div>
);
};

export default ContactUs