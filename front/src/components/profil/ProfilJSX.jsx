import React, {useContext, useRef, useState} from 'react';
import {Card, Button, Input, DatePicker, Modal} from 'antd';
import {UserOutlined, MailOutlined, HomeOutlined, EditOutlined} from '@ant-design/icons';

import './ProfilJSX.css';
import AuthContext from "../../context/authContext.jsx";
import styles from "../sign/Sign.module.css";
import {Field, Form, Formik} from "formik";
import {EditProfileSchema} from "../../schemas/editProfileSchema.js";
import dayjs from "dayjs";

export default function ProfilJSX() {
    const {user, updateUser} = useContext(AuthContext);

    const formikRef = useRef(null); // Création de la référence

    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        await formikRef.current.submitForm()
        if (formikRef.current.isSubmitting) {
            setOpen(false);
        }
    };

    const handleCancel = () => {
        formikRef.current.resetForm()
        setOpen(false);
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

    const ErrorMessage = ({children}) => {
        return (
            <div style={{color: "crimson", fontSize: 12}}>{children}</div>
        )
    }

    return (
        <div className='profile-page contain'>
            <h2 className='page-title'>Mon Profil</h2>

            {user &&
                <Card title="Informations Personnelles" style={{backgroundColor: '#f0f9ff'}}>
                    <p><UserOutlined style={{color: '#1890ff'}}/> <strong>Nom :</strong> {user.lastName}</p>
                    <p><UserOutlined style={{color: '#1890ff'}}/> <strong>Prénom :</strong> {user.firstName}</p>
                    <p><MailOutlined style={{color: '#40a9ff'}}/> <strong>Email :</strong> {user.email}</p>
                    <p><HomeOutlined style={{color: '#13c2c2'}}/> <strong>Adresse :</strong> {user.address}</p>
                    <p><UserOutlined style={{color: '#faad14'}}/> <strong>Date de naissance
                        :</strong> {new Date(user.birthday).toLocaleDateString()}</p>
                    <p><UserOutlined style={{color: '#faad14'}}/> <strong>Date de création du compte
                        :</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                    <Button type="primary" icon={<EditOutlined/>} style={{marginTop: '16px'}} onClick={showModal}>
                        Modifier mes informations
                    </Button>
                </Card>
            }


            <Modal
                title="Modifier mes informations"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                okText={"Modifier"}
                cancelText={"Annuler"}
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
                                <ErrorMessage>
                                    {errors.birthday && touched.birthday ? errors.birthday : null}
                                </ErrorMessage>
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
                                <ErrorMessage>
                                    {errors.email && touched.email ? errors.email : null}
                                </ErrorMessage>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
}
