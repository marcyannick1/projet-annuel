import React from "react";
import logo from '../../assets/logo_ctos.png'
// Styles centralisés pour éviter la répétition
const styles = {
  container: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    backgroundColor: "#ffffff",
    padding: "20px",
    maxWidth: "660px",
    margin: "0 auto",
  },
  tableRow: {
    padding: "20px",
    border: "1px solid white",
  },
  label: {
    fontSize: "10px",
    color: "#666666",
    marginBottom: "5px",
  },
  value: {
    fontSize: "12px",
    margin: 0,
  },
};

// Composant pour les informations de facturation
const BillingInfo = () => (
  <div style={{ backgroundColor: "#fafafa", padding: "20px", borderRadius: "3px", marginBottom: "30px" }}>
    <p style={{ fontSize: "14px", fontWeight: "500", margin: "0 0 10px 0" }}>BILLED TO</p>
    <p style={styles.value}>Jean David Moulin</p>
    <p style={styles.value}>2 rue des maçons</p>
    <p style={styles.value}>97000 Berlin</p>
    <p style={styles.value}>jeanmoulin@gmail.com</p>
  </div>
);

// Composant pour les informations de la société
const CompanyInfo = () => (
  <div style={{ backgroundColor: "#fafafa", padding: "20px", borderRadius: "3px", marginBottom: "30px" }}>
    <p style={{ fontSize: "14px", fontWeight: "500", margin: "0 0 10px 0" }}>Société CTOS</p>
    <p style={styles.value}>4 Rue Nelson Mandela</p>
    <p style={styles.value}>78310 Maurepas</p>
    <p style={styles.value}>N° Siret: 362 521 879 00034</p>
  </div>
);

// Composant pour chaque ligne d'article
const ItemRow = ({ item }) => (
  <tr>
    <td style={{ padding: "20px" }}>
      <p style={{ fontSize: "12px", fontWeight: "600", margin: "0" }}>{item.designation}</p>
    </td>
    <td style={{ paddingLeft: "20px", textAlign: "center" }}>
      <p style={{ fontSize: "12px", margin: "0" }}>{item.qte}</p>
    </td>
    <td style={{ paddingLeft: "20px", textAlign: "center" }}>
      <p style={{ fontSize: "12px", margin: "0" }}>{item.prixHT}€</p>
    </td>
    <td style={{ paddingLeft: "20px", textAlign: "center" }}>
      <p style={{ fontSize: "12px", margin: "0" }}>{item.tva}€</p>
    </td>
    <td style={{ paddingRight: "20px", textAlign: "right" }}>
      <p style={{ fontSize: "12px", fontWeight: "600" }}>{item.totalTTC}€</p>
    </td>
  </tr>
);

// Composant principal Receipt
const Receipt = () => {
  // Liste des articles (vous pouvez facilement ajouter d'autres articles ici)
  const items = [
    {
      designation: "Achat stockage 20Go",
      qte: 1,
      prixHT: "16,67",
      tva: "3,33",
      totalTTC: "20,00",
    },
  ];

  return (
    <div style={styles.container}>
      {/* Logo et Titre */}
       {/* Logo et Titre */}
       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "36px" }}>
        <img
          src={logo}
          alt="Apple Logo"
          style={{ width: "142px", height: "49px" }}
        />
        <h1 style={{ fontSize: "32px", fontWeight: "300", color: "#888888" }}>Receipt</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "36px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "300", color: "#888888" }}>Facture N°19</h1>
        <p style={{ fontSize: "14px", color: "#888888" }}>Date: 17/09/2024</p>
      </div>

      {/* Informations Client */}
      <BillingInfo />

      {/* Informations Société */}
      <CompanyInfo />

      {/* Liste des articles */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "10px" }}>Désignation</th>
            <th style={{ textAlign: "center", padding: "10px" }}>Qté</th>
            <th style={{ textAlign: "center", padding: "10px" }}>Prix HT</th>
            <th style={{ textAlign: "center", padding: "10px" }}>TVA</th>
            <th style={{ textAlign: "right", padding: "10px" }}>Total TTC</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <ItemRow key={index} item={item} />
          ))}
        </tbody>
      </table>

      {/* Total */}
      <hr style={{ border: "none", borderTop: "1px solid #eaeaea", margin: "30px 0" }} />
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "30px" }}>
        <p style={{ fontSize: "10px", color: "#666666", fontWeight: "600" }}>TOTAL TTC</p>
        <p style={{ fontSize: "16px", fontWeight: "600", marginLeft: "20px" }}>20,00€</p>
      </div>
      <hr style={{ border: "none", borderTop: "1px solid #eaeaea", marginBottom: "75px" }} />
    </div>
  );
};

export default Receipt;
