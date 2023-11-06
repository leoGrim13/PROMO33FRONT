import React, { useState, useEffect } from 'react';
import axios from 'axios';

async function fetchCategories() {
  try {
    const response = await axios.get('/categorie');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function CreateProduct() {
  const [product, setProduct] = useState({
    nom: '',
    prix: '',
    description: '',
    categorieId: 1,
    image1: null, 
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const file = type === 'file' ? files[0] : null;
    setProduct({
      ...product,
      [name]: file || value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nom', product.nom);
      formData.append('prix', parseFloat(product.prix).toFixed(2));
      formData.append('description', product.description);
      formData.append('categorie', product.categorie);
      formData.append('image1', product.image1);

      await axios.post('/prod/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Le produit a été ajouté.');

      setProduct({
        nom: '',
        prix: '',
        description: '',
        categorieId: 1,
        image1: null, 
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label htmlFor="nom">Nom :</label>
      <input
        type="text"
        id="nom"
        name="nom"
        value={product.nom}
        onChange={handleChange}
      />

      <label htmlFor="prix">Prix :</label>
      <input
        type="text"
        id="prix"
        name="prix"
        value={product.prix}
        onChange={handleChange}
      />

      <label htmlFor="description">Description :</label>
      <textarea
        id="description"
        name="description"
        value={product.description}
        onChange={handleChange}
      />

        <label htmlFor="categorie">Catégorie :</label>
        <select
          id="categorie"
          name="categorie"
          value={product.categorie || 11}
          onChange={handleChange}
        >
          {categories.map((categorie) => (
            <option key={categorie.id} value={categorie.id}>
              {categorie.nom}
            </option>
          ))}
        </select>



      <label htmlFor="image1">Image :</label>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        id="image1"
        name="image1"
        onChange={handleChange}
      />

      <button type="submit">Ajouter le produit</button>
    </form>
  );
}

export default CreateProduct;
