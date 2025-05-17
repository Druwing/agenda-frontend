import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';
import api from '../services/api';
import AgendaItem from '../components/AgendaItem';
import Loading from '../components/Loading';

function Dashboard() {
  const [agendaItems, setAgendaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgendaItems();
  }, []);

  const fetchAgendaItems = async () => {
    try {
      const response = await api.get('/api/agenda');
      setAgendaItems(response.data.data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/api/agenda/`+ currentItemId, formData);
      } else {
        await api.post('/api/agenda', formData);
      }
      fetchAgendaItems();
      resetForm();
    } catch (error) {
      console.error(error.response?.data?.message || error.message || 'Erro desconhecido');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      date: item.date.split('T')[0],
      location: item.location
    });
    setIsEditing(true);
    setCurrentItemId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/agenda/${id}`);
      fetchAgendaItems();
    } catch (error) {
      console.error(error.response?.data?.message || error.message || 'Erro desconhecido');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      location: ''
    });
    setIsEditing(false);
    setCurrentItemId(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <Loading />;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Agenda</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="agenda-form">
          <h2 className="form-label">{isEditing ? 'Edit Item' : 'Add New Item'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-input"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="date"
                className="form-input"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                className="form-input"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-button">
                {isEditing ? 'Update' : 'Save'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="cancel-button"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="agenda-list">
          <h2 className="form-label">Agenda Items</h2>
          {agendaItems.length === 0 ? (
            <p>No items in your agenda yet.</p>
          ) : (
            agendaItems.map(item => (
              <div key={item._id} className="agenda-item">
                <h3 className="agenda-item-title">{item.title}</h3>
                <p className="agenda-item-details">{item.description}</p>
                <p className="agenda-item-details">
                  {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString()}
                </p>
                {item.location && (
                  <p className="agenda-item-details">Location: {item.location}</p>
                )}
                <div className="agenda-item-actions">
                  <button
                    onClick={() => handleEdit(item)}
                    className="action-button edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="action-button delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


export default Dashboard;