import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

const CreateMerchant = () => {
  const [formData, setFormData] = useState({
    merchantName: "",
    merchantDescription: "",
    location: "",
    contactNumber: "",
    email: "",
    password: "",
    availability: false, // Add availability field with a default value of false
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox specifically
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5009/admin/create-merchant",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setFormData({
          merchantName: "",
          merchantDescription: "",
          location: "",
          contactNumber: "",
          email: "",
          password: "",
          availability: false, // Reset availability to false after successful form submission
        });
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to connect to the server");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Create Merchant</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Merchant Name</Form.Label>
          <Form.Control
            type="text"
            name="merchantName"
            value={formData.merchantName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="merchantDescription"
            value={formData.merchantDescription}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Availability Checkbox */}
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            name="availability"
            label="Available"
            checked={formData.availability}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Merchant
        </Button>
      </Form>
    </Container>
  );
};

export default CreateMerchant;
