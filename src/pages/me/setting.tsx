import React from 'react'
import { View } from '@tarojs/components'
import { Button } from "@nutui/nutui-react-taro"
import './index.scss'

function Index() {
  return (
    <View className="nutui-react-demo">
      <View className="index">
        me setting
      </View>
      <View className="index">
        <Button type="primary" className="btn">
          NutUI React Button
        </Button>
      </View>
    </View>
  )
}

export default Index
