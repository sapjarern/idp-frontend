import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

export type FieldType = {
    otp_code: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

interface OTPFormProps {
    onFinish?: CallableFunction
}

const OTPForm: React.FC<OTPFormProps> = (props) => {
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
                label="Code"
                name="otp_code"
                rules={[{ required: true, message: 'Please input your otp!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
};

export default OTPForm;