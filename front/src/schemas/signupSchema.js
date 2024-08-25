import  * as Yup from 'yup';
import dayjs from "dayjs";

export const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('Le prénom est requis'),
    lastName: Yup.string()
        .required('Le nom est requis'),
    birthday: Yup.date()
        .required('La date de naissance est requise')
        .max(dayjs(), 'Date de naissance invalide'),
    address: Yup.string()
        .required('L\'adresse est requise'),
    email: Yup.string()
        .email('Adresse email invalide')
        .required(' '),
    password: Yup.string()
        .required(' ')
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
        .required(' '),
});