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
  Picker,
  Cell,
  Uploader,
} from '@nutui/nutui-react-taro'

function Index() {
  const [disabled, setDisabled] = useState(false)
  const [uid, setUid] = useState(0)
  const uploadUrl = 'https://my-json-server.typicode.com/linrufeng/demo/posts'
  const [defaultFileList, setDefaultFileList] = useState([])
  const [steps, setSteps] = useState([])

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
            { required: true, message: '请上传图片' },
          ]}
        >
          <Uploader defaultValue={defaultFileList} url={uploadUrl} multiple maxCount="9" />
        </Form.Item>

        <Form.Item
          className="form-item my-4"
          required
          label="标题"
          name="title"
          rules={[
            { min: 2, message: '不能少于2个字' },
            { max: 25, message: '不能超过50个字' },
            { required: true, message: '请输入标题' },
          ]}
        >
          <Input placeholder="请输入2-25字标题" type="text" />
        </Form.Item>

        <Form.Item
          className="form-item"
          label="出行月份"
          name="month"
        >
          <Cell
					align="center"
          title={ <Picker title="请选择" /> }
          extra={<img width="16px" height="16px" src={Env.iconUrl + 'arrow-right.png'} className="icon" />}
          />
        </Form.Item>

        <Form.Item
          className="form-item"
          label="行程天数"
          name="days"
        >
          <Cell
					align="center"
          title={ <Input placeholder="请输入" type="number" /> }
          extra="天"
          />
        </Form.Item>

        <Form.Item
          className="form-item"
          label="人均花费"
          name="cost"
        >
          <Cell
					align="center"
          title={ <Input placeholder="请输入" type="number" /> }
          extra="元"
          />
        </Form.Item>

        <Form.Item
          className="form-item"
          label="和谁出行"
          name="who"
        >
          <Input placeholder="请输入" type="text" />
        </Form.Item>

        <View className="p-1 label">行程单</View>

        <Form.Item
          className="form-item"
          label="总览"
          name="summary"
        >
          <Input placeholder="请输入总行程概览" type="text" />
        </Form.Item>

        <View>
          <Picker title="选择日期" />
          <Picker title="选择时间" />
          <Input placeholder="输入行程内容..." />
        </View>

        <View className="p-1 add d-flex align-items-center">
          <img width="16px" height="16px" src={Env.iconUrl + 'plus-circle-blue.svg'} className="me-8" />
          添加子行程
        </View>

        <Form.Item
          className="form-item my-4 d-block"
          label="详情"
          name="body"
        >
          <TextArea
            placeholder="请输入攻略详情..."
            showCount
            maxLength={5000}
            onChange={(value) => console.log('change', value)}
            onBlur={() => console.log('blur')}
            onFocus={() => console.log('focus')}
          />
        </Form.Item>

        <View className="d-flex justify-between p-1 btns mt-16">
          <Button disabled={disabled} formType="submit" className="btn-light btn1 m-0">保存</Button>
          <Button disabled={disabled} formType="submit" className="btn-primary btn2 m-0">发布</Button>
        </View>
      </Form>
    </View>
  )
}

export default Index
