import React, { useEffect, useState, useContext } from 'react';
import { Space, Table, Tag, Button, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import AuthContext from "../../context/authContext.jsx";
import './UsersJSX.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);  // Importer le contexte pour gérer la déconnexion après suppression

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId));
        message.success("Utilisateur supprimé avec succès.");
      } else {
        message.error("Échec de la suppression de l'utilisateur.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      message.error("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  const columns = [
    {
      title: 'Nom complet',
      key: 'name',
      render: (user) => <p>{user.firstName} {user.lastName}</p>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Adresse',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Type de compte',
      key: 'accountType',
      render: (user) => (
        <Tag color={user.isSuperAdmin ? 'volcano' : 'green'}>
          {user.isSuperAdmin ? 'Admin' : 'Client'}
        </Tag>
      ),
    },
    {
      title: 'Operations',
      key: 'operations',
      render: (user) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            onClick={() => navigate(`/viewFilesJSX/${user.id}`)}
          >
            Voir Fichiers
          </Button>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="default"
            icon={<FontAwesomeIcon icon={faEdit} />}
            onClick={() => console.log('Edit', record)}
          >
            Modifier
          </Button>
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Oui"
            cancelText="Non"
          >
            <Button type="default" icon={<FontAwesomeIcon icon={faTrash} />}>
              Supprimer
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="users-page contain">
      <h2 className="page-title">Utilisateurs</h2>
      <div className="actions">
        <Button type="primary" icon={<DownloadOutlined />}>Télécharger</Button>
        <FloatButton icon={<FileTextOutlined />} onClick={() => console.log('onClick')} />
        <Button type="primary">Ajouter un nouvel utilisateur</Button>
      </div>
      <Table columns={columns} dataSource={users} pagination={false} />
    </div>
  );
};

export default Users;
