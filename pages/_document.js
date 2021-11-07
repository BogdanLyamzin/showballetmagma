import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MagmaDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
      return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
              rel="preconnect"
              href="https://admin.showballetmagma.com/wp/graphql"
          />
          <link
              rel="dns-prefetch"
              href="https://admin.showballetmagma.com/wp/graphql"
          />
          <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
          />
          <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
          />
          <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <script
              dangerouslySetInnerHTML={{
                __html: `(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:2294920,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
              }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
