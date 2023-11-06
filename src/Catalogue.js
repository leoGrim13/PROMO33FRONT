import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Catalogue() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get('/categorie');
        const toutesLesCategories = [
          { id: '', nom: 'Tous les produits' },
          ...categoriesResponse.data
        ];
        setCategories(toutesLesCategories);
        let productsResponse;
        if (selectedCategory === '') {
          productsResponse = await axios.get('/prod');
        } else {
          productsResponse = await axios.get(`/prod/tri?categorie=${selectedCategory}`);
        }

        setProducts(productsResponse.data);
        const getPriceWithPromotion = async (produit) => {
          const response = await axios.get(`/promotion/getPrice/${produit.id}`);
          return response.data;
        };
        
        const updatedProducts = await Promise.all(productsResponse.data.map(async (produit) => {
          const prixAvecPromotion = await getPriceWithPromotion(produit);
          return { ...produit, prixAvecPromotion };
        }));
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  return (
    
    
    
    <div>
      
      
      <select
        className='categoriebutton'
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
     
        {categories.map((categorie) => (
          <option key={categorie.id} value={categorie.id}>
            {categorie.nom}
          </option>
        ))}
      </select>

      <div className='catalogue'>
        {products.map((produit) => (
          <div className="product" key={produit.id}>
            <h3>{produit.nom}</h3>
            <p>Catégorie : {produit.categorie.nom}</p>
            <p>Description : {produit.description}</p>
            <p  className={produit.prixAvecPromotion !== produit.prix ? 'prix-modifie' : ''}>
              Prix : {produit.prixAvecPromotion ? produit.prixAvecPromotion.toFixed(2) : "N/A"} €</p>

            <img src={`/images/${produit.image}`} alt={produit.nom} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogue;
