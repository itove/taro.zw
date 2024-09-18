import React from 'react'
import { View, Image } from '@tarojs/components'
import { Button } from "@nutui/nutui-react-taro"
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'

function Index() {
  return (
    <View className="fuwu">
      <Image className="w-100 ditu" src={Env.imageUrl + 'ditu.jpg'} mode="heightFix" />
    </View>
  )
}

export default Index
