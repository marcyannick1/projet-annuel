import React, {useContext, useRef, useState} from 'react';
import {Card, Button, Input, DatePicker, Modal} from 'antd';
import {UserOutlined, MailOutlined, HomeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

import './ProfilJSX.css';
import AuthContext from "../../context/authContext.jsx";
import styles from "../sign/Sign.module.css";
import {Field, Form, Formik} from "formik";
import {EditProfileSchema} from "../../schemas/editProfileSchema.js";
import dayjs from "dayjs";

export default function Profil() {
    const { user, updateUser, logout } = useContext(AuthContext);

    const formikRef = useRef(null);
    const [modalState, setModalState] = useState({ type: null, visible: false });

    const showModal = (type) => {
        setModalState({ type, visible: true });
    };

    const handleModalOk = async () => {
        if (modalState.type === 'edit') {
            await formikRef.current.submitForm();
            if (formikRef.current.isSubmitting) {
                setModalState({ type: null, visible: false });
            }
        } else if (modalState.type === 'delete') {
            try {
                await fetch(`http://localhost:3000/user/${user.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                logout();
            } catch (error) {
                console.error('Erreur lors de la suppression du compte :', error);
            }
            setModalState({ type: null, visible: false });
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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            updateUser(await response.json())
        } catch (error) {
            console.error(error);
        }
    }

    const InputErrorMessage = ({children}) => {
        return (
            <div style={{color: "crimson", fontSize: 12}}>{children}</div>
        )
    }

    return (
        <div className='profile-page contain'>
            <h2 className='page-title'>Mon Profil</h2>

            {user &&
                <>
                    <Card title="Informations Personnelles" style={{backgroundColor: '#f0f9ff'}}>
                        <p><UserOutlined style={{color: '#1890ff'}}/> <strong>Nom :</strong> {user.lastName}</p>
                        <p><UserOutlined style={{color: '#1890ff'}}/> <strong>Prénom :</strong> {user.firstName}</p>
                        <p><MailOutlined style={{color: '#40a9ff'}}/> <strong>Email :</strong> {user.email}</p>
                        <p><HomeOutlined style={{color: '#13c2c2'}}/> <strong>Adresse :</strong> {user.address}</p>
                        <p><UserOutlined style={{color: '#faad14'}}/> <strong>Date de naissance
                            :</strong> {new Date(user.birthday).toLocaleDateString()}</p>
                        <p><UserOutlined style={{color: '#faad14'}}/> <strong>Date de création du compte
                            :</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                        <Button type="primary" icon={<EditOutlined/>} style={{marginTop: '16px'}} onClick={()=>showModal("edit")}>
                            Modifier mes informations
                        </Button>
                        <Button type="primary" danger icon={<DeleteOutlined />} style={{marginTop: '16px'}} onClick={()=>showModal("delete")}>
                            Supprimer le compte
                        </Button>
                    </Card>
                </>
            }

            <Modal
                title="Modifier mes informations"
                open={modalState.visible && modalState.type === 'edit'}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText={"Modifier"}
                cancelText={"Annuler"}
                centered
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

                        <Form className={styles.login_form}>
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
                                <InputErrorMessage>
                                    {errors.birthday && touched.birthday ? errors.birthday : null}
                                </InputErrorMessage>
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
                                <InputErrorMessage>
                                    {errors.email && touched.email ? errors.email : null}
                                </InputErrorMessage>
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
                okButtonProps={{danger: true}}
                centered
            >
                Voulez vous vraiment supprimer votre compte?
            </Modal>
        </div>
    );
}
