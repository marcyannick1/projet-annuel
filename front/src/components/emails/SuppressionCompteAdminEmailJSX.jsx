import React from 'react';
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import logo from "../../assets/logo_ctos.png";

export default function SuppressionCompteAdminEmailJSX({ adminName, clientName, filesDeleted }) {
  return (
    <Html>
      <Head />
      <Preview>Notification de suppression de compte CTOS</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <img
              src={logo}
              width="140"
              height="59"
              alt="CTOS"
              style={{ display: 'block', margin: '0 auto' }}
            />
          </Section>
          <Section style={contentSection}>
            <Text style={title}>Bonjour {adminName},</Text>
            <Text style={text}>
              Nous vous informons qu'un compte utilisateur a été supprimé.
            </Text>
            <Text style={text}>
              <strong>Nom du client :</strong> {clientName}
            </Text>
            <Text style={text}>
              <strong>Nombre de fichiers supprimés :</strong> {filesDeleted}
            </Text>
            <Text style={text}>
              Si vous avez besoin de plus d'informations ou de prendre des mesures supplémentaires, veuillez consulter les logs de suppression dans votre panneau d'administration.
            </Text>
            <Text style={text}>
              Merci de votre attention.
            </Text>
          </Section>
          <Section style={footerSection}>
            <Text style={footer}>
              CTOS Inc. | 123 Rue de l'Innovation | Paris, France
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f4f6f9",
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
  margin: "0 auto",
};

const headerSection = {
  textAlign: "center",
  padding: "20px",
};

const contentSection = {
  padding: "30px",
};

const footerSection = {
  backgroundColor: "#f4f6f9",
  padding: "20px",
  textAlign: "center",
};

const title = {
  fontSize: "24px",
  fontFamily: "'Open Sans', sans-serif",
  fontWeight: "600",
  color: "#333333",
  marginBottom: "20px",
};

const text = {
  fontSize: "16px",
  fontFamily: "'Open Sans', sans-serif",
  fontWeight: "400",
  color: "#555555",
  lineHeight: "24px",
  marginBottom: "20px",
};

const footer = {
  fontSize: "14px",
  fontFamily: "'Open Sans', sans-serif",
  color: "#999999",
};
