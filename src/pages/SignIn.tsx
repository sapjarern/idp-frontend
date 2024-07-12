import { notification } from "antd"
import SignInForm, {FieldType} from "../components/SignInForm"
import { fetchAuthSession, signIn } from "aws-amplify/auth"
import type { NotificationArgsProps } from 'antd';
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const SignInPage = () => {

    const navigate = useNavigate()
    const [api, contextHolder] = notification.useNotification()
    const openNotification = (props: NotificationArgsProps) => {
        api.info(props)
    }

    useEffect(() => {
        fetchAuthSession()
        .then((session) => {
          console.log("Fetch Session", session)
          if (session.tokens) {
            navigate('/')
          }
    
        })
        .catch((error) => {
          console.error("Fetch Session", error)
        })
      }, [])

    const onFinish = async (values: FieldType) => {
        console.log('Debug OnFinish', values)
        try {
            let response = await signIn(values)
            console.log(response)
            if (response.nextStep.signInStep == 'DONE') {
                // Go to app
                openNotification({type: 'success', message: 'Login Success.'})
                navigate('/')
            }
            else if (response.nextStep.signInStep == 'CONFIRM_SIGN_UP') {
                navigate('/confirm')
            }
            else if (response.nextStep.signInStep == 'CONFIRM_SIGN_IN_WITH_TOTP_CODE') {
                // Go to otp page
                navigate('/otp')
            }
        }
        catch (err) {
            openNotification({type: 'error', message: 'Login Fail.'})
            console.log('Login error', err)
        }

    }

    return (
        <div>
            {contextHolder}
            <h1>Login</h1>
            <SignInForm onFinish={onFinish} />
            <Link to={'/signup'} >Signup</Link>
        </div>
    )
}

export default SignInPage