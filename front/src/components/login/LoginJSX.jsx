import {useContext} from 'react';
import './LoginJSX.css';
import BackgroundJSX from '../background/BackgroundJSX';
import {Link} from 'react-router-dom';
import {Input, Button, Carousel, Alert} from 'antd';
import {AuthContext} from "../../context/authContext.jsx";
import {Field, Form, Formik} from "formik";
import SecureLogin from "../../svg/login/SecureLogin.jsx";
import Login from "../../svg/login/Login.jsx";
import Figerprint from "../../svg/login/Figerprint.jsx";
import {LoginSchema} from "../../schemas/loginSchema.js";

const svgImages = [
    {
        svg: <SecureLogin height={200}/>,
        label: "Connexion rapide ",
        text: " Connectez-vous facilement et rapidement grâce à notre interface intuitive."
    },
    {
        svg: <Login height={200}/>,
        label: "Sécurité renforcée ",
        text: " Profitez d'une connexion sécurisée avec des protocoles de cryptage avancés."
    },
    {
        svg: <Figerprint height={200}/>,
        label: "Support 24/7 ",
        text: " Notre équipe est disponible 24/7 pour vous assister en cas de besoin."
    }
];

const SignJSX = () => {
    const {login, error} = useContext(AuthContext)

    const ErrorMessage = ({children}) => {
        return (
            <div style={{color: "crimson", fontSize: 12}}>{children}</div>
        )
    }

    return (
        <>
            <div className="back">
                <BackgroundJSX/>
            </div>
            <div className="contentt">
                <div className="form-container">
                    <h2>Se connecter</h2>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={(values) => {
                            console.log('Form data:', values);
                            login(values)
                        }}
                    >
                        {({errors, touched}) => (
                            <Form className="login-form">
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
                                <Button type="primary" htmlType="submit">Se connecter</Button>
                            </Form>
                        )}
                    </Formik>

                    <p className='lien-sign'>
                        Vous n'avez pas de compte?{' '}
                        <Link to="/SignJsx" className="create-account-link">S'inscrire</Link>
                    </p>
                    {error &&
                        <Alert message={error} type="error" showIcon/>
                    }
                </div>
                <div className="carousel-container">
                    <div className="carousel">
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

export default SignJSX;
