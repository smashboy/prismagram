import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { createGetInitialProps } from '@mantine/next'

const getInitialProps = createGetInitialProps()

export default class Document extends NextDocument {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html lang="en">
        <Head />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
