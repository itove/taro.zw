import React, { useState, useEffect } from 'react'
import { View, Button, Text } from '@tarojs/components'
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
  const [disabled, setDisabled] = useState(false)
  const [uid, setUid] = useState(0)

  useEffect(() => {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      console.log(res.data)
      setUid(res.data.id)
    })
    .catch(err => {
      console.log(err)
      Taro.redirectTo({url: '/pages/me/login'})
    })
  }, [])

  const formSubmit = (data) => {
    setDisabled(true)
    console.log(data);
    data.uid = uid
    Taro.request({
      method: 'POST',
      url: Env.apiUrl + 'feedback',
      data
    }).then((res) => {
      if (res.statusCode === 200) {
        Taro.showToast({
          title: '反馈成功',
          icon: 'success',
          duration: 1000
        }).then(() => {
          setTimeout(() => {
            // Taro.reLaunch({ url: '/pages/index/index' })
            Taro.navigateBack()
          }, 1000)
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

  const onFinishFailed = () => {
    console.log('verify failed')
  }

  return (
    <View className="feedback-new">

      <Form 
        className="form"
        labelPosition="left"
        onFinish={(values) => formSubmit(values)}
        onFinishFailed={(values) => onFinishFailed(values)}
      >
        <View className="field">
          <View className="text-title"><Text className="star">*</Text>问题建议</View>
          <Form.Item
            className="form-item"
            required
            // label="标题"
            name="title"
            rules={[
              { max: 50, message: '不能超过50个字' },
              { required: true, message: '请输入标题' },
            ]}
          >
            <TextArea
              placeholder="请输入相关主题"
              showCount
              maxLength={50}
              onChange={(value) => console.log('change', value)}
              onBlur={() => console.log('blur')}
              onFocus={() => console.log('focus')}
            />
          </Form.Item>
        </View>

        <View className="field">
          <View className="text-title"><Text className="star">*</Text>详细描述</View>
          <Form.Item
            className="body"
            required
            name="body"
            rules={[
              { max: 1000, message: '不能超过1000个字' },
              { required: true, message: '请输入内容' },
            ]}
          >
            <TextArea
              placeholder="请输入您的意见或建议"
              showCount
              maxLength={1000}
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
