import * as yup from 'yup'

export const validationSchema = (t) => {
    return yup.object().shape({
        name: yup.string().required(t('requiredName')),
        email: yup.string().required(t('requiredEmail')).email(t('validateEmail')),
        message: yup.string().required(t('requiredMessage')),
    })
}
