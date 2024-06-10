import React, { useState, useEffect } from 'react'
import { View, Map } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Popup } from '@nutui/nutui-react-taro'


function Index() {
  const [showPop, setShowPop] = useState(false)

  useEffect(() => {
    // const mapCtx = Taro.createMapContext('map')
    // mapCtx.addCustomLayer('6662cf796168')
  }, [])

  const markers = [
    {
      id: 0,
      latitude: 32.499823,
      longitude: 110.8336,
      width: 16,
      height: 24,
    }
  ]

  const test = (e) => {
    console.log('click marker')
    console.log(e)
    setShowPop(true)
  }

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

      <View className="map-wrapper">
        <Map
        className="map"
        id="map"
        latitude="32.499823"
        longitude="110.8336"
        markers={markers}
        onMarkerTap={test}
        />
      </View>

      <Popup
        visible={showPop}
        // style={{ padding: '30px 50px' }}
        onClose={() => { setShowPop(false) }}
        position="bottom"
        overlay={false}
        lockScroll
      >
        <View className="popup">
        </View>
      </Popup>
    </View>
  )
}

export default Index
