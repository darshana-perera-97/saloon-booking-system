import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert, Button } from "react-bootstrap";

const ViewMerchants = () => {
  const [merchants, setMerchants] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch merchants data when the component mounts
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
      } finally {
        setLoading(false);
      }
    };

    fetchMerchants();
  }, []);

  // Handle availability toggle
  const handleAvailabilityToggle = async (merchantId, availability) => {
    try {
      const response = await fetch(
        `http://localhost:5009/admin/merchants/${merchantId}/availability`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ availability: !availability }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Update merchant availability in local state
        setMerchants((prevMerchants) =>
          prevMerchants.map((merchant) =>
            merchant.merchantId === merchantId
              ? { ...merchant, availability: !availability }
              : merchant
          )
        );
      } else {
        setError(data.error || "Failed to update availability");
      }
    } catch (err) {
      setError("Failed to connect to the server");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">All Merchants</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <Alert variant="info">Loading merchants...</Alert>
      ) : (
        <Row>
          {merchants.map((merchant) => (
            <Col
              key={merchant.merchantId}
              xs={12}
              sm={6}
              md={3}
              className="mb-4"
            >
              <Card>
                <Card.Body>
                  <Card.Title>{merchant.merchantName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {merchant.location}
                  </Card.Subtitle>
                  <Card.Text>{merchant.merchantDescription}</Card.Text>
                  <Card.Text>
                    <strong>Contact:</strong> {merchant.contactNumber}
                  </Card.Text>
                  <Card.Text>
                    <strong>Email:</strong> {merchant.email}
                  </Card.Text>
                  <Card.Text>
                    <strong>Availability: </strong>
                    {merchant.availability ? "Available" : "Unavailable"}
                  </Card.Text>
                  <Button
                    variant={merchant.availability ? "danger" : "success"}
                    onClick={() =>
                      handleAvailabilityToggle(
                        merchant.merchantId,
                        merchant.availability
                      )
                    }
                  >
                    {merchant.availability
                      ? "Mark as Unavailable"
                      : "Mark as Available"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ViewMerchants;
