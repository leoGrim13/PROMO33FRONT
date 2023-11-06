import React, { useState, useEffect } from 'react';

function AddPromo() {
  const [produitId, setProduitId] = useState('');
  const [produits, setProduits] = useState([]); 
  const [pourcentage, setPourcentage] = useState(0); 
  const [debutPromo, setDebutPromo] = useState(''); 
  const [finPromo, setFinPromo] = useState(''); 

  useEffect(() => {
    fetch('/prod')
      .then((response) => response.json())
      .then((data) => {
        setProduits(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des produits : ' + error.message);
      });
  }, []);

  const handleSubmit = () => {
    if (!produitId) {
      alert('Veuillez sélectionner un produit.');
      return;
    }

    if (pourcentage < 0 || pourcentage > 100) {
      alert('Le pourcentage de réduction doit être compris entre 0 et 100.');
      return;
    }

    const dateDebutObj = new Date(debutPromo);
    const dateFinObj = new Date(finPromo);

    if (dateDebutObj >= dateFinObj) {
      alert('La date de début doit être antérieure à la date de fin de la promotion.');
      return;
    }

    const Id = produitId; 
    const pourcentageReduction = pourcentage;
    const dateDebut = debutPromo;
    const dateFin = finPromo;

    fetch('/promotion/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        produitId :Id,
        debutPromo: dateDebut,
        finPromo: dateFin,
        pourcentage: pourcentageReduction,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Promotion créée avec succès');
        setProduitId(''); 
        setPourcentage(0);
        setDebutPromo('');
        setFinPromo('');
      })
      .catch((error) => {
        alert('Erreur lors de la création de la promotion : ' + error.message);
      });
  };

  return (
    <div>
      <h2>Créer une promotion</h2>
      <label>Sélectionnez un produit :</label>
      <select value={produitId} onChange={(e) => setProduitId(e.target.value)}>
        <option value="">Sélectionnez un produit</option>
        {produits.map((produit) => (
          <option key={produit.id} value={produit.id}>
            {produit.nom}
          </option>
        ))}
      </select>
      <br />
      <label>Pourcentage de réduction :</label>
      <input type="number" value={pourcentage} onChange={(e) => setPourcentage(e.target.value)} />
      <br />
      <label>Date de début de promotion :</label>
      <input type="date" value={debutPromo} onChange={(e) => setDebutPromo(e.target.value)} />
      <br />
      <label>Date de fin de promotion :</label>
      <input type="date" value={finPromo} onChange={(e) => setFinPromo(e.target.value)} />
      <br />
      <button onClick={handleSubmit}>Créer la promotion</button>
    </div>
  );
}

export default AddPromo;
