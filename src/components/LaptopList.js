import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner, Card, Row, Col, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import laptopService from '../services/laptopService';

const LaptopList = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLaptops();
  }, []);

  const fetchLaptops = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await laptopService.getAllLaptops();
      setLaptops(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setLaptops([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, laptopName) => {
    if (window.confirm(`Are you sure you want to delete "${laptopName}"?`)) {
      try {
        await laptopService.deleteLaptop(id);
        setSuccess('Laptop deleted successfully!');
        setTimeout(() => setSuccess(null), 3000);
        await fetchLaptops(); // Refresh the list
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleView = (id) => {
    navigate(`/laptops/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/laptops/edit/${id}`);
  };

  const handleAddNew = () => {
    navigate('/laptops/new');
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Laptop Management</h3>
                <Button variant="primary" onClick={handleAddNew}>
                  + Add New Laptop
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {error && (
                <Alert variant="danger" dismissible onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}
              
              {success && (
                <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
                  {success}
                </Alert>
              )}

              {laptops.length === 0 ? (
                <div className="text-center py-4">
                  <h5>No laptops found</h5>
                  <p className="text-muted">Start by adding your first laptop!</p>
                  <Button variant="primary" onClick={handleAddNew}>
                    Add First Laptop
                  </Button>
                </div>
              ) : (
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Brand</th>
                      <th>Model</th>
                      <th>Price</th>
                      <th>RAM</th>
                      <th>Storage</th>
                      <th>Available</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {laptops.map((laptop) => (
                      <tr key={laptop.id || laptop._id}>
                        <td>{laptop.id || laptop._id}</td>
                        <td>
                          <strong>{laptop.brand || 'N/A'}</strong>
                        </td>
                        <td>{laptop.model || 'N/A'}</td>
                        <td>
                          {laptop.price ? `$${parseFloat(laptop.price).toFixed(2)}` : 'N/A'}
                        </td>
                        <td>{laptop.ram ? `${laptop.ram}GB` : 'N/A'}</td>
                        <td>{laptop.storage ? `${laptop.storage}GB` : 'N/A'}</td>
                        <td>
                          <Badge 
                            bg={laptop.isAvailable ? 'success' : 'danger'}
                          >
                            {laptop.isAvailable ? 'Available' : 'Not Available'}
                          </Badge>
                        </td>
                        <td>{laptop.stockQuantity || 0}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => handleView(laptop.id || laptop._id)}
                              className="me-1"
                            >
                              View
                            </Button>
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => handleEdit(laptop.id || laptop._id)}
                              className="me-1"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(
                                laptop.id || laptop._id, 
                                laptop.model || 'this laptop'
                              )}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LaptopList;