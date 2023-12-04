import { Route, Routes } from "react-router-dom";
import ContactManagement from "./ContactManagement";
import Appointment from "./Appointment";
import ContactForm from "./ContactForm";

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/Contact" element={<ContactManagement />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
