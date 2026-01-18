import Head from 'next/head'

export default function SEO({
  title = 'Sebastian Kovacs',
  description = 'Sebastian Kovacs Architecture Portfolio',
  image = '/sebastian-kovacs-og-image.jpg',
  url = '',
  type = 'website'
}) {
  const fullTitle = title
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      {url ? <meta property="og:url" content={url} /> : null}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}

