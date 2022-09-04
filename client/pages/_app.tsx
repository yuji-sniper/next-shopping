import '../styles/app.scss'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '../components/Layout'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import AppContext from '../context/AppContext'
import { useState } from 'react'
import { User } from '../types/user'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`
})

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>()

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </AppContext.Provider>
  )
}

export default MyApp
