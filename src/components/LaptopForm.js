import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import laptopService from '../services/laptopService';

const LaptopForm = () => {
  const [laptop, setLaptop] = useState({
    brand: '',
    model: '',
    price: '',
    processor: '',
    ram: '',
    storage: '',
    gpu: '',
    operatingSystem: '',
    screenSize: '',
    description: '',
    isAvailable: true,
    stockQuantity: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      fetchLaptopData();
    }
  }, [id, isEditing]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchLaptopData = async () => {
    try {
      setFetchingData(true);
      setError(null);
      const data = await laptopService.getLaptopById(id);
      setLaptop({
        brand: data.brand || '',
        model: data.model || '',
        price: data.price || '',
        processor: data.processor || '',
        ram: data.ram || '',
        storage: data.storage || '',
        gpu: data.gpu || '',
        operatingSystem: data.operatingSystem || '',
        screenSize: data.screenSize || '',
        description: data.description || '',
        isAvailable: data.isAvailable !== undefined ? data.isAvailable : true,
        stockQuantity: data.stockQuantity || ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setFetchingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaptop(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!laptop.brand || !laptop.model) {
        throw new Error('Brand and Model are required fields');
      }

      // Ensure all numeric fields are properly formatted
      const laptopData = {
        brand: laptop.brand.trim(),
        model: laptop.model.trim(),
        price: laptop.price ? parseFloat(laptop.price) : 0,
        processor: laptop.processor.trim(),
        ram: laptop.ram ? parseInt(laptop.ram) : 0,
        storage: laptop.storage ? parseInt(laptop.storage) : 0,
        gpu: laptop.gpu.trim(),
        operatingSystem: laptop.operatingSystem.trim(),
        screenSize: laptop.screenSize ? parseFloat(laptop.screenSize) : 0,
        description: laptop.description.trim(),
        isAvailable: Boolean(laptop.isAvailable),
        stockQuantity: laptop.stockQuantity ? parseInt(laptop.stockQuantity) : 0
      };

      console.log('Submitting laptop data:', laptopData);

      if (isEditing) {
        await laptopService.updateLaptop(id, laptopData);
      } else {
        await laptopService.createLaptop(laptopData);
      }

      navigate('/laptops');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/laptops');
  };

  if (fetchingData) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading laptop data...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card>
          <Card.Header>
            <h3 className="mb-0">
              {isEditing ? 'Edit Laptop' : 'Add New Laptop'}
            </h3>
          </Card.Header>
          <Card.Body>
            {error && (
              <Alert variant="danger" dismissible onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Brand *</Form.Label>
                    <Form.Control
                      type="text"
                      name="brand"
                      value={laptop.brand}
                      onChange={handleChange}
                      placeholder="e.g., Dell, HP, Lenovo"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Model *</Form.Label>
                    <Form.Control
                      type="text"
                      name="model"
                      value={laptop.model}
                      onChange={handleChange}
                      placeholder="e.g., XPS 13, ThinkPad X1"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="price"
                      value={laptop.price}
                      onChange={handleChange}
                      placeholder="0.00"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Stock Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      name="stockQuantity"
                      value={laptop.stockQuantity}
                      onChange={handleChange}
                      placeholder="0"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Processor</Form.Label>
                    <Form.Control
                      type="text"
                      name="processor"
                      value={laptop.processor}
                      onChange={handleChange}
                      placeholder="e.g., Intel i7-12700H"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>RAM (GB)</Form.Label>
                    <Form.Control
                      type="number"
                      name="ram"
                      value={laptop.ram}
                      onChange={handleChange}
                      placeholder="e.g., 16"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Storage (GB)</Form.Label>
                    <Form.Control
                      type="number"
                      name="storage"
                      value={laptop.storage}
                      onChange={handleChange}
                      placeholder="e.g., 512"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Screen Size (inches)</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.1"
                      name="screenSize"
                      value={laptop.screenSize}
                      onChange={handleChange}
                      placeholder="e.g., 13.3"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>GPU</Form.Label>
                    <Form.Control
                      type="text"
                      name="gpu"
                      value={laptop.gpu}
                      onChange={handleChange}
                      placeholder="e.g., NVIDIA RTX 3060"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Operating System</Form.Label>
                    <Form.Control
                      type="text"
                      name="operatingSystem"
                      value={laptop.operatingSystem}
                      onChange={handleChange}
                      placeholder="e.g., Windows 11"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Available</Form.Label>
                    <Form.Select
                      name="isAvailable"
                      value={laptop.isAvailable}
                      onChange={(e) => setLaptop(prev => ({...prev, isAvailable: e.target.value === 'true'}))}
                    >
                      <option value={true}>Available</option>
                      <option value={false}>Not Available</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={laptop.description}
                  onChange={handleChange}
                  placeholder="Additional details about the laptop..."
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <div>
                  {!isEditing && (
                    <Button 
                      variant="info" 
                      onClick={() => {
                        setLaptop({
                          brand: 'Test Brand',
                          model: 'Test Model',
                          price: '999.99',
                          processor: 'Test Processor',
                          ram: '8',
                          storage: '256',
                          gpu: 'Test GPU',
                          operatingSystem: 'Windows 11',
                          screenSize: '15.6',
                          description: 'Test description',
                          isAvailable: true,
                          stockQuantity: '10'
                        });
                      }}
                      className="me-2"
                    >
                      Fill Test Data
                    </Button>
                  )}
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={loading || !laptop.brand || !laptop.model}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          className="me-2"
                        />
                        {isEditing ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      isEditing ? 'Update Laptop' : 'Create Laptop'
                    )}
                  </Button>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LaptopForm;