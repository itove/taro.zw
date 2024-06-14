import React, { useState, useEffect } from 'react'
import { View, Map } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Popup } from '@nutui/nutui-react-taro'


function Index() {
  const [showPop, setShowPop] = useState(false)

  const center = { lat: 32.497362991555164, long: 110.84169432860472 }

  const ne = { lat: 32.50916729, long: 110.86286523 }
  const sw = { lat: 32.48679658, long: 110.82360543 }

  const markers = [
    {
      id: 0,
      latitude: ne.lat,
      longitude: ne.long,
      width: 16,
      height: 24
    },
    {
      id: 0,
      latitude: sw.lat,
      longitude: sw.long,
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

  /*
  // whole one
  const src = Env.imageUrl + 'map/map.donggou.1.png'
  const northeast = {
    latitude: ne.lat,
    longitude: ne.long, 
  }
  const southwest = {
    latitude: sw.lat,
    longitude: sw.long,
  }
  const bounds = {
    northeast,
    southwest,
  }
  const o = {
    id: 1,
    src,
    opacity,
    zIndex,
    bounds,
  }
  // console.log(o)
  // console.log(index)

  mapContext.addGroundOverlay(o)
  .then(res => {
    console.log('groundOverlay added')
  })
  .catch(err => {
    console.log(err)
  })
  */

  // small ones
  const row = 4
  const col = 4
  const latPer = (ne.lat - sw.lat) / row
  const longPer = (ne.long - sw.long) / col

  for (let i = 0; i < col; i++) {
    const neLat = ne.lat - latPer * i
    const swLat = ne.lat - latPer * (i + 1)
    let neLong
    let swLong
    for (let j = 0; j < row; j++) {
      neLong = sw.long + longPer * (j + 1)
      swLong = sw.long + longPer * j
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

      const src = Env.imageUrl + 'map/' + index + '.png'
      const o = {
        id: index,
        src,
        opacity,
        zIndex,
        bounds,
      }
      // console.log(o)
      // console.log(index)

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
    setShowPop(true)
  }

  return (
    <View className="">
      <Map
        id="map"
        className="map"
        latitude={center.lat}
        longitude={center.long}
        onMarkerTap={onMarkerTap}
        scale={15} // 3-20
        onClick={onTap}
        // markers={markers}
      />

      <Popup
        className="pop"
        visible={showPop}
        overlay={false}
				// position="bottom"
        onClose={() => {
          setShowPop(false)
        }}
      >
        <View className="card rounded p-1">
          <View className="title pb-8">标题 </View>

          <View className="body">
            <View className="left">
              <View className="pb-8">距离 </View>
              <View className="ellipsis-2">概述 </View>
            </View>
            <View className="right">
              <img className="icon" src={Env.iconUrl + 'hotline-primary.png'} />
              <View className="text">语音讲解 </View>
            </View>
          </View>

          <View className="footer pt-16">
            <View className="">
              <img className="icon" src={Env.iconUrl + 'share.png'} /> 分享
            </View>
            <View className="">
              <img className="icon" src={Env.iconUrl + 'star.png'} /> 收藏
            </View>
            <View className="">
              <img className="icon" src={Env.iconUrl + 'nav.png'} /> 前往
            </View>
          </View>
        </View>

      </Popup>
    </View>
  )
}

export default Index
