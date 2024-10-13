import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'

function gotoNode(id, type = 3) {
  Taro.navigateTo({url: '/pages/node/show?type=' + type + '&id=' + id})
}

function ListItem({node, type, index}) {
  return (
    <View className="card">
      <View className="widget">
        <View className="badge">活动日期：2024/09/30 - 2024/10/30</View>
      </View>

      <Image
      className="w-100 img"
      mode="aspectFill"
      onClick={() => gotoNode(node.id, type)}
      src={Env.imageUrl + node.image}
      alt=""
      />
    <View className="text">
      <View className="title">
        <View className="left d-flex">
          {node.title}
          <View className="badge ms-5">进行中</View>
        </View>
        <View className="right">12.4km</View>
      </View>
      <View className="info">
        <View className="">主办方：十堰市某单位</View>
        <View className="">活动地点：活动地点</View>
      </View>
    </View>
    </View>
  )
}

function Index() {
  const [list, setList] = useState([])

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'wx/home'
    })
    .then(res => {
      const data = res.data
      console.log(res)

      setList(data.jing.map((node, index) => <ListItem node={node} type={0} index={index} />))
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <View className="card-list">
      <View className="list">
        {list} 
      </View>
    </View>
  )
}

export default Index
