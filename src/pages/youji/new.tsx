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
	DatePicker,
} from '@nutui/nutui-react-taro'

function Index() {
  const [disabled, setDisabled] = useState(false)
  const [uid, setUid] = useState(0)
  const uploadUrl = Env.apiUrl + 'media_objects'
  const [defaultFileList, setDefaultFileList] = useState([])
  const [steps, setSteps] = useState([])
  const [imgs, setImgs] = useState([])
  const [pickerVisible, setPickerVisible] = useState(false)
  const [datePickerShow, setDatePickerShow] = useState(false)
  const [pickerIndex, setPickerIndex ] = useState(0)
  const pickerOpts = [
    { value: 0, text: '请选择' },
    { value: 1, text: '1月' },
      { value: 2, text: '2月' },
      { value: 3, text: '3月' },
      { value: 4, text: '4月' },
      { value: 5, text: '5月' },
      { value: 6, text: '6月' },
      { value: 7, text: '7月' },
      { value: 8, text: '8月' },
      { value: 9, text: '9月' },
      { value: 10, text: '10月' },
      { value: 12, text: '11月' },
      { value: 12, text: '12月' },
  ]

  const Step = ({step, index}) => {
    return (
      <View className="step d-flex align-items-center my-4" key={index}>
        <View className="date" onClick={() => setDatePickerShow(!datePickerShow) }>选择日期时间</View>
        <TextArea className="body" autoSize placeholder="输入行程内容..." value={steps[index].body}
          onChange={(e) => stepBodyChange(e, index)}
        />
        <img width="16px" height="16px" src={Env.iconUrl + 'x-circle-fill-blue.svg'} 
          onClick={(e) => rmStep(index)}
        />
      </View>
    )
  }

  const stepBodyChange = (e, index) => {
    console.log('step body changed ', e)
    setSteps(steps.map((step, i) => i === index ? {...step, body: e} : step))
  }

  const addStep = (e) => {
    console.log('add step ')
    // console.log(e)
    setSteps([...steps, {date: new Date(), body: ''}])
  }

  const rmStep = (i) => {
    console.log('rm step ', i)
    setSteps(steps.filter((_, index) => index !== i))
  }

  const dateChange = (options, value, index) => {
    console.log('date change')
    // console.log(options)
    // console.log(value)
    // console.log(index)
  }

  const dateConfirm = (options, value) => {
    console.log(options)
    console.log(value)
  }

  const pickerChange = (options, value) => {
    console.log('picker change')
    // console.log(options)
    // console.log(value)
  }

  const pickerConfirm = (options, value) => {
    console.log(options)
    console.log(value)
    setPickerIndex(value[0])
  }

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

  const uploadSuccess = (e) => {
    console.log(e)
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
          <Uploader name="upload" defaultValue={defaultFileList} url={uploadUrl} multiple maxCount="9" onSuccess={(e) => uploadSuccess(e) } />
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
          title={pickerOpts[pickerIndex].text}
          onClick={() => setPickerVisible(!pickerVisible)}
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

        <View className="steps">
          {steps.map((step, index) => <Step step={step} index={index} />)}
        </View>

        <View className="p-1 add d-flex align-items-center" onClick={(e) => addStep(e)} >
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

      <Picker
        visible={pickerVisible}
        options={pickerOpts}
        onClose={() => setPickerVisible(false)}
        onConfirm={(options, value) => pickerConfirm(options, value)}
        onChange={(options, value) => pickerChange(options, value)}
        title="请选择出行月份"
      /> 
      <DatePicker
        title="选择子行程日期时间"
        startDate={new Date()}
        // endDate={endDate}
        defaultValue={new Date()}
        visible={datePickerShow}
        type="datetime"
        onClose={() => setDatePickerShow(false)}
        onChange={(options, value, index) => dateChange(options, value, index)}
        onConfirm={(options, value) => dateConfirm(options, value)}
      />
    </View>
  )
}

export default Index
