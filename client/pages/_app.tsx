import '../styles/app.scss'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '../components/Layout'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import AppContext from '../context/AppContext'
import { useEffect, useState } from 'react'
import { User } from '../types/user'
import Cookies from 'js-cookie'
import axios from 'axios'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`
})

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User|null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  // 認証チェック
  const checkAuth = async () => {
    const token = Cookies.get('token')
    if (token) {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        setUser(response.data)
      } catch (error) {
        console.log(error)
        Cookies.remove('token')
        setUser(null)
      }
    }
  }

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
