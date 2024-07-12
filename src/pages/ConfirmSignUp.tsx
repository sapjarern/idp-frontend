import { notification } from "antd"
import ConfirmSignUpForm, {FieldType} from "../components/ConfirmSignUpForm"
import { confirmSignUp, ConfirmSignUpInput } from "aws-amplify/auth"
import { fetchAuthSession } from "aws-amplify/auth"
import type { NotificationArgsProps } from 'antd';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ConfirmSignUpPage = () => {

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
        let context: ConfirmSignUpInput = {
            username: values.username, // get from stor or param or ...
            confirmationCode: values.confirmCode
        }
        try {
            let response = await confirmSignUp(context)
            console.log("confirmSignUp", response)
            if (response.nextStep.signUpStep == 'DONE'){
                navigate('/')
            }
            
        }
        catch (err) {
            openNotification({type: 'error', message: 'Login Fail.'})
            console.error('Login error', err)
        }

    }

    return (
        <div>
            {contextHolder}
            <h1>Confirm</h1>
            <ConfirmSignUpForm onFinish={onFinish} />
        </div>
    )
}

export default ConfirmSignUpPage