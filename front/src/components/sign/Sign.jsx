import styles from './Sign.module.css';
import Background from '../background/Background.jsx';
import {Link} from 'react-router-dom';
import {Input, DatePicker, Button, Carousel, Alert} from 'antd';
import {Field, Form, Formik} from "formik";
import {SignupSchema} from "../../schemas/signupSchema.js";
import Welcome from "../../svg/register/Welcome.jsx";
import SignUp from "../../svg/register/SignUp.jsx";
import Gift from "../../svg/register/Gift.jsx";
import { useNavigate } from 'react-router-dom';
import {useState} from "react";


const svgImages = [
    {
        svg: <Welcome height={200}/>,
        label: "Rejoignez notre communauté ",
        text: "Créez un compte pour découvrir des contenus exclusifs et rejoindre une communauté dynamique."
    },
    {
        svg: <SignUp height={200}/>,
        label: "Inscription facile et rapide",
        text: " En quelques étapes simples, complétez votre inscription et accédez à toutes nos fonctionnalités."
    },
    {
        svg: <Gift height={200}/>,
        label: "Bénéficiez d'avantages uniques ",
        text: " Profitez d'offres spéciales, de recommandations personnalisées et d'une expérience sur mesure."
    }
];

const Sign = () => {
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = async (userData)=>{
        setError(null)
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                navigate("/login");
            } else {
                const res = await response.json()
                res.code === "P2002" ? setError("Email déja utilisé") : setError("Une erreur est survenue");
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
        }
    }

    const ErrorMessage = ({children}) => {
        return (
            <div style={{color: "crimson", fontSize: 12}}>{children}</div>
        )
    }

    return (
        <>
            <Background/>
            <div className={styles.content}>
                <div className={styles.form_container}>
                    <h2>S'inscrire</h2>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            birthday: null,
                            address: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={SignupSchema}
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
                                        onChange={(date) => setFieldValue('birthday', date ? date.toDate().toISOString() : null)}
                                        style={{width: "100%"}}
                                        status={errors.birthday && touched.birthday ? "error" : null}
                                        placeholder="Sélectionner une date"
                                    />
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

                                <div>
                                    <label htmlFor="password">Mot de passe</label>
                                    <Field name="password" as={Input.Password} id="password"
                                           status={errors.password && touched.password ? "error" : null}/>
                                    <ErrorMessage>
                                        {errors.password && touched.password ? errors.password : null}
                                    </ErrorMessage>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
                                    <Field name="confirmPassword" as={Input.Password} id="confirmPassword"
                                           status={errors.confirmPassword && touched.confirmPassword ? "error" : null}/>
                                    <ErrorMessage>
                                        {errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null}
                                    </ErrorMessage>
                                </div>
                                <Button type="primary" htmlType="submit">S'inscrire</Button>
                            </Form>
                        )}
                    </Formik>

                    <p className={styles.lien_sign}>
                        Déjà un compte ?{' '}
                        <Link to="/login">Se Connecter</Link>
                    </p>
                    {error &&
                        <Alert message={error} type="error" showIcon/>
                    }
                </div>
                <div className={styles.carousel_container}>
                    <div className={styles.carousel}>
                        <Carousel autoplay>
                            {svgImages.map((svg, idx) =>
                                <div key={idx}>
                                    {svg.svg}
                                    <h3>{svg.label}</h3>
                                    <p>{svg.text}</p>
                                </div>
                            )}
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sign;
