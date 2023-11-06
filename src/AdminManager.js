import React, { useState, useEffect } from 'react';
import CreateProduct from './CreateProduct'; 
import AddPromo from './addPromo';
import { useNavigate } from 'react-router-dom';


function AdminManager() {
  const navigate = useNavigate();
  const [isCreateProductFormVisible, setCreateProductFormVisible] = useState(false);
  const [isAddPromoFormVisible, setAddPromoFormVisible] = useState(false)

  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (isAuthenticated !== 'true') {
    alert('Connectez-vous avant !');
    navigate('/admin'); 
    return null;
  }

  const handleCreateProductClick = () => {
    setCreateProductFormVisible(true);
  };

  const handleAddPromoClick = () => {
    setAddPromoFormVisible(true);
  };

  return (
    <div>
      <button onClick={handleCreateProductClick}>Créer Produit</button>
      {isCreateProductFormVisible && <CreateProduct />}
      <button onClick={handleAddPromoClick}>Ajouter Promotion</button>
      {isAddPromoFormVisible && <AddPromo />}
    </div>
  );
}

export default AdminManager;
