import Head from 'next/head'
import Image from 'next/image'
import { Alert, Button } from 'reactstrap'
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <div>
      <div>
        <Alert color="primary">
          Hello Project
        </Alert>
        <Button color='primary'>ヤッホー</Button>
      </div>
    </div>
  )
}

export default Home
