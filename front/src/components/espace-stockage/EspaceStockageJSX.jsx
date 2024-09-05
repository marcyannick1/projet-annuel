import React, { useState, useEffect } from 'react';
import { Table, Button, Upload, message, Popconfirm, Empty, Input, Select, Typography, Space } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import './EspaceStockageJSX.css';

const { Option } = Select;
const { Title } = Typography;

export default function EspaceStockageJSX() {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState(null);

  const fetchFiles = () => {
    const mockFiles = [
      { key: '1', name: 'Document1.pdf', size: '50KB', format: 'pdf', date: new Date('2024-01-10') },
      { key: '2', name: 'Image1.jpg', size: '200KB', format: 'jpg', date: new Date('2024-01-15') },
      { key: '3', name: 'Presentation.ppt', size: '120KB', format: 'ppt', date: new Date('2024-01-20') },
    ];
    setFiles(mockFiles);
  };

  const handleUpload = (file) => {
    const newFile = {
      key: `${files.length + 1}`,
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)}KB`,
      format: file.name.split('.').pop(),
      date: new Date(),
    };
    setFiles([...files, newFile]);
    message.success(`${file.name} a été téléchargé avec succès.`);
  };

  const handleDelete = (key) => {
    const updatedFiles = files.filter((file) => file.key !== key);
    setFiles(updatedFiles);
    message.success('Fichier supprimé avec succès.');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormatChange = (value) => {
    setSelectedFormat(value);
  };

  const processFiles = () => {
    let processedFiles = [...files];
    if (selectedFormat) {
      processedFiles = processedFiles.filter(file => file.format === selectedFormat);
    }
    if (searchTerm) {
      processedFiles = processedFiles.filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return processedFiles;
  };

  const columns = [
    {
      title: 'Nom du fichier',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Taille',
      dataIndex: 'size',
      key: 'size',
      sorter: (a, b) => parseFloat(a.size) - parseFloat(b.size),
    },
    {
      title: 'Date d\'upload',
      dataIndex: 'date',
      key: 'date',
      render: (date) => date.toLocaleDateString(),
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Êtes-vous sûr de vouloir supprimer ce fichier?"
          onConfirm={() => handleDelete(record.key)}
          okText="Oui"
          cancelText="Non"
        >
          <Button type="primary" danger icon={<DeleteOutlined />}>
            Supprimer
          </Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className='espace-stockage-container contain'>
      <Title level={2} className="title">Espace de Stockage</Title>
      <div className="filters">
        <Input
          placeholder="Rechercher par nom de fichier"
          onChange={handleSearch}
          style={{ width: 250 }}
        />
        <Select
          placeholder="Filtrer par format"
          onChange={handleFormatChange}
          style={{ width: 250 }}
        >
          <Option value={null}>Tous les formats</Option>
          <Option value="pdf">PDF</Option>
          <Option value="jpg">JPG</Option>
          <Option value="ppt">PPT</Option>
        </Select>
        <Upload
          customRequest={({ file, onSuccess }) => {
            setTimeout(() => {
              handleUpload(file);
              onSuccess("ok");
            }, 1000);
          }}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />} type="primary">Uploader un fichier</Button>
        </Upload>
      </div>
      
      {files.length > 0 ? (
        <Table
          columns={columns}
          dataSource={processFiles()}
          className="espace-stockage-table"
        />
      ) : (
        <div className="empty-container">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Aucun fichier disponible" />
        </div>
      )}
    </div>
  );
}
