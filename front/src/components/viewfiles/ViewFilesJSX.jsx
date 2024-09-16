import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Card, Row, Col, Statistic, Progress, Input } from 'antd';
import { DownloadOutlined, SearchOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import './ViewFilesJSX.css'; // Utilisez le style cohérent avec le reste
import moment from 'moment';

const ViewFilesJSX = () => {
  const { userId } = useParams(); 
  const [userFiles, setUserFiles] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [fileStats, setFileStats] = useState({
    totalFiles: 0,
    totalSize: 0, // En Ko
    lastUpload: null,
  });

  const [storageUsed, setStorageUsed] = useState(1.5); // en Go
  const totalStorageGB = 20; // Total de 20 Go

  // Mock des données des fichiers et des informations personnelles des utilisateurs
  const allUserFiles = {
    '1': [
      { key: '1', name: 'george-lucas-file1.pdf', size: 50000, date: '2024-01-10' }, // taille en Ko
      { key: '2', name: 'george-lucas-file2.pdf', size: 11102400, date: '2024-01-12' },
      { key: '3', name: 'george-lucas-file3.pdf', size: 7048000, date: '2024-01-15' },
      { key: '4', name: 'george-lucas-file4.pdf', size: 912000, date: '2024-09-12' },
      { key: '5', name: 'george-lucas-file5.pdf', size: 512000, date: '2024-09-12' },
      { key: '6', name: 'george-lucas-file6.pdf', size: 512000, date: '2024-09-12' },
    ],
    '2': [
      { key: '1', name: 'elon-musk-file1.pdf', size: 75000, date: '2024-01-15' },
      { key: '2', name: 'elon-musk-file2.pdf', size: 75000, date: '2024-01-15' },
      { key: '3', name: 'elon-musk-file3.pdf', size: 75000, date: '2024-01-15' },
      { key: '4', name: 'elon-musk-file4.pdf', size: 75000, date: '2024-01-15' },
      { key: '5', name: 'elon-musk-file5.pdf', size: 75000, date: '2024-01-15' },
      { key: '6', name: 'elon-musk-file6.pdf', size: 75000, date: '2024-01-15' },
    ],
  };

  const userDetails = {
    '1': { 
      name: 'George Lucas', 
      email: 'george.lucas@example.com', 
      phone: '+1 312 456 789', 
      status: 'Active',
      avatar: 'https://i.pinimg.com/564x/01/4e/f2/014ef2f860e8e56b27d4a3267e0a193a.jpg',
      storageUsed: 0, // Initialisé à zéro, sera mis à jour après calcul
      storageLimit: totalStorageGB, // 20 Go
    },
    '2': { 
      name: 'Elon Musk', 
      email: 'elon.musk@example.com', 
      phone: '+1 415 123 456', 
      status: 'Inactive',
      avatar: 'https://i.pinimg.com/564x/81/ac/9e/81ac9ef6456e8eccbf651fc368e83e4a.jpg',
      storageUsed: 0, // Initialisé à zéro, sera mis à jour après calcul
      storageLimit: totalStorageGB, // 20 Go
    },
  };

  useEffect(() => {
    const files = allUserFiles[userId] || [];
    setUserFiles(files);
    setUserInfo(userDetails[userId] || {});

    // Calculer les statistiques des fichiers
    const totalFiles = files.length;
    const totalSizeKB = files.reduce((acc, file) => acc + file.size, 0); // Taille totale en Ko
    const totalSizeGB = totalSizeKB / 1024 / 1024; // Convertir en Go
    const lastUpload = files.length > 0 ? Math.max(...files.map(file => new Date(file.date))) : null;

    setFileStats({ totalFiles, totalSize: totalSizeKB, lastUpload });

    // Mettre à jour les informations utilisateur avec la taille totale des fichiers en Go
    const updatedUserInfo = { ...userDetails[userId], storageUsed: totalSizeGB };
    setUserInfo(updatedUserInfo);
  }, [userId]);

  // Fonction pour convertir les tailles en Go
  const formatSize = (sizeInKB) => {
    const sizeInGB = sizeInKB / 1024 / 1024; // Convertir en Go
    return `${sizeInGB.toFixed(2)} GB`;
  };

  // Calcul du pourcentage d'utilisation du stockage
  const calculateUsagePercent = (storageUsed, storageLimit) => {
    return Math.min((storageUsed / storageLimit) * 100, 100);
  };

  // Déterminer la couleur de la barre de progression en fonction du pourcentage
  const determineProgressStatus = (percent) => {
    if (percent >= 100) {
      return 'exception';
    } else if (percent >= 50) {
      return 'active';
    } else {
      return 'normal';
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Recherche ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Chercher
        </Button>
        <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
          Réinitialiser
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });

  const columns = [
    {
      title: 'Nom du fichier',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Taille',
      dataIndex: 'size',
      key: 'size',
      render: (size) => formatSize(size),
      sorter: (a, b) => a.size - b.size,
    },
    {
      title: 'Date d\'upload',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('DD/MM/YYYY'),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button icon={<DownloadOutlined />} onClick={() => console.log('Téléchargement de', record.name)}>
          Télécharger
        </Button>
      ),
    },
  ];

  const storageUsagePercent = calculateUsagePercent(storageUsed, totalStorageGB);

  // Augmenter la mémoire utilisée
  const increaseStorageUsage = () => {
    setStorageUsed(prev => Math.min(prev + 0.1, totalStorageGB));
  };

  // Diminuer la mémoire utilisée
  const decreaseStorageUsage = () => {
    setStorageUsed(prev => Math.max(prev - 0.1, 0));
  };

  return (
    <div className="view-files-page contain">
      <h2 className="page-title">Espace de stockage de {userInfo.name}</h2>

      {/* Section des informations personnelles de l'utilisateur */}
      <Card className="user-info-card" style={{ marginBottom: '20px' }}>
        <Row gutter={16}>
          <Col span={4}>
            <img
              src={userInfo.avatar}
              alt={userInfo.name}
              style={{ width: '100%', borderRadius: '50%' }}
            />
          </Col>
          <Col span={20}>
            <h3>{userInfo.name}</h3>
            <p>Email : {userInfo.email}</p>
            <p>Téléphone : {userInfo.phone}</p>
            <p>Status : <strong style={{ color: userInfo.status === 'Active' ? 'green' : 'red' }}>{userInfo.status}</strong></p>
            <p>Espace utilisé : {userInfo.storageUsed.toFixed(2)} GB</p> {/* Affichage de l'espace utilisé */}
          </Col>
        </Row>
      </Card>

      {/* Section des statistiques */}
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title="Nombre total de fichiers" value={fileStats.totalFiles} />
        </Col>
        <Col span={8}>
          <Statistic 
            title="Taille totale des fichiers" 
            value={`${formatSize(fileStats.totalSize)} (${(fileStats.totalSize / 1024 / 1024).toFixed(2)} GB)`} 
          />
        </Col>
        <Col span={8}>
          <Statistic title="Dernier fichier uploadé" value={fileStats.lastUpload ? moment(fileStats.lastUpload).format('DD/MM/YYYY') : 'Aucun'} />
        </Col>
      </Row>

      {/* Section de l'espace de stockage */}
      <Card style={{ marginTop: '20px' }}>
        <h3>Utilisation de l'espace de stockage</h3>
        <Progress
          percent={storageUsagePercent}
          status={determineProgressStatus(storageUsagePercent)}
          format={() => `${formatSize(fileStats.totalSize)} GB / ${totalStorageGB.toFixed(2)} GB`}
          strokeColor={storageUsagePercent >= 100 ? '#ff4d4f' : (storageUsagePercent >= 50 ? '#fa8c16' : '#52c41a')}
        />
        <div style={{ marginTop: '10px' }}>
          <Button.Group>
            <Button onClick={decreaseStorageUsage} icon={<MinusOutlined />} />
            <Button onClick={increaseStorageUsage} icon={<PlusOutlined />} />
          </Button.Group>
        </div>
      </Card>

      {/* Section des fichiers */}
      <div className={`table-container ${userFiles.length >= 5 ? 'scrollable' : ''}`}>
        <Table columns={columns} dataSource={userFiles} pagination={false} style={{ marginTop: '20px' }} />
      </div>
    </div>
  );
};

export default ViewFilesJSX;
