import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { createGetInitialProps } from '@mantine/next'

const getInitialProps = createGetInitialProps()

const socialPreviewImageUrl = `${process.env.NEXT_PUBLIC_ORIGIN}/socialpreview.png`

export default class Document extends NextDocument {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta property="og:type" content="website" />
          <meta property="og:url" content={process.env.NEXT_PUBLIC_ORIGIN} />
          <meta property="twitter:url" content={process.env.NEXT_PUBLIC_ORIGIN} />
          <link rel="icon" href="/favicon.ico" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="image" content={socialPreviewImageUrl} />
          <meta itemProp="image" content={socialPreviewImageUrl} />
          <meta name="twitter:image" content={socialPreviewImageUrl} />
          <meta name="og:image" content={socialPreviewImageUrl} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
