import { notification } from "antd"
import OTPForm, {FieldType} from "../components/OTPForm"
import { fetchAuthSession, confirmSignIn, ConfirmSignInInput } from "aws-amplify/auth"
import type { NotificationArgsProps } from 'antd';
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const OTPPage = () => {

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
        let context: ConfirmSignInInput = {
            challengeResponse: values.otp_code
        }
        try {
            let response = await confirmSignIn(context)
            console.log(response)
            if (response.nextStep.signInStep == 'DONE') {
                // Go to app
                openNotification({type: 'success', message: 'Login Success.'})
                navigate('/')
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
            <h1>OTP</h1>
            <OTPForm onFinish={onFinish} />
        </div>
    )
}

export default OTPPage