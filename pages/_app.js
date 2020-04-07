import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux';
import { store, persistor } from '../src/store'
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
    console.log(this.props)
    const { Component, router } = this.props
    return (
      <>
        <Head>
          <title>Main Project</title>
        </Head>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <Component pathname={router.pathname} />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </>
    )
  }
}

export default MyApp