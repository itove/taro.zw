import React from 'react'
import { View, Button } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import {
  Form,
  InputNumber,
  Input,
  TextArea,
} from '@nutui/nutui-react-taro'

function Index() {

  const formSubmit = (data) => {
    console.log(data);
    Taro.request({
      method: 'POST',
      url: Env.apiUrl + 'feedback',
      data
    }).then((res) => {
      if (res.statusCode === 200) {
        Taro.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        }).then(() => {
          Taro.reLaunch({ url: '/pages/index/index' })
        })
      } else {
        Taro.showToast({
          title: '系统错误',
          icon: 'error',
          duration: 2000
        })
        console.log('server error！' + res.errMsg)
      }
    })
  }

  const formReset = () => {
  }

  return (
    <View className="p-1">
      <Form 
        labelPosition="left"
        onFinish={(values) => formSubmit(values)}
        onFinishFailed={(values) => onFinishFailed(values)}
      >
        <View className='example-body'>
        <Form.Item
          required
          label="姓名"
          name="firstname"
          rules={[
            { max: 50, message: '不能超过50个字' },
            { required: true, message: '请输入姓名' },
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
            { max: 11, message: '不能超过11个字' },
            { required: true, message: '请输入电话' },
          ]}
        >
          <Input type='text' placeholder='' focus/>
        </Form.Item>

        <Form.Item
          required
          label="标题"
          name="title"
          rules={[
            { max: 50, message: '不能超过50个字' },
            { required: true, message: '请输入标题' },
          ]}
        >
          <Input type='text' placeholder='' focus/>
        </Form.Item>

        <Form.Item
          required
          name="body"
          rules={[
            { max: 500, message: '不能超过500个字' },
            { required: true, message: '请输入内容' },
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
        <Button formType="submit" className="btn-primary">提 交</Button>
      </Form>
    </View>
  )
}

export default Index
