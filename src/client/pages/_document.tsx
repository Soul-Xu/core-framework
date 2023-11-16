import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        {/* @ts-expect-error

 */}
        <Head />
        <body>
          <Main />
          {/* @ts-expect-error

 */}
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument