import React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import logo from "../../assets/logo_ctos.png";

export default function SuppressionCompteEmailJSX({ userFirstname }) {
  return (
    <Html>
      <Head />
      <Preview>Confirmation de la suppression de votre compte CTOS</Preview>
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
            <Text style={title}>Bonjour {userFirstname},</Text>
            <Text style={text}>
              Nous vous confirmons que votre compte CTOS a été définitivement supprimé avec succès.
            </Text>
            <Text style={text}>
              Si vous pensez qu'il s'agit d'une erreur ou si vous souhaitez réactiver votre compte, veuillez contacter notre{" "}
              <Link style={anchor} href="https://ctos.com/support">
                Centre d'Aide
              </Link>
              .
            </Text>
            <Text style={text}>
              Merci d'avoir utilisé CTOS. Nous sommes désolés de vous voir partir et espérons vous revoir à l'avenir.
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

const button = {
  backgroundColor: "#007bff",
  borderRadius: "4px",
  color: "#ffffff",
  fontFamily: "'Open Sans', sans-serif",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "100%",
  maxWidth: "200px",
  padding: "12px",
  margin: "20px auto",
};

const anchor = {
  color: "#007bff",
  textDecoration: "underline",
};

const footer = {
  fontSize: "14px",
  fontFamily: "'Open Sans', sans-serif",
  color: "#999999",
};
