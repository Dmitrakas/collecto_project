import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CollectionForm = ({ themes, createCollection }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [theme, setTheme] = useState('');
  const [image, setImage] = useState(null);
  const [itemFields, setItemFields] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCollection({ name, description, theme, image, itemFields });
    setName('');
    setDescription('');
    setTheme('');
    setImage(null);
    setItemFields([]);
  };

  const handleFieldChange = (index, field, value) => {
    setItemFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index][field] = value;
      return updatedFields;
    });
  };

  const handleAddField = () => {
    setItemFields((prevFields) => [...prevFields, { name: '', type: '' }]);
  };

  const handleRemoveField = (index) => {
    setItemFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields.splice(index, 1);
      return updatedFields;
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create Collection</h2>
      <Form.Group controlId="name">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="theme">
        <Form.Label>Theme:</Form.Label>
        <Form.Control
          as="select"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="">Select a theme</option>
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="image">
        <Form.Label>Image:</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      <h3>Item Fields:</h3>
      {itemFields.map((field, index) => (
        <div key={index}>
          <Form.Group controlId={`fieldName${index}`}>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              value={field.name}
              onChange={(e) =>
                handleFieldChange(index, 'name', e.target.value)
              }
            />
          </Form.Group>
          <Form.Group controlId={`fieldType${index}`}>
            <Form.Label>Type:</Form.Label>
            <Form.Control
              type="text"
              value={field.type}
              onChange={(e) =>
                handleFieldChange(index, 'type', e.target.value)
              }
            />
          </Form.Group>
          <Button
            variant="danger"
            onClick={() => handleRemoveField(index)}
          >
            Remove Field
          </Button>
        </div>
      ))}
      <Button variant="primary" onClick={handleAddField}>
        Add Field
      </Button>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default CollectionForm;
