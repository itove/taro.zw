import React, { useState, useEffect } from 'react'
import { View, Map } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'


function Index() {
  useEffect(() => {
    // const mapCtx = Taro.createMapContext('map')
    // mapCtx.addCustomLayer('6662cf796168')
  }, [])

  return (
    <View className="">
      <View className="top">
        <View className="icon">
          <img src={Env.iconUrl + 'search.png'} />
        </View>
        <View className="item active"> 景点 </View>
        <View className="item"> 卫生间 </View>
        <View className="item"> 出入口 </View>
        <View className="item"> 服务点 </View>
        <View className="icon">
          <img src={Env.iconUrl + 'gird.png'} />
        </View>
      </View>

      <Map id="map"
      latitude="32.499823"
      longitude="110.8336"

      />
    </View>
  )
}

export default Index
