import React, {useState, useEffect, useContext} from 'react';
import {Table, Button, Upload, Popconfirm, Empty, Input, Select, Spin} from 'antd';
import {UploadOutlined, DeleteOutlined} from '@ant-design/icons';
import styles from './EspaceStockage.module.css';
import AuthContext from "../../context/authContext.jsx";
import {filesize} from "filesize";

const {Option} = Select;

export default function EspaceStockage() {
    const {user} = useContext(AuthContext);
    const [files, setFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFormat, setSelectedFormat] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false)

    // // Fonction pour uploader un fichier
    const handleUpload = async ({file}) => {
        setUploadLoading(true)
        const formData = new FormData();
        formData.append('files', file);
        formData.append('userId', user.id);
        try {
            const response = await fetch("http://localhost:3000/file", {
                method: 'POST',
                body: formData
            })

            const data = await response.json();
            setFiles([...files, ...data.files])
        }catch (e){
            console.error(e);
        }finally {
            setUploadLoading(false)
        }

    };

    // // Fonction pour supprimer un fichier
    const handleDelete = async (record) => {
        const filesDelete = await fetch('http://localhost:3000/file', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json', // Spécifier que le corps est en JSON
            },
            body: JSON.stringify({
                userId: user.id,
                filesData: [{
                    id: record.id,
                    name: record.name,
                }]
            })
        })
        console.log(await filesDelete.json());
        const updatedFiles = files.filter((file) => file.id !== record.id);
        setFiles(updatedFiles);
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
            render: (text, record) => (
                <a href={record.url} target="_blank">
                    {text}
                </a>
            )
        },
        {
            title: 'Taille',
            dataIndex: 'size',
            key: 'size',
            sorter: (a, b) => parseFloat(a.size) - parseFloat(b.size),
            render: (text) => (
                <p>{filesize(text, {symbols: {B: "octet(s)", kB: "Ko", MB: "Mo", GB: "Go"}})}</p>
            )
        },
        {
            title: 'Format',
            dataIndex: 'format',
            key: 'format',
        },
        {
            title: 'Date d\'upload',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleDateString(),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer ce fichier?"
                    onConfirm={() => handleDelete(record)}
                    okText="Oui"
                    cancelText="Non"
                >
                    <Button type="primary" danger icon={<DeleteOutlined/>}>
                        Supprimer
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    const filesFormats = [...new Set(files.map(file => file.format))];

    useEffect(() => {
        const fetchFiles = async () => {
            const files = await fetch(`http://localhost:3000/file/${user.id}`)
            const data = await files.json();
            console.log(data)

            const filteredFiles = data.map((file) => ({
                id: file.id,
                name: file.name,
                size: file.size,
                createdAt: file.createdAt,
                format: file.format,
                url: file.url
            }));

            setFiles(filteredFiles)
        };

        fetchFiles()
    }, [user]);

    return (
        <div className={`${styles.espace_stockage} contain`}>
            <h2>Espace de Stockage</h2>
            <div style={{display: "flex", gap: 10}}>
                <Input
                    placeholder="Rechercher par nom de fichier"
                    onChange={handleSearch}
                    style={{marginBottom: 16, width: 200}}
                />
                <Select
                    placeholder="Filtrer par format"
                    onChange={handleFormatChange}
                    style={{marginBottom: 16, width: 200}}
                >
                    <Option value={null}>Tous les formats</Option>
                    {filesFormats.map((format, idx) => (
                        <Option key={idx} value={format}>{format}</Option>
                    ))}
                </Select>
                <Upload
                    customRequest={handleUpload}
                    showUploadList={false}
                    multiple
                >
                    <Button icon={<UploadOutlined/>}>Uploader un fichier</Button>
                </Upload>
            </div>

            {uploadLoading && <Spin tip="Upload en cours..." fullscreen />}

            {files.length > 0 ? (
                <Table
                    columns={columns}
                    dataSource={processFiles()}
                    style={{marginTop: 20}}
                />
            ) : (
                <div style={{marginTop: 20, textAlign: 'center'}}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Aucun fichier disponible"/>
                </div>
            )}
        </div>
    )
}