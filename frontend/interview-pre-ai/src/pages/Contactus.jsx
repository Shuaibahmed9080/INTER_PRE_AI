
import React from "react";
import Navbar from "../components/layouts/Navbar";

const Contactus = () => {
const [result, setResult] = React.useState("")

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "70f05f66-b2f6-4758-8e5f-cc78cd273a8d");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <>
    <Navbar/>
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-8">
      <h2 className="text-2xl font-bold text-[#FF9324] mb-4">Contact Us</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9324]"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9324]"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9324]"
        ></textarea>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-white font-semibold rounded-lg shadow-md hover:from-black hover:to-black transition-all duration-300"
        >
          Send Message
        </button>
      </form>
      <p>{result}</p>
    </div>
    </>
  );
};

export default Contactus;
