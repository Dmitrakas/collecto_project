import axios from 'axios';

export const createCollection = async (name, description, theme, image) => {
  try {
    const response = await axios.post('http://localhost:5000/api/collections/', {
      name,
      description,
      theme,
      image
    });
    alert(response.data.message);
  } catch (e) {
    alert(e.response.data.message);
  }
};
