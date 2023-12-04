import { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    label: "work",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://wild-cyan-duckling-tie.cyclic.app/contacts",
        formData
      );
      console.log("Data posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Full Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Phone Number:
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="label"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Label:
        </label>
        <select
          id="label"
          name="label"
          value={formData.label}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="work">Work</option>
          <option value="school">School</option>
          <option value="friends">Friends</option>
          <option value="family">Family</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
