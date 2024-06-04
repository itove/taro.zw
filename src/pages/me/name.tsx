import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Right } from '@nutui/icons-react-taro'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import {
  Cell,
  Form,
  Picker,
	Uploader,
  Button,
  InputNumber,
  Input,
  TextArea
} from '@nutui/nutui-react-taro'

function Index() {
  const [user, setUser] = useState({})
  let uid: int

  useEffect(() => {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      uid = res.data.id

      // fetch data
      Taro.request({
        url: Env.apiUrl + 'users/' + uid
      })
      .then(res => {
        console.log(res)
        setUser(res.data)
      })
    })

  }, [])

  const formSubmit = v => {
    Taro.request({
      method: 'PATCH',
      data: v,
      url: Env.apiUrl + 'users/' + user.id,
      header: {
        'content-type': 'application/merge-patch+json'
      }
    }).then((res) =>{
      if (res.statusCode === 200) {
        Taro.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000,
          success: () => {
            setTimeout(
              () => {
                Taro.reLaunch({url: '/pages/me/index'})
              }, 500
            )
          }
        })
      }
    })
  }

  const handleChange = e => {
    console.log(e)
  }

  return (
    <View className="">
      <Form
        divider
        onFinish={(values) => formSubmit(values)}
        footer={
          <>
            <Button formType="submit" block type="primary">
              确定
            </Button>
          </>
        }
      >
        <Form.Item
          name="name"
          initialValue={user.name}
          className="err-on-right"
          rules={[
            { max: 25, message: '标题不能超过25个字' },
            { required: true, message: '请输入姓名' },
          ]}
        >
          <Input
            className="nut-input-text"
            placeholder="请输入姓名"
            align="left"
            type="nickname"
            onBlur={handleChange}
          />
        </Form.Item>
      </Form>
    </View>
  )
}

export default Index
