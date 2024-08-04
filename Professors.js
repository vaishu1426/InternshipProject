import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Professors() {
  const [users1, setUsers1] = useState([]);
  const [form, setForm] = useState({ Name: '', Studies: '', Job: '', Age: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers1();
  }, []);

  const fetchUsers1 = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getUser1');
      setUsers1(response.data);
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
        await axios.put(`http://localhost:8000/editUser1/${editingId}`, form);
      } else {
        await axios.post('http://localhost:8000/addUser1', form);
      }
      setForm({ Name: '', Studies: '', Job: '', Age: '' });
      setEditingId(null);
      fetchUsers1();
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
      await axios.delete(`http://localhost:8000/deleteUser1/${id}`);
      fetchUsers1();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-500 vh-200 d-flex justify-content-center align-items-center'>
      <div className="w-50">
        <form onSubmit={handleSubmit}>
          <input type="text" name="Name" value={form.Name} onChange={handleInputChange} placeholder="Name" required />
          <input type="text" name="Studies" value={form.Studies} onChange={handleInputChange} placeholder="Studies" required />
          <input type="text" name="Job" value={form.Job} onChange={handleInputChange} placeholder="Job" required />
          <input type="text" name="Age" value={form.Age} onChange={handleInputChange} placeholder="Age" required />
          <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        </form>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Studies</th>
              <th>Job</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users1.map(user => (
              <tr key={user._id}>
                <td>{user.Name}</td>
                <td>{user.Studies}</td>
                <td>{user.Job}</td>
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

export default Professors;
