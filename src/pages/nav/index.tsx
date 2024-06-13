import React, { useState, useEffect } from 'react'
import { View, WebView, Map } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Popup } from '@nutui/nutui-react-taro'


function Index() {
  const [showPop, setShowPop] = useState(false)
  const url = 'https://map.vjingkeji.com/%E6%B1%9F%E8%A5%BF%E9%BE%99%E5%8D%97'
  const url0 = Env.baseUrl + 'map'

  // const query = wx.createSelectorQuery()
  // const mapContext = Taro.createMapContext(query.select('.map'))
  // const [map, setMap] = useState(mapContext)
  // console.log(mapContext)

  const center = [32.499823, 110.83360]

  const bounds0 = [32.500799, 110.83360]
  const bounds1 = [32.499123, 110.83230]

  const markers = [
    {
      id: 0,
      latitude: bounds0[0],
      longitude: bounds0[1],
      width: 16,
      height: 24
    },
    {
      id: 0,
      latitude: bounds1[0],
      longitude: bounds1[1],
      width: 16,
      height: 24
    }
  ]

  const mapContext = Taro.createMapContext('map')

  mapContext.addMarkers({
    markers: markers,
    // success(){
    //   console.log('ok')
    // },
    // fail(err){
    //   console.log(err)
    // },
    // complete(){
    //   console.log('complete')
    // }
  }) 
  .then(res => {
    console.log('markers added')
  })
  .catch(err => {
    console.log(err)
  })

  const opacity = 1
  const zIndex = 1
  const row = 4
  const col = 4
  const latPer = (bounds0[0] - bounds1[0]) / col
  const longPer = (bounds0[1] - bounds1[1]) / row

  for (let i = 0; i < col; i++) {
    const lat0 = bounds0[0] - latPer * i
    const lat1 = bounds0[0] - latPer * (i + 1)
    let long0
    let long1
    for (let j = 0; j < row; j++) {
      long0 = bounds1[1] + longPer * (j + 1)
      long1 = bounds1[1] + longPer * j
      const northeast = {
        latitude: lat0,
        longitude: long0
      }
      const southwest = {
        latitude: lat1,
        longitude: long0
      }
      const bounds = {
        northeast,
        southwest,
      }

      const index = col * i + j
      console.log(bounds)
      console.log(index)

      const markers = [
        {
          id: index,
          latitude: lat0,
          longitude: long0,
          width: 16,
          height: 24
        },
        {
          id: index,
          latitude: lat1,
          longitude: long1,
          width: 16,
          height: 24
        },
      ]

      mapContext.addMarkers({
        markers: markers,
      }) 
      .then(res => {
        console.log('markers added')
      })
      .catch(err => {
        console.log(err)
      })

      // const src = Env.imageUrl + 'deb/o_' + index + '.jpg'
      const src = Env.imageUrl + 'deb/deb.jpg'
      const o = {
        id: index,
        src,
        opacity,
        zIndex,
        bounds,
      }

      mapContext.addGroundOverlay(o)
      .then(res => {
        console.log('groundOverlay added')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }


  useEffect(() => {
  }, [])

  const onTap = (e) => {
    console.log(e.detail.latitude)
    console.log(e.detail.longitude)
  }

  const onMarkerTap = (e) => {
    console.log(e.detail.markerId)
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

      <Map
        id="map"
        className="map"
        latitude={center[0]}
        longitude={center[1]}
        onMarkerTap={onMarkerTap}
        onClick={onTap}
        // markers={markers}
      />
    </View>
  )
}

export default Index
