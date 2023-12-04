// Navbar.js

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">Contact Scheduler </div>
          <div className="flex space-x-4">
            <Link to="/" className="text-white">
              Home
            </Link>
            <Link to="/Contact" className="text-white">
              AllContact
            </Link>
            <Link to="/appointment" className="text-white">
              Appointment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
