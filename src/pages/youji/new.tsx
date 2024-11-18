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
  const [disabled, setDisabled] = useState(false)
  const [uid, setUid] = useState(0)

  const formSubmit = (data) => {
    setDisabled(true)
    console.log(data);
    data.uid = uid
    Taro.request({
      method: 'POST',
      url: Env.apiUrl + 'youji',
      data
    }).then((res) => {
      if (res.statusCode === 200) {
        Taro.showToast({
          title: '发布成功',
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
    <View className="youji-new">
      <Form 
        className="form"
        labelPosition="left"
        onFinish={(values) => formSubmit(values)}
        onFinishFailed={(values) => onFinishFailed(values)}
      >
        <Form.Item
          className="form-item d-block"
          required
          label="上传图片"
          name="images"
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
        <View className="d-flex justify-between p-1">
          <Button disabled={disabled} formType="submit" className="btn-light btn1 m-0">保存</Button>
          <Button disabled={disabled} formType="submit" className="btn-primary btn2 m-0">发布</Button>
        </View>
      </Form>
    </View>
  )
}

export default Index
