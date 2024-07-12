import { useEffect, useState } from 'react'
import './App.css'
import { fetchAuthSession, signOut } from 'aws-amplify/auth';

import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';


Amplify.configure(outputs); // try to move to main.tsx

function App() {

  const navigate = useNavigate()
  const [current_user, setCurrent_user] = useState<any>()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAuthSession()
    .then((session) => {
      console.log("Fetch Session", session)
      if (!session.tokens) {
        console.log("Null")
        navigate('/login')
      }
      else {
        setCurrent_user(session.tokens.accessToken.payload)
      }

    })
    .catch((error) => {
      console.error("Fetch Session", error)
    })
  }, [])

  return (
    // <Authenticator>
    //   {({ signOut, user }) => (
        <main>
          <h1>Hello {current_user?.username}</h1>
          <button onClick={handleSignOut}>Sign out</button>
          {/* <Component {...pageProps} /> */}
        </main>
    //   )}
    // </Authenticator>
  )
}

export default App
