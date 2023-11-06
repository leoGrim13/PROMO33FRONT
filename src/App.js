import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AdminForm from './AdminForm';
import Catalogue from './Catalogue';  
import AdminManager from './AdminManager';
import './App.css';




function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };




  useEffect(() => {
    axios.get('/categorie')
      .then((response) => {
        const toutesLesCategories = [
          { id: '', nom: 'Tous les produits' },  
          ...response.data
        ];
        setCategories(toutesLesCategories);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios.get('/categorie?categorieId=' + selectedCategory)

        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedCategory]);

    return (
      <Router>
       
          <div className='back'>
          <div className="navbar">
          <h1 className="title">Promo Mercadona</h1>
            <Link to="/catalogue" className="nav-linkCata">Catalogue</Link>
            <Link to="/admin" className="nav-linkAdmin">Admin</Link>
          </div>
        
       <Routes>
          <Route
            path="/catalogue"
            element={<Catalogue products={products} categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />}
          />
          <Route path="/admin" element={<AdminForm />} />
          <Route path="/admin-manager" element={<AdminManager />} />


      </Routes>
      </div>
    </Router>
  );
}

export default App;
