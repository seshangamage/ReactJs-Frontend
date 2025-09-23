import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Spinner, Row, Col, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import laptopService from '../services/laptopService';

const LaptopDetails = () => {
  const [laptop, setLaptop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLaptopDetails();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchLaptopDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await laptopService.getLaptopById(id);
      setLaptop(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/laptops/edit/${id}`);
  };

  const handleDelete = async () => {
    const laptopName = laptop.model || 'this laptop';
    if (window.confirm(`Are you sure you want to delete "${laptopName}"?`)) {
      try {
        await laptopService.deleteLaptop(id);
        navigate('/laptops');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleBack = () => {
    navigate('/laptops');
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading laptop details...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error Loading Laptop Details</Alert.Heading>
        <p>{error}</p>
        <Button variant="outline-danger" onClick={handleBack}>
          Back to Laptop List
        </Button>
      </Alert>
    );
  }

  if (!laptop) {
    return (
      <Alert variant="warning">
        <Alert.Heading>Laptop Not Found</Alert.Heading>
        <p>The requested laptop could not be found.</p>
        <Button variant="outline-warning" onClick={handleBack}>
          Back to Laptop List
        </Button>
      </Alert>
    );
  }

  return (
    <Row className="justify-content-center">
      <Col md={10} lg={8}>
        <Card>
          <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Laptop Details</h3>
              <div>
                <Button variant="outline-secondary" onClick={handleBack} className="me-2">
                  ← Back to List
                </Button>
                <Button variant="warning" onClick={handleEdit} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <h4 className="mb-3">
                  {laptop.brand || 'Unknown Brand'} {' '}
                  {laptop.model || 'Unknown Model'}
                </h4>
                
                <div className="mb-3">
                  <strong>Status: </strong>
                  <Badge 
                    bg={laptop.isAvailable ? 'success' : 'danger'}
                    className="ms-2"
                  >
                    {laptop.isAvailable ? 'Available' : 'Not Available'}
                  </Badge>
                </div>

                {laptop.price && (
                  <div className="mb-3">
                    <strong>Price: </strong>
                    <span className="text-success h5">
                      ${parseFloat(laptop.price).toFixed(2)}
                    </span>
                  </div>
                )}

                {laptop.stockQuantity !== undefined && (
                  <div className="mb-3">
                    <strong>Stock Quantity: </strong>
                    <span className="badge bg-info">{laptop.stockQuantity}</span>
                  </div>
                )}

                <div className="mb-3">
                  <strong>ID: </strong>
                  <code>{laptop.id || laptop._id}</code>
                </div>
              </Col>
              <Col md={6}>
                <h5>Specifications</h5>
                <div className="specifications">
                  {laptop.processor && (
                    <div className="mb-2">
                      <strong>Processor: </strong>
                      {laptop.processor}
                    </div>
                  )}
                  
                  {laptop.ram && (
                    <div className="mb-2">
                      <strong>RAM: </strong>
                      {laptop.ram}GB
                    </div>
                  )}
                  
                  {laptop.storage && (
                    <div className="mb-2">
                      <strong>Storage: </strong>
                      {laptop.storage}GB
                    </div>
                  )}
                  
                  {laptop.gpu && (
                    <div className="mb-2">
                      <strong>GPU: </strong>
                      {laptop.gpu}
                    </div>
                  )}
                  
                  {laptop.operatingSystem && (
                    <div className="mb-2">
                      <strong>Operating System: </strong>
                      {laptop.operatingSystem}
                    </div>
                  )}
                  
                  {laptop.screenSize && (
                    <div className="mb-2">
                      <strong>Screen Size: </strong>
                      {laptop.screenSize} inches
                    </div>
                  )}
                </div>
              </Col>
            </Row>

            {(laptop.description) && (
              <Row className="mt-4">
                <Col>
                  <h5>Description</h5>
                  <p className="text-muted">
                    {laptop.description}
                  </p>
                </Col>
              </Row>
            )}

            {/* Display any additional fields that might be in the laptop object */}
            <Row className="mt-4">
              <Col>
                <h6>Additional Information</h6>
                <div className="small text-muted">
                  <Row>
                    {Object.entries(laptop).map(([key, value]) => {
                      // Skip fields we've already displayed
                      const displayedFields = [
                        'id', '_id', 'brand', 'model', 
                        'price', 'stockQuantity', 'processor', 'ram',
                        'storage', 'gpu', 'operatingSystem', 'screenSize', 
                        'description', 'isAvailable', 'createdAt', 'updatedAt'
                      ];
                      
                      if (displayedFields.includes(key) || !value) {
                        return null;
                      }

                      return (
                        <Col md={6} key={key} className="mb-1">
                          <strong>{key.charAt(0).toUpperCase() + key.slice(1)}: </strong>
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col>
                <div className="d-flex justify-content-end">
                  <Button variant="warning" onClick={handleEdit} className="me-2">
                    Edit This Laptop
                  </Button>
                  <Button variant="outline-secondary" onClick={handleBack}>
                    Back to List
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LaptopDetails;