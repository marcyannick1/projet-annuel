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
    Img
} from "@react-email/components";
import logo from "../../assets/logo_ctos.png";

export default function InscriptionEmailJSX({ userFirstname }) {
  return (
    <Html>
      <Head />
      <Preview>Votre compte CTOS a été créé avec succès !</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Img
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
              Nous avons le plaisir de vous informer que votre compte CTOS a été créé avec succès !
            </Text>
            <Text style={text}>
              Vous pouvez maintenant vous connecter à votre compte en utilisant le bouton ci-dessous :
            </Text>
            <Button style={button} href="http://localhost:5173/LoginJSX">
              Se connecter
            </Button>
            <Text style={text}>
              Pour toute question, consultez notre{" "}
              <Link style={anchor} href="https://ctosnoumea.com/contact/">
                Centre d'Aide
              </Link>
              .
            </Text>
            <Text style={text}>
              Merci de faire confiance à CTOS. Nous sommes impatients de vous aider à réussir !
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
  backgroundColor: "#f0f2f5",
  padding: "30px 0",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
};

const headerSection = {
  textAlign: "center",
  padding: "20px 0",
};

const contentSection = {
  padding: "20px",
};

const footerSection = {
  backgroundColor: "#f0f2f5",
  padding: "15px 20px",
  textAlign: "center",
};

const title = {
  fontSize: "22px",
  fontFamily: "'Arial', sans-serif",
  fontWeight: "600",
  color: "#333333",
  marginBottom: "15px",
};

const text = {
  fontSize: "16px",
  fontFamily: "'Arial', sans-serif",
  fontWeight: "400",
  color: "#666666",
  lineHeight: "24px",
  marginBottom: "15px",
};

const button = {
  backgroundColor: "#1890ff",
  borderRadius: "4px",
  color: "#ffffff",
  fontFamily: "'Arial', sans-serif",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "100%",
  maxWidth: "220px",
  padding: "12px",
  margin: "20px auto",
};

const anchor = {
  color: "#1890ff",
  textDecoration: "underline",
};

const footer = {
  fontSize: "13px",
  fontFamily: "'Arial', sans-serif",
  color: "#888888",
};
