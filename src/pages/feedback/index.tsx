import React from 'react'
import { View, Button } from '@tarojs/components'
import './index.scss'
import {
  Form,
  InputNumber,
  Input,
  TextArea,
} from '@nutui/nutui-react-taro'

function Index() {

  const formSubmit = () => {
  }

  const formReset = () => {
  }

  return (
    <View className="p-1">
      <Form onSubmit={formSubmit} onReset={formReset} >
        <View className='example-body'>
        <Form.Item
          required
          label="姓名"
          name="username"
          rules={[
            { max: 5, message: '字段A不能超过5个字' },
            { required: true, message: '请输入字段A' },
          ]}
        >
          <Input type='text' placeholder='' focus/>
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
        >
          <Input type='text' placeholder='' focus/>
        </Form.Item>

        <Form.Item
          required
          label="电话"
          name="phone"
          rules={[
            { max: 5, message: '字段A不能超过5个字' },
            { required: true, message: '请输入字段A' },
          ]}
        >
          <Input type='text' placeholder='' focus/>
        </Form.Item>

        <Form.Item
          required
          label="标题"
          name="title"
          rules={[
            { max: 5, message: '字段A不能超过5个字' },
            { required: true, message: '请输入字段A' },
          ]}
        >
          <Input type='text' placeholder='' focus/>
        </Form.Item>

        <Form.Item
          required
          name="body"
          rules={[
            { max: 5, message: '字段A不能超过5个字' },
            { required: true, message: '请输入字段A' },
          ]}
        >
          <TextArea
            placeholder="请输入您的意见或建议"
            className="text-1"
            style={{ fontSize: '12px' }}
            onChange={(value) => console.log('change', value)}
            onBlur={() => console.log('blur')}
            onFocus={() => console.log('focus')}
          />
        </Form.Item>
        </View>
        <Button className="btn-primary">提 交</Button>
      </Form>
    </View>
  )
}

export default Index
