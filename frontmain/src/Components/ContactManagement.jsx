import { useEffect, useState } from "react";
import axios from "axios";

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editedContact, setEditedContact] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    label: "",
  });

  useEffect(() => {
    // Fetch all contacts from the backend
    axios
      .get("http://localhost:8000/contacts")
      .then((response) => setContacts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleEdit = (id) => {
    const contactToEdit = contacts.find((contact) => contact._id === id);

    setEditedContact({
      id: contactToEdit._id,
      name: contactToEdit.name,
      email: contactToEdit.email,
      phone: contactToEdit.phone,
      label: contactToEdit.label,
    });
  };

  const handleUpdate = () => {
    // Update the contact on the backend
    axios
      .put(`http://localhost:5000/contacts/${editedContact.id}`, editedContact)
      .then((response) => {
        // Update the contacts state with the edited contact
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact._id === response.data._id ? response.data : contact
          )
        );
        // Clear the edited contact state
        setEditedContact({
          id: null,
          name: "",
          email: "",
          phone: "",
          label: "",
        });
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    // Delete the contact on the backend
    axios
      .delete(`http://localhost:5000/contacts/${id}`)
      .then(() => {
        // Remove the deleted contact from the contacts state
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== id)
        );
      })
      .catch((error) => console.error(error));
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      axios
        .get("http://localhost:5000/contacts")
        .then((response) => setContacts(response.data))
        .catch((error) => console.error(error));
    } else {
      // Search for contacts by name
      axios
        .get(`http://localhost:5000/contacts/search/${searchTerm}`)
        .then((response) => setContacts(response.data))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl mb-4 font-semibold">Contact Management</h1>
      <div className="mb-4 flex items-center">
        <label className="mr-4">
          Search by Name:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-2 py-1 ml-2"
          />
        </label>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Label</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td className="py-2 px-4 border-b">{contact.name}</td>
              <td className="py-2 px-4 border-b">{contact.email}</td>
              <td className="py-2 px-4 border-b">{contact.phone}</td>
              <td className="py-2 px-4 border-b">{contact.label}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(contact._id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editedContact.id && (
        <div className="mt-4">
          <h2 className="text-xl mb-2 font-semibold">Edit Contact</h2>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={editedContact.name}
              onChange={(e) =>
                setEditedContact({ ...editedContact, name: e.target.value })
              }
              className="border rounded px-2 py-1 ml-2"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="text"
              value={editedContact.email}
              onChange={(e) =>
                setEditedContact({ ...editedContact, email: e.target.value })
              }
              className="border rounded px-2 py-1 ml-2"
            />
          </label>
          <label className="block mb-2">
            Phone:
            <input
              type="text"
              value={editedContact.phone}
              onChange={(e) =>
                setEditedContact({ ...editedContact, phone: e.target.value })
              }
              className="border rounded px-2 py-1 ml-2"
            />
          </label>
          <label className="block mb-2">
            Label:
            <input
              type="text"
              value={editedContact.label}
              onChange={(e) =>
                setEditedContact({ ...editedContact, label: e.target.value })
              }
              className="border rounded px-2 py-1 ml-2"
            />
          </label>
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
