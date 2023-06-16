import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ItemForm = ({ collectionFields }) => {
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const [itemFields, setItemFields] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // createItem({ name, tags, itemFields });
    setName('');
    setTags('');
    setItemFields({});
  };

  const handleFieldChange = (field, value) => {
    setItemFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create Item</h2>
      <Form.Group controlId="name">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="tags">
        <Form.Label>Tags:</Form.Label>
        <Form.Control
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </Form.Group>
      {collectionFields.map((field) => (
        <Form.Group key={field}>
          <Form.Label>{field}:</Form.Label>
          <Form.Control
            type="text"
            value={itemFields[field] || ''}
            onChange={(e) => handleFieldChange(field, e.target.value)}
          />
        </Form.Group>
      ))}
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default ItemForm;
