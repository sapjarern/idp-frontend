import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

export type FieldType = {
    username: string;
    email: string
    password: string;
    givenName: string;
    familyName : string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

interface SignUpFormProps {
    onFinish?: CallableFunction
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
    const handleFinish: FormProps<FieldType>['onFinish'] = (values) => {
        if (props.onFinish) {
            props.onFinish(values)
        }
        else {
            onFinish(values)
        }
    }
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            // initialValues={{ remember: true }}
            onFinish={handleFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                label="First Name"
                name="givenName"
                rules={[{ required: true, message: 'Please input your First Name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Last Name"
                name="familyName"
                rules={[{ required: true, message: 'Please input your Last Name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
    )
};

export default SignUpForm;