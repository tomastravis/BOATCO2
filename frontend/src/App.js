import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  // Add more options as needed
];

function App() {
  return (
    <Container fluid>
      <Row>
        <Col md={3} className="bg-light sidebar">
          <h2>Sidebar Title</h2>
          <Select options={options} />
          <Button variant="primary" className="mt-3">Button 1</Button>
          <Button variant="secondary" className="mt-3">Button 2</Button>
        </Col>
        <Col md={9}>
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
