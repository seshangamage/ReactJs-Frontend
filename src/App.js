import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import LaptopList from './components/LaptopList';
import LaptopForm from './components/LaptopForm';
import LaptopDetails from './components/LaptopDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<LaptopList />} />
            <Route path="/laptops" element={<LaptopList />} />
            <Route path="/laptops/new" element={<LaptopForm />} />
            <Route path="/laptops/edit/:id" element={<LaptopForm />} />
            <Route path="/laptops/:id" element={<LaptopDetails />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;