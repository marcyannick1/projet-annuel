import React, {useContext, useRef, useState, useEffect} from 'react';
import {
    Card,
    Button,
    Input,
    DatePicker,
    Modal,
    Row,
    Col,
    Statistic,
    Divider,
    Progress,
    Timeline,
    Badge,
    message
} from 'antd';
import {
    UserOutlined,
    MailOutlined,
    HomeOutlined,
    EditOutlined,
    DeleteOutlined,
    FileOutlined,
    MessageOutlined
} from '@ant-design/icons';
import {Link, useNavigate} from 'react-router-dom';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement} from 'chart.js';
import {Field, Form, Formik} from "formik";
import {EditProfileSchema} from "../../schemas/editProfileSchema.js";
import dayjs from "dayjs";
import './ProfilJSX.css';
import AuthContext from "../../context/authContext.jsx";
import {render} from "@react-email/render";
import {sendEmail} from "../../services/emailService.js";
import SuppressionCompteEmailJSX from "../emails/SuppressionCompteEmailJSX.jsx";
import SuppressionCompteAdminEmailJSX from "../emails/SuppressionCompteAdminEmailJSX.jsx";

// Enregistrez les composants nécessaires pour ChartJS
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Profil() {
    const {user, updateUser, logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const formikRef = useRef(null);
    const [modalState, setModalState] = useState({type: null, visible: false, loading: false});

    const [userFiles, setUserFiles] = useState([]);

    // Vérifiez l'état de connexion et redirigez si nécessaire
    useEffect(() => {
        if (!user) {
            navigate("/LoginJSX");
        }

        const fetchFiles = async () => {
            const files = await fetch(`http://localhost:3000/file/${user.id}`)
            const data = await files.json();
            console.log(data)

            data.length ? setUserFiles(data) : null
        };

        fetchFiles()
    }, [user, navigate]);

    const showModal = (type) => {
        setModalState({type, visible: true});
    };

    const handleModalOk = async () => {
        setModalState({...modalState, loading: true})
        if (modalState.type === 'edit') {
            await formikRef.current.submitForm();
            if (formikRef.current.isSubmitting) {
                setModalState({type: null, visible: false});
            }
        } else if (modalState.type === 'delete') {
            try {
                const userDelete = await fetch(`http://localhost:3000/user/${user.id}`, {
                    method: 'DELETE',
                });

                const userDeleteData = await userDelete.json()
                if (userDelete.ok) {
                    const adminUsers = await fetch(`http://localhost:3000/user/admin`);
                    const adminUsersData = await adminUsers.json();

                    const emailContent = await render(<SuppressionCompteEmailJSX userFirstname={user.firstName}/>);
                    await sendEmail(user.email, "Au revoir!", emailContent);

                    for (const admin of adminUsersData) {
                        const adminEmailContent = await render(<SuppressionCompteAdminEmailJSX
                            adminName={admin.firstName} clientName={`${user.firstName} ${user.lastName}`}
                            filesDeleted={userDeleteData.File.length}/>);
                        await sendEmail(admin.email, "Un compte a été supprimé", adminEmailContent);
                    }

                    logout();
                }

            } catch (error) {
                console.error('Erreur lors de la suppression du compte :', error);
            }
        }
    };

    const handleModalCancel = () => {
        if (modalState.type === 'edit') {
            formikRef.current.resetForm();
        }
        setModalState({ type: null, visible: false });
    };

    const handleSubmit = async (userData) => {
        try {
            const response = await fetch(`http://localhost:3000/user/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            updateUser(await response.json());
        } catch (error) {
            console.error(error);
        }
    };

    const InputErrorMessage = ({ children }) => (
        <div style={{ color: "crimson", fontSize: 12 }}>{children}</div>
    );

    const activityData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Activité du Compte',
                data: [5, 10, 8, 12, 9, 14],
                fill: false,
                borderColor: '#1890ff',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className='profile-page contain'>
            <div className='profile-container'>
                <h2 className='page-title'>Mon Profil</h2>
                <p className='welcome-message'>Visualisez et gérez vos informations personnelles.</p>

                {user && (
                    <>
                        <Row gutter={24}>
                            <Col xs={24} md={16}>
                                <Card title="Informations Personnelles" bordered={false}
                                      style={{borderRadius: '8px', backgroundColor: '#f0f9ff'}}>
                                    <p><UserOutlined style={{color: '#1890ff'}}/> <strong>Nom :</strong> {user.lastName}
                                    </p>
                                    <p><UserOutlined style={{color: '#1890ff'}}/> <strong>Prénom
                                        :</strong> {user.firstName}</p>
                                    <p><MailOutlined style={{color: '#40a9ff'}}/> <strong>Email :</strong> {user.email}
                                    </p>
                                    <p><HomeOutlined style={{color: '#13c2c2'}}/> <strong>Adresse
                                        :</strong> {user.address}</p>
                                    <p><UserOutlined style={{color: '#faad14'}}/> <strong>Date de naissance
                                        :</strong> {new Date(user.birthday).toLocaleDateString()}</p>
                                    <Divider/>
                                    <Button type="primary" icon={<EditOutlined/>} style={{marginRight: '10px'}}
                                            onClick={() => showModal("edit")}>
                                        Modifier mes informations
                                    </Button>
                                    <Button type="danger" icon={<DeleteOutlined/>} onClick={() => showModal("delete")}>
                                        Supprimer mon compte
                                    </Button>
                                </Card>
                            </Col>

                            <Col xs={24} md={8}>
                                <Card title="Statistiques du Compte" bordered={false} style={{ borderRadius: '8px' }}>
                                    <Statistic title="Fichiers Uploadés" value={userFiles.length} prefix={<FileOutlined style={{ color: '#40a9ff' }} />} valueStyle={{ color: '#40a9ff' }} />
                                    <Statistic title="Messages Non Lu" value={8} prefix={<MessageOutlined style={{ color: '#13c2c2' }} />} valueStyle={{ color: '#13c2c2' }} style={{ marginTop: '20px' }} />
                                    <Divider />
                                    <p><strong>Compte créé le :</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                                </Card>
                            </Col>
                        </Row>

                        <Divider/>

                        <Row gutter={24}>
                            <Col xs={24} md={12}>
                                <Card title="Activité du Compte" bordered={false} style={{borderRadius: '8px'}}>
                                    <Line data={activityData}/>
                                </Card>
                            </Col>
                            <Col xs={24} md={12}>
                                <Card title="Récompenses" bordered={false} style={{borderRadius: '8px'}}>
                                    <Badge count="Nouveau" style={{backgroundColor: '#52c41a'}}/>
                                    <Badge count="VIP" style={{backgroundColor: '#faad14', marginLeft: '10px'}}/>
                                    <Badge count="Expert" style={{backgroundColor: '#1890ff', marginLeft: '10px'}}/>
                                </Card>
                            </Col>
                        </Row>

                        <Divider/>

                        <Card title="Historique d'Activité" bordered={false} style={{borderRadius: '8px'}}>
                            <Timeline
                                items={[
                                    {
                                        color: 'green',
                                        children: `Création du compte - ${new Date(user.createdAt).toLocaleDateString()}`
                                    },
                                    {
                                        color: 'blue',
                                        children: `Mise à jour du profil - ${new Date().toLocaleDateString()}`
                                    },
                                    {
                                        color: 'gray',
                                        children: `Message envoyé - ${new Date().toLocaleDateString()}`
                                    }
                                ]}
                            />
                        </Card>

                        <Divider/>

                        <Card title="Résumé de l'Activité" bordered={false} style={{borderRadius: '8px'}}>
                            <Progress percent={75} strokeColor="#1890ff"/>
                        </Card>

                        <Row gutter={16} style={{marginTop: '20px'}}>
                            <Col span={6}>
                                <Link to="/EspaceStockageJSX"> {/* Utilise Link pour créer un lien vers la route */}
                                    <Button type="primary" block
                                            style={{backgroundColor: '#1890ff', borderColor: '#1890ff'}}>
                                        <FileOutlined style={{color: '#fff'}}/> Voir les fichiers
                                    </Button>
                                </Link>

                            </Col>
                            <Col span={6}>
                                <Link to="/MessagesJSX"> {/* Utilise Link pour créer un lien vers la route */}
                                    <Button type="primary" block
                                            style={{backgroundColor: '#13c2c2', borderColor: '#13c2c2'}}>
                                        <MessageOutlined style={{color: '#fff'}}/> Voir mes messages
                                    </Button>
                                </Link>
                            </Col>
                            <Col span={6}>
                                <Link to="/StatisitiquesJSX"> {/* Utilise Link pour créer un lien vers la route */}
                                    <Button type="default" block
                                            style={{backgroundColor: '#faad14', borderColor: '#faad14', color: '#fff'}}>
                                        <UserOutlined/> Voir mes statistiques
                                    </Button>
                                </Link>
                            </Col>
                        </Row>

                        <Modal
                            title="Modifier mes informations"
                            open={modalState.visible && modalState.type === 'edit'}
                            onOk={handleModalOk}
                            onCancel={handleModalCancel}
                            okText={"Modifier"}
                            cancelText={"Annuler"}
                            centered
                            okButtonProps={{loading: modalState.loading}}
                        >
                            <Formik
                                initialValues={{
                                    firstName: user?.firstName,
                                    lastName: user?.lastName,
                                    birthday: user?.birthday,
                                    address: user?.address,
                                    email: user?.email,
                                }}
                                validationSchema={EditProfileSchema}
                                innerRef={formikRef}
                                onSubmit={handleSubmit}
                            >
                                {({setFieldValue, errors, touched}) => (
                                    <Form>
                                        <div>
                                            <label htmlFor="firstName">Prénom</label>
                                            <Field name="firstName" as={Input} id="firstName"
                                                   status={errors.firstName && touched.firstName ? "error" : null}/>
                                        </div>
                                        <div>
                                            <label htmlFor="lastName">Nom</label>
                                            <Field name="lastName" as={Input} id="lastName"
                                                   status={errors.lastName && touched.lastName ? "error" : null}/>
                                        </div>
                                        <div>
                                            <label htmlFor="birthday">Date de naissance</label>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                defaultValue={dayjs(user?.birthday)}
                                                onChange={(date) => setFieldValue('birthday', date ? date.toDate().toISOString() : null)}
                                                style={{width: "100%"}}
                                                status={errors.birthday && touched.birthday ? "error" : null}
                                                placeholder="Sélectionner une date"
                                                allowClear={false}
                                            />
                                            <InputErrorMessage>{errors.birthday && touched.birthday ? errors.birthday : null}</InputErrorMessage>
                                        </div>
                                        <div>
                                            <label htmlFor="address">Adresse</label>
                                            <Field name="address" as={Input} id="address"
                                                   status={errors.address && touched.address ? "error" : null}/>
                                        </div>
                                        <div>
                                            <label htmlFor="email">Adresse mail</label>
                                            <Field name="email" as={Input} id="email"
                                                   status={errors.email && touched.email ? "error" : null}/>
                                            <InputErrorMessage>{errors.email && touched.email ? errors.email : null}</InputErrorMessage>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Modal>

                        <Modal
                            title="Supprimer le compte"
                            open={modalState.visible && modalState.type === 'delete'}
                            onOk={handleModalOk}
                            onCancel={handleModalCancel}
                            okText={"Supprimer"}
                            cancelText={"Annuler"}
                            okButtonProps={{danger: true, loading: modalState.loading}}
                            centered
                        >
                            Voulez-vous vraiment supprimer votre compte ?
                        </Modal>
                    </>
                )}
            </div>
        </div>
    );
}
