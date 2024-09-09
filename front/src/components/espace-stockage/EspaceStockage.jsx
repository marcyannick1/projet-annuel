import React, { useState, useEffect } from 'react';
import { Table, Button, Upload, message, Popconfirm, Empty, Input, Select, Row, Col } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './EspaceStockage.module.css';

const { Option } = Select;

export default function EspaceStockage() {
    const [files, setFiles] = useState([]);
    const [filteredFiles, setFilteredFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFormat, setSelectedFormat] = useState(null);

    // Fonction pour charger les fichiers existants
    const fetchFiles = () => {
        const mockFiles = [
            { key: '1', name: 'Document1.pdf', size: '50KB', format: 'pdf', date: new Date('2024-01-10') },
            { key: '2', name: 'Image1.jpg', size: '200KB', format: 'jpg', date: new Date('2024-01-15') },
            { key: '3', name: 'Presentation.ppt', size: '120KB', format: 'ppt', date: new Date('2024-01-20') },
        ];
        setFiles(mockFiles);
    };

    // Fonction pour uploader un fichier
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

    // Fonction pour supprimer un fichier
    const handleDelete = (key) => {
        const updatedFiles = files.filter((file) => file.key !== key);
        setFiles(updatedFiles);
        message.success('Fichier supprimé avec succès.');
    };

    // Fonction pour gérer la recherche
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Fonction pour gérer le filtre par format
    const handleFormatChange = (value) => {
        setSelectedFormat(value);
    };

    // Filtrage et tri des fichiers
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
            title: "Date d'upload",
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
        <Row justify="center" align="middle" style={{ height: '100vh', marginLeft: '50px' }}>
            <Col span={18} style={{ textAlign: 'center' }}>
                <h2>Espace de Stockage</h2>
                <div>
                    <Input
                        placeholder="Rechercher par nom de fichier"
                        onChange={handleSearch}
                        style={{ marginBottom: 16, width: 200 }}
                    />
                    <Select
                        placeholder="Filtrer par format"
                        onChange={handleFormatChange}
                        style={{ marginBottom: 16, width: 200 }}
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
                                onSuccess('ok');
                            }, 1000);
                        }}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />}>Uploader un fichier</Button>
                    </Upload>
                </div>

                {files.length > 0 ? (
                    <Table
                        columns={columns}
                        dataSource={processFiles()}
                        style={{ marginTop: 20 }}
                    />
                ) : (
                    <div style={{ marginTop: 20, textAlign: 'center' }}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Aucun fichier disponible" />
                    </div>
                )}
            </Col>
        </Row>
    );
}
