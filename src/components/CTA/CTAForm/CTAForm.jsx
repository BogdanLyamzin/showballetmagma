import { ErrorMessage, Field, Form, Formik } from 'formik'
import { withTranslation } from '../../../../i18n'
import styles from './CTAForm.module.scss'
import Button from '../../Shared/Button'
import { useEffect, useState } from 'react'
import * as emailjs from 'emailjs-com'
import UIMainInfo from '../../Shared/UIMainInfo'
import { validationSchema } from './validationSchema'

const CTAForm = ({ t }) => {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  let tm

  useEffect(() => {
    if (sent || error) {
      tm = setTimeout(() => {
        setSent(false)
        setError(false)
      }, 5000)
    }

    return () => {
      clearTimeout(tm)
    }
  }, [sent, error])

  const onSubmit = async (values, actions) => {
    try {
      await actions.setSubmitting(true)
      emailjs
        .send(
          'service_zqgdi2h',
          'template_k5nyqh9',
          {
            ...values,
          },
          'user_jbeLrIVMxZ90Q4t7rcidj',
        )
        .then(
          async () => {
            setSent(true)
            await actions.validateForm(true)
          },
          () => {
            setError(true)
          },
        )
    } catch (err) {
      if (err) throw new Error(err.message)
    }
  }

  return (
    <>
      {!sent && !error && (
        <Formik
          enableReinitialize
          validateOnMount
          validationSchema={() => validationSchema(t)}
          initialValues={{ name: '', email: '', message: '' }}
          onSubmit={(values, actions) => {
            onSubmit(values, actions)
          }}
        >
          {({ handleSubmit, isValid, isSubmitting, errors, touched }) => {
            return (
              <Form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                  <Field
                    style={{
                      borderBottom:
                        errors.name && touched.name && '1px solid tomato',
                    }}
                    className={styles.input}
                    name="name"
                    placeholder={t('placeholderName')}
                  />
                  <span
                    className={styles.error}
                    style={{ opacity: errors.name && touched.name && 1 }}
                  >
                    <ErrorMessage name="name" />
                  </span>
                </div>
                <div className={styles.group}>
                  <Field
                    style={{
                      borderBottom:
                        errors.email && touched.email && '1px solid tomato',
                    }}
                    className={styles.input}
                    name="email"
                    placeholder={t('placeholderEmail')}
                  />
                  <span
                    className={styles.error}
                    style={{ opacity: errors.email && touched.email && 1 }}
                  >
                    <ErrorMessage name="email" />
                  </span>
                </div>
                <div className={styles.group}>
                  <Field
                    style={{
                      borderBottom:
                        errors.message && touched.message && '1px solid tomato',
                    }}
                    as="textarea"
                    className={styles.input}
                    name="message"
                    placeholder={t('placeholderMessage')}
                    rows={1}
                  />
                  <span
                    className={styles.error}
                    style={{ opacity: errors.message && touched.message && 1 }}
                  >
                    <ErrorMessage name="message" />
                  </span>
                </div>

                <Button disabled={!isValid || isSubmitting} type="submit">
                  {t('submitForm')}
                </Button>
              </Form>
            )
          }}
        </Formik>
      )}
      {sent && <UIMainInfo>{t('ctaFeedback')}</UIMainInfo>}
      {error && <UIMainInfo>{t('ctaError')}</UIMainInfo>}
    </>
  )
}

export default withTranslation('common')(CTAForm)
