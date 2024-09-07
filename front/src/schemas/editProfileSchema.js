import  * as Yup from 'yup';
import dayjs from "dayjs";

export const EditProfileSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('Le prénom est requis'),
    lastName: Yup.string()
        .required('Le nom est requis'),
    birthday: Yup.date()
        .required(' ')
        .max(dayjs(), 'Date de naissance invalide'),
    address: Yup.string()
        .required('L\'adresse est requise'),
    email: Yup.string()
        .email('Adresse email invalide')
        .required(' '),
});