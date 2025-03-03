import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";

const ViewMerchants = () => {
  const [merchants, setMerchants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await fetch("http://localhost:5009/admin/merchants");
        const data = await response.json();

        if (response.ok) {
          setMerchants(data);
        } else {
          setError(data.error || "Failed to fetch merchants");
        }
      } catch (err) {
        setError("Failed to connect to the server");
      }
    };

    fetchMerchants();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center">All Merchants</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {merchants.map((merchant) => (
          <Col key={merchant.merchantId} xs={12} sm={6} md={3} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{merchant.merchantName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{merchant.location}</Card.Subtitle>
                <Card.Text>{merchant.merchantDescription}</Card.Text>
                <Card.Text><strong>Contact:</strong> {merchant.contactNumber}</Card.Text>
                <Card.Text><strong>Email:</strong> {merchant.email}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ViewMerchants;
