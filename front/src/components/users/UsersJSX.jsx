import React, {useEffect, useState} from 'react';
import { Space, Table, Tag, Button, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import './UsersJSX.css';

// Définition des colonnes du tableau
const columns = (navigate) => [
  {
    title: 'Nom complet',
    key: 'name',
    render: (user) => (
          <p>
            {user.firstName} {user.lastName}
          </p>
    )
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
          onClick={() => navigate(`/viewFilesJSX/${user.id}`)} // Redirection vers la page des fichiers de l'utilisateur
        >
          View Files
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
          Edit
        </Button>
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => console.log('Delete', record)}
        >
          <Button
            type="default"
            icon={<FontAwesomeIcon icon={faTrash} />}
          >
            Delete
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fecthUsers = async () => {
      const users = await fetch(`http://localhost:3000/user`)

      const data = await users.json();
      console.log(data)
      setUsers(data)
    }

    fecthUsers()
  }, [])

  return (
    <div className="users-page contain">
      <h2 className='page-title'>Utilisateurs</h2>
      <div className="actions">
        <Button type="primary" icon={<DownloadOutlined />}>
          Download
        </Button>
        <FloatButton icon={<FileTextOutlined />} description="" onClick={() => console.log('onClick')} />
        <Button type="primary">Add new</Button>
      </div>
      <Table columns={columns(navigate)} dataSource={users} pagination={false} />
    </div>
  );
};

export default Users;
