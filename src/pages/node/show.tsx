import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import './show.scss'
import Taro from '@tarojs/taro'
import Image1 from '../../images/image1.png'
import Hotline from '../../icons/hotline.png'
import Location from '../../icons/location.png'

function Index() {
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '详情'
    })
    // console.log(nodeList)
    // Taro.getStorage({
    //   key: Env.storageKey
    // })
    // .then(res => {
    //   console.log('logged in')
    //   setUser(res.data)
    //   getNodes(res.data.id)
    // })
    // .catch(err => {
    //   console.log(err)
    //   setNodeList([])
    //   // Taro.redirectTo({url: '/pages/me/login'})
    // })
  }, [])

  const node = {
    title: '云上牡丹园',
    tags: [
      '品种齐全',
      '拍照打卡',
    ],
    summary: '目前整个园区牡丹栽植面积达到80余亩，近年来牡丹园又多次...',
    address: '湖北省十堰市茅箭区茅塔乡东沟村一组湖北省十堰市茅箭区茅塔乡东沟村一组',
  }

  const tags = []

  node.tags.map((i, index) => {
    tags.push(
      <View key={index}>{i}</View>
    )
  })

  return (
    <View className="show">
      <Image className="w-100" src={Image1} mode="widthFix" />

      <View className="p-1 card">

        <View className="header">
          <View className="">
            <View className="title">{node.title}</View>
            <View className="tags">{tags}</View>
          </View>
          <View className="right">
            <View className="icon">
              <img
                src={Hotline}
              />
              </View>
            <View className="">语音讲解</View>
          </View>
        </View>

        <View className="summary">{node.summary}</View>
        <View className="address">
          <View className="text">{node.address}</View>
          <View className="right">
            <View className="icon">
              <img
                src={Location}
              />
            </View>
            <View className="">地图导航</View>
          </View>
        </View>
      </View>

      <View className="p-1 card-1">
        <View className="title"> 景点介绍 </View>
      </View>
      <View className="body p-1"></View>
    </View>
  )
}

export default Index
