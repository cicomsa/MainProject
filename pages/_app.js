import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux';
import store from '../src/store'
import { ThemeProvider } from 'styled-components'
import { PersistGate } from 'redux-persist/integration/react'

const theme = {
  colors: {
    primary: 'green',
    secondary: 'blue'
  },
  horizontalAlignment: {
    center: 'center'
  }
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>Main Project</title>
        </Head>
        <Provider store={store}>
          <PersistGate loading={null} persistor={store.__PERSISTOR}>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </>
    )
  }
}

export default MyApp