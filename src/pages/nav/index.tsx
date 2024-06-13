import React, { useState, useEffect } from 'react'
import { View, WebView, Map } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Popup } from '@nutui/nutui-react-taro'


function Index() {
  const [showPop, setShowPop] = useState(false)

  const center = [32.499823, 110.83360]

  const ne = [32.500799, 110.83360]
  const sw = [32.499123, 110.83230]

  const ne1 = [32.500799, 110.83621]
  const sw1 = [32.499123, 110.83530]

  const markers = [
    {
      id: 0,
      latitude: ne[0],
      longitude: ne[1],
      width: 16,
      height: 24
    },
    {
      id: 0,
      latitude: sw[0],
      longitude: sw[1],
      width: 16,
      height: 24
    }
  ]

  const mapContext = Taro.createMapContext('map')

  mapContext.addMarkers({
    markers: markers,
  }) 
  .then(res => {
    console.log('markers added')
  })
  .catch(err => {
    console.log(err)
  })

  const opacity = 1
  const zIndex = 1
  const row = 2
  const col = 1
  const latPer = (ne[0] - sw[0]) / col
  const longPer = (ne[1] - sw[1]) / row

  for (let i = 0; i < col; i++) {
    const neLat = ne[0] - latPer * i
    const swLat = ne[0] - latPer * (i + 1)
    let neLong
    let swLong
    for (let j = 0; j < row; j++) {
      neLong = sw[1] + longPer * (j + 1)
      swLong = sw[1] + longPer * j
      const northeast = {
        latitude: neLat,
        longitude: neLong
      }
      const southwest = {
        latitude: swLat,
        longitude: swLong
      }
      const bounds = {
        northeast,
        southwest,
      }

      const index = col * i + j

      const markers = [
        {
          id: index,
          latitude: neLat,
          longitude: neLong,
          width: 16,
          height: 24
        },
        {
          id: index,
          latitude: swLat,
          longitude: swLong,
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

      const src = Env.imageUrl + 'deb/o_' + index + '.jpg'
      // const src = Env.imageUrl + 'deb/deb.jpg'
      const o = {
        id: index,
        src,
        opacity,
        zIndex,
        bounds,
      }
      console.log(o)
      console.log(index)

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
