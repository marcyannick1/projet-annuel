import React, { useState } from 'react';
import { Card, Col, Row, Button, Divider, Modal, Form, Input } from 'antd';
import { UserOutlined, MailOutlined, HomeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar } from 'antd';
import './ProfilJSX.css';

// Fonction pour générer les dates entre la date de création et aujourd'hui
const generateActivityData = (startDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  const endDate = new Date(); // Date actuelle

  while (currentDate <= endDate) {
    data.push({
      date: currentDate.toLocaleDateString(),
      activity: Math.floor(Math.random() * 10) + 1, // Activité aléatoire entre 1 et 10
    });
    currentDate.setDate(currentDate.getDate() + 1); // Incrémenter d'un jour
  }

  return data;
};

export default function ProfilJSX() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    birthDate: '01/01/1990',
    address: '123 Rue de Paris, 75001 Paris',
    accountCreationDate: '2024-08-29', // Date de création du compte (format ISO)
  };

  // Générer les données d'activité
  const activityData = generateActivityData(user.accountCreationDate);

  const showModal = () => {
    form.setFieldsValue(user); // Pré-remplir le formulaire avec les données utilisateur
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        console.log('Updated values:', values); // Ici, tu peux gérer la mise à jour des informations
        setIsModalVisible(false); // Fermer la modal après soumission
      })
      .catch((info) => {
        console.log('Validation Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Fermer la modal sans enregistrer
  };

  return (
    <div className='profile-page contain'>
      <h2 className='page-title'>Mon Profil</h2>

      <Row gutter={16}>
        {/* Carte des informations personnelles */}
        <Col span={12}>
          <Card className='ant-card' title="Informations Personnelles" style={{ backgroundColor: '#f0f9ff' }}>
            <p><UserOutlined style={{ color: '#1890ff' }} /> <strong>Nom :</strong> {user.lastName}</p>
            <p><UserOutlined style={{ color: '#1890ff' }} /> <strong>Prénom :</strong> {user.firstName}</p>
            <p><MailOutlined style={{ color: '#40a9ff' }} /> <strong>Email :</strong> {user.email}</p>
            <p><HomeOutlined style={{ color: '#13c2c2' }} /> <strong>Adresse :</strong> {user.address}</p>
            <p><UserOutlined style={{ color: '#faad14' }} /> <strong>Date de naissance :</strong> {user.birthDate}</p>
            <p><UserOutlined style={{ color: '#faad14' }} /> <strong>Date de création du compte :</strong> {new Date(user.accountCreationDate).toLocaleDateString()}</p>
            <Button type="primary" icon={<EditOutlined />} style={{ marginTop: '16px' }} onClick={showModal}>
              Modifier mes informations
            </Button>
          </Card>
          
          {/* Ajout du calendrier en dessous des informations personnelles */}
          <Card className='ant-card' title="Calendrier des Activités" style={{ backgroundColor: '#f0f9ff', marginTop: '24px' }}>
            <Calendar fullscreen={false} />
          </Card>
        </Col>

        {/* Carte des actions sur le compte */}
        <Col span={12}>
          <Card className='ant-card' title="Paramètres de Compte" style={{ backgroundColor: '#fffbe6' }}>
            <Button type="danger" icon={<DeleteOutlined />}>Supprimer mon compte</Button>
          </Card>

          {/* Diagramme de l'activité */}
          <Card className='ant-card' title="Activité du Compte" style={{ backgroundColor: '#fff', marginTop: '24px' }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="activity" stroke="#1890ff" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Carte des statistiques du compte */}
      <Row gutter={16}>
        <Col span={8}>
          <Card className='ant-card' style={{ backgroundColor: '#e6f7ff' }}>
            <p><strong>Nombre de connexions :</strong> 15</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card className='ant-card' style={{ backgroundColor: '#e6fffb' }}>
            <p><strong>Dernière connexion :</strong> 04/09/2024</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card className='ant-card' style={{ backgroundColor: '#f0f9ff' }}>
            <p><strong>Nombre de projets créés :</strong> 3</p>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Notifications */}
      <div className='notifications'>
        <h3>Notifications</h3>
        <p>Vous avez 3 nouvelles notifications.</p>
      </div>

      {/* Modal pour modifier les informations */}
      <Modal
        title="Modifier mes informations"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Enregistrer"
        cancelText="Annuler"
      >
        <Form form={form} layout="vertical" name="userForm">
          <Form.Item name="lastName" label="Nom" rules={[{ required: true, message: 'Veuillez entrer votre nom' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="firstName" label="Prénom" rules={[{ required: true, message: 'Veuillez entrer votre prénom' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Veuillez entrer votre email' }, { type: 'email', message: 'Veuillez entrer un email valide' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Adresse">
            <Input />
          </Form.Item>
          <Form.Item name="birthDate" label="Date de naissance">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
