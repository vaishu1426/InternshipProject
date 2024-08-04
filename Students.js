import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ Name: '', Subject: '', Branch: '', Age: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getUsers');
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/editUser/${editingId}`, form);
      } else {
        await axios.post('http://localhost:8000/addUser', form);
      }
      setForm({ Name: '', Subject: '', Branch: '', Age: '' });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditingId(user._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/deleteUser/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-500 vh-200 d-flex justify-content-center align-items-center'>
      <div className="w-50">
        <form onSubmit={handleSubmit}>
          <input type="text" name="Name" value={form.Name} onChange={handleInputChange} placeholder="Name" required />
          <input type="text" name="Subject" value={form.Subject} onChange={handleInputChange} placeholder="Subject" required />
          <input type="text" name="Branch" value={form.Branch} onChange={handleInputChange} placeholder="Branch" required />
          <input type="text" name="Age" value={form.Age} onChange={handleInputChange} placeholder="Age" required />
          <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        </form>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Branch</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.Name}</td>
                <td>{user.Subject}</td>
                <td>{user.Branch}</td>
                <td>{user.Age}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
