import React, { useState, useEffect } from 'react'
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
  const [node, setNode] = useState({})
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'wx/feedback'
    })
    .then(res => {
      const n = res.data
      setNode(n)
      console.log(n)
    })
  }, [])

  const makeCall = (num = node.phone) => {
    Taro.makePhoneCall({phoneNumber: num})
  }

  const openLocation = () => {
    const latitude = 32.499823
    const longitude = 110.8336
    Taro.openLocation({
      latitude,
      longitude,
      scale: 18
    })
  }

  const formSubmit = (data) => {
    setDisabled(true)
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
          setTimeout(() => {
            Taro.reLaunch({ url: '/pages/index/index' })
          }, 2000)
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
      <View className="title">
      {node.title}
      </View>

      <View className="info-1">
      <View className="item" onClick={openLocation}>
      <img
      src={Env.iconUrl + 'location-1.png'}
      />
      <View> {node.address}</View>
      </View>
      <View className="item" onClick={makeCall}>
      <img
      src={Env.iconUrl + 'call-1.png'}
      />
      <View> {node.phone}</View>
      </View>
      </View>

      <View className="summary">
      {node.summary}
      </View>

      <Form 
        className="form"
        labelPosition="left"
        onFinish={(values) => formSubmit(values)}
        onFinishFailed={(values) => onFinishFailed(values)}
      >
        <View className='example-body'>
        <Form.Item
          className="form-item"
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
          className="form-item"
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
          className="form-item"
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
          className="form-item"
          label="邮箱"
          name="email"
        >
          <Input type='text' placeholder='' focus/>
        </Form.Item>

        <Form.Item
          className="body"
          required
          name="body"
          rules={[
            { max: 500, message: '不能超过500个字' },
            { required: true, message: '请输入内容' },
          ]}
        >
          <TextArea
            placeholder="请输入您的意见或建议"
            onChange={(value) => console.log('change', value)}
            onBlur={() => console.log('blur')}
            onFocus={() => console.log('focus')}
          />
        </Form.Item>
        </View>
        <Button disabled={disabled} formType="submit" className="btn-primary mt-1">提 交</Button>
      </Form>
    </View>
  )
}

export default Index
