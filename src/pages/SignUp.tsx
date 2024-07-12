import { message } from "antd"
import SignUpForm, { FieldType } from "../components/SignUpForm"
import { signUp, SignUpInput } from "aws-amplify/auth"
import { useNavigate } from "react-router-dom";


export type NameSchema = {
    givenName: string;
    familyName : string;
}

export type UserSchema = {
    username: string;
    emails: string;
    password: string;
    name: NameSchema;
}


const SignUpPage = () => {

    const navigate = useNavigate()
    const [messageApi] = message.useMessage()

    const onFinish = async (values: FieldType) => {
        console.log('Debug OnFinish', values)
        let context: SignUpInput = {
            username: values.username,
            password: values.password,
            options: {
                userAttributes: {
                    email: values.email,
                    given_name: values.givenName,
                    family_name: values.familyName
                }
            }
        }
        console.log("Context: ", context)
        let response = await signUp(context)
        try {
            console.log(response)
            if (response.nextStep.signUpStep == 'DONE') {
                // redirect to sign in page
            }
            else if (response.nextStep.signUpStep == 'CONFIRM_SIGN_UP') {
                // Noti user to verify account
                navigate('/confirm')
            }
            if (response.isSignUpComplete) {
                messageApi.open({
                    type: 'success',
                    content: 'This is a success message',
                })
            }
        }
        catch (err) {
            messageApi.open({
                type: 'error',
                content: 'This is an error message',
            })
            console.error('Sign Up error', err)
        }

    }

    return (
        <div>
            <h1>Sign Up</h1>
            <SignUpForm onFinish={onFinish} />
        </div>
    )
}

export default SignUpPage