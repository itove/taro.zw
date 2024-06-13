import React, { useState, useEffect } from 'react'
import { View, WebView, Map } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Popup } from '@nutui/nutui-react-taro'


function Index() {
  const [showPop, setShowPop] = useState(false)

  const center = [32.497362991555164, 110.84169432860472]

  const ne = [32.502324044478755, 110.85202774943821]
  const sw = [32.49135119861189, 110.83205731962198]

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

  /*
  // whole one
  const src = Env.imageUrl + 'map/map.donggou.1.png'
  const northeast = {
    latitude: ne[0],
    longitude: ne[1] 
  }
  const southwest = {
    latitude: sw[0],
    longitude: sw[1]
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
  const latPer = (ne[0] - sw[0]) / row
  const longPer = (ne[1] - sw[1]) / col

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
  }

  return (
    <View className="">
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
