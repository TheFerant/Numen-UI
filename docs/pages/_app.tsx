import Head from 'next/head'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { MDXProvider } from '@mdx-js/react'

import useDomClean from 'lib/use-dom-clean'
import { HybridCode, HybridLink, Search } from 'lib/components'
import Menu from 'lib/components/layout/menu'

import { Image } from 'components'
import { BaseStyles, ThemeProvider, useTheme } from '@numen-ui/core'


const Application: NextPage<AppProps<{}>> = ({ Component, pageProps }) => {
  const {theme, setColorMode, colorMode} = useTheme();

  useEffect(() => {
    const theme = window.localStorage.getItem('theme')
    if (theme !== 'dark') return
    setColorMode('auto')
  }, [])
  console.log(theme)
  useDomClean()

  return (
    <>
      <Head>
        <title>Numen UI - Modern and minimalist React UI library</title>
        <meta name="google" content="notranslate" />
        <meta name="twitter:creator" content="@echo_witt" />
        <meta name="referrer" content="strict-origin" />
        <meta property="og:title" content="Numen UI" />
        <meta property="og:site_name" content="Numen UI" />
        <meta property="og:url" content="https://numen.ferant.io" />
        <link rel="dns-prefetch" href="//numen.ferant.io" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="generator" content="Numen UI" />
        <meta
          name="description"
          content="An open-source design system for building modern websites and applications."
        />
        <meta
          property="og:description"
          content="An open-source design system for building modern websites and applications."
        />
        <meta
          itemProp="image"
          property="og:image"
          content="https://user-images.githubusercontent.com/11304944/91128466-dfc96c00-e6da-11ea-8b03-a96e6b98667d.png"
        />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/11304944/91128466-dfc96c00-e6da-11ea-8b03-a96e6b98667d.png"
        />
        <meta
          property="twitter:image"
          content="https://user-images.githubusercontent.com/11304944/91128466-dfc96c00-e6da-11ea-8b03-a96e6b98667d.png"
        />
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover"
        />
      </Head>
      <ThemeProvider colorMode={colorMode}>
        <BaseStyles>
          <Menu />
          <Search />
          <MDXProvider
            components={{
              a: HybridLink,
              img: Image,
              pre: HybridCode,
            }}>
            <Component {...pageProps} />
          </MDXProvider>
        <style global jsx>{`
          // .tag {
          //   color: ${theme.palette.accents_5};
          // }
          // .punctuation {
          //   color: ${theme.palette.accents_5};
          // }
          // .attr-name {
          //   color: ${theme.palette.accents_6};
          // }
          // .attr-value {
          //   color: ${theme.palette.accents_4};
          // }
          // .language-javascript {
          //   color: ${theme.palette.accents_4};
          // }
          // span.class-name {
          //   color: ${theme.palette.warning};
          // }
          // span.maybe-class-name {
          //   color: ${theme.palette.purple};
          // }
          // span.token.string {
          //   color: ${theme.palette.accents_5};
          // }
          // span.token.comment {
          //   color: ${theme.palette.accents_3};
          // }
          // span.keyword {
          //   color: ${theme.palette.success};
          // }
          // span.plain-text {
          //   color: ${theme.palette.accents_3};
          // }
          body::-webkit-scrollbar {
            width: var(--Numen-page-scrollbar-width);
            background-color: ${theme.palette.accents_1};
          }
          body::-webkit-scrollbar-thumb {
            background-color: ${theme.palette.accents_2};
            border-radius: ${theme.layout.radius};
          }
          :root {
            --Numen-page-nav-height: 64px;
            --Numen-page-scrollbar-width: 4px;
          }
        `}</style>
          </BaseStyles>
      </ThemeProvider>
    </>
  )
}

export default Application
