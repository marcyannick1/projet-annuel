import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Table, Button, Card, Row, Col, Statistic, Progress, Input, Skeleton, Space, Flex} from 'antd';
import {DownloadOutlined, SearchOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons';
import './ViewFilesJSX.css'; // Utilisez le style cohérent avec le reste
import moment from 'moment';
import {filesize} from "filesize";

const ViewFilesJSX = () => {
    const {userId} = useParams();
    const [userInfo, setUserInfo] = useState({});
    const [userFiles, setUserFiles] = useState([]);
    const [userSubscriptions, setUserSubscriptions] = useState([]);

    useEffect(() => {
        const fecthUser = async () => {
            const user = await fetch(`http://localhost:3000/user/${userId}`)

            const data = await user.json();
            setUserInfo(data)
        }

        const fetchFiles = async () => {
            const files = await fetch(`http://localhost:3000/file/${userId}`)
            const data = await files.json();
            console.log(data)

            setUserFiles(data)
        };

        const fetchSubscriptions = async () => {
            const subscriptions = await fetch(`http://localhost:3000/subscription/${userId}`)
            const data = await subscriptions.json();
            console.log(data)

            data.length ? setUserSubscriptions(data) : null
            setLoading(false)
        };

        fecthUser()
        fetchFiles()
        fetchSubscriptions()
    }, [userId])

    const determinePercent = () => {
        const filesSize = userFiles.reduce((acc, file) => acc + file.size, 0)
        const totalStorage = userSubscriptions.length * 21474836480

        return filesSize * 100 / totalStorage
    }

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    placeholder={`Recherche ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => confirm()}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => confirm()}
                    icon={<SearchOutlined/>}
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Chercher
                </Button>
                <Button onClick={() => clearFilters()} size="small" style={{width: 90}}>
                    Réinitialiser
                </Button>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
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
            render: (size) => filesize(size),
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
                <Button icon={<DownloadOutlined/>} onClick={() => console.log('Téléchargement de', record.name)}>
                    Télécharger
                </Button>
            ),
        },
    ];

    return (
        <div className="view-files-page contain">

            {/* Section des informations personnelles de l'utilisateur */}
            <h2 className="page-title">Espace de stockage de {userInfo.firstName} {userInfo.lastName}</h2>
            <Card className="user-info-card" style={{marginBottom: '20px'}}>
                <Row gutter={16}>
                    <Col span={4}>
                        <img
                            src={userInfo.avatar}
                            alt={userInfo.name}
                            style={{width: '100%', borderRadius: '50%'}}
                        />
                    </Col>
                    <Col span={20}>
                        <h3>{userInfo.name}</h3>
                        <p>Email : {userInfo.email}</p>
                        <p>Adresse : {userInfo.address}</p>
                        <p>Status : <strong
                            style={{color: userInfo.status === 'Active' ? 'green' : 'red'}}>{userInfo.status}</strong>
                        </p>
                        <p>Espace utilisé : 20 GB</p> {/* Affichage de l'espace utilisé */}
                    </Col>
                </Row>
            </Card>

            {/* Section des statistiques */
            }
            <Row gutter={16}>
                <Col span={8}>
                    <Statistic title="Nombre total de fichiers" value={userFiles.length}/>
                </Col>
                <Col span={8}>
                    <Statistic
                        title="Taille totale des fichiers"
                        value={filesize(userFiles.reduce((acc, file) => acc + file.size, 0))}
                    />
                    {/*<h1>{`${userFiles.reduce((acc, file) => acc + file.size, 0)}`}</h1>*/}
                </Col>
                <Col span={8}>
                    <Statistic title="Dernier fichier uploadé"/>
                </Col>
            </Row>

            {/* Section de l'espace de stockage */
            }
            <Card style={{marginTop: '20px'}}>
                <h3>Utilisation de l'espace de stockage</h3>
                <Progress
                    percent={determinePercent()}
                    format={() => `${filesize(userFiles.reduce((acc, file) => acc + file.size, 0))} / ${filesize(userSubscriptions.length * 20000000000)}`}
                />
            </Card>

            {/* Section des fichiers */
            }
            <div className={`table-container ${userFiles.length >= 5 ? 'scrollable' : ''}`}>
                <Table columns={columns} dataSource={userFiles} pagination={false} style={{marginTop: '20px'}}/>
            </div>
        </div>

    )
        ;
};

export default ViewFilesJSX;
