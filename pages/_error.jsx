import { withTranslation } from '../i18n'

const Error = ({ statusCode, t }) => (
  <p>
    Error:
    {statusCode
      ? t('error-with-status', { statusCode })
      : t('error-without-status')}
  </p>
)

Error.getInitialProps = async ({ res, err }) => {
  let statusCode = null
  if (res) {
    ;({ statusCode } = res)
  } else if (err) {
    ;({ statusCode } = err)
  }
  return {
    namespacesRequired: ['common'],
    props: {
      statusCode,
    },
  }
}

Error.defaultProps = {
  statusCode: null,
}

export default withTranslation('common')(Error)
