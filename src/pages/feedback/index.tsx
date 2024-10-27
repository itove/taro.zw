import React, { useState, useEffect } from 'react'
import { View, Button } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { useDidShow } from '@tarojs/taro'
import { Env } from '../../env'
import { fmtDate } from '../../utils/fmtDate'

function Index() {
  const [list, setList] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [user, setUser] = useState({})

  useDidShow(() => {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      console.log(res.data)
      setUser(res.data)
      Taro.request({
        url: Env.apiUrl + 'feedback?uid=' + res.data.id
      })
      .then(res => {
        console.log(res.data)
        setList(res.data)
      })
    })
    .catch(err => {
      console.log(err)
      Taro.redirectTo({url: '/pages/me/login'})
    })
  }, [])

  const Feedback = ({feedback, index}) => {
    return (
      <View className="item">
        <View className="top d-flex justify-between mb-16 align-items-center">
          <View className="left d-flex align-items-center">
            <img className="avatar me-10" width="24px" height="24px" src={Env.imageUrl + user.avatar} />
            <View className="name me-8"> {user.name}的建议</View>
            <View className="status tag tag-b">处理中</View>
          </View>
          <View className="right">{fmtDate(new Date(feedback.createdAt), 2)}</View>
        </View>
        <View className="text d-flex mb-16">
          <View className="text-title">问题建议</View>
          <View className="text-body ellipsis-2">{feedback.title}</View>
        </View>
        <View className="text d-flex">
          <View className="text-title">详细描述</View>
          <View className="text-body ellipsis-4">{feedback.body}</View>
        </View>
      </View>
    )
  }

  return (
    <View className="feedback-index">
      {list.map((feedback, index) => <Feedback feedback={feedback} index={index} />)}

      <View className="footer fixed">
          <Button className="w-100 btn-primary btn-rounded" onClick={() => Taro.navigateTo({url: 'new'}) }>提交反馈</Button>
      </View>
    </View>
  )
}

export default Index
