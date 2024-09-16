import React from 'react';
import { Space, Table, Tag, Button, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import './UsersJSX.css'; // Pour gérer le style cohérent

// Définition des colonnes du tableau
const columns = (navigate) => [
  {
    title: 'Photo',
    dataIndex: 'photo',
    key: 'photo',
    render: (text) => <img className='user-pic' src={text} alt="User" style={{ width: 50, height: 50, borderRadius: '50%' }} />,
  },
  {
    title: 'Member Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'Active' ? 'green' : 'volcano'}>
        {status}
      </Tag>
    ),
  },
  {
    title: 'Operations',
    key: 'operations',
    render: (_, record) => (
      <Space size="middle">
        <Button 
          type="primary" 
          icon={<FileTextOutlined />}
          onClick={() => navigate(`/viewFilesJSX/${record.key}`)} // Redirection vers la page des fichiers de l'utilisateur
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

// Données pour le tableau
const data = [
  {
    key: '1',
    photo: "https://i.pinimg.com/564x/01/4e/f2/014ef2f860e8e56b27d4a3267e0a193a.jpg",
    name: 'George Lucas',
    mobile: '+1 312 456 789',
    email: 'george.lucas@example.com',
    status: 'Active',
  },
  {
    key: '2',
    photo: "https://i.pinimg.com/564x/81/ac/9e/81ac9ef6456e8eccbf651fc368e83e4a.jpg",
    name: 'Elon Musk',
    mobile: '+1 415 123 456',
    email: 'elon.musk@example.com',
    status: 'Inactive',
  },
  {
    key: '3',
    photo: "https://i.pinimg.com/564x/53/1e/ba/531eba387dfe757d865b8c0cebd30a2d.jpg",
    name: 'Jane Doe',
    mobile: '+1 202 555 0199',
    email: 'jane.doe@example.com',
    status: 'Active',
  },
  {
    key: '4',
    photo: "https://i.pinimg.com/474x/d2/3a/f2/d23af27fab96e85af6db322719b371af.jpg",
    name: 'Michael Jordan',
    mobile: '+1 312 456 000',
    email: 'michael.jordan@example.com',
    status: 'Active',
  },
  {
    key: '5',
    photo: "https://i.pinimg.com/564x/cd/f7/43/cdf7439fdd0415945f7de1f1c1dce0d4.jpg",
    name: 'Alice Smith',
    mobile: '+1 800 555 0000',
    email: 'alice.smith@example.com',
    status: 'Inactive',
  },
];

const Users = () => {
  const navigate = useNavigate();

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
      <Table columns={columns(navigate)} dataSource={data} pagination={false} />
    </div>
  );
};

export default Users;
