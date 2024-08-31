import  * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Adresse email invalide')
        .required(' '),
    password: Yup.string()
        .required(' ')
});