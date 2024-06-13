import React, { useState, useEffect } from 'react'
import { View, WebView, Map } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Popup } from '@nutui/nutui-react-taro'


function Index() {
  const [showPop, setShowPop] = useState(false)

  // const query = wx.createSelectorQuery()
  // const mapContext = Taro.createMapContext(query.select('.map'))
  // const [map, setMap] = useState(mapContext)
  // console.log(mapContext)

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
  const row = 2
  const col = 1
  const latPer = (ne[0] - sw[0]) / col
  const longPer = (ne[1] - sw[1]) / row

  for (let i = 0; i < col; i++) {
    const lat0 = ne[0] - latPer * i
    const lat1 = ne[0] - latPer * (i + 1)
    let long0
    let long1
    for (let j = 0; j < row; j++) {
      long0 = sw[1] + longPer * (j + 1)
      long1 = sw[1] + longPer * j
      const northeast = {
        latitude: lat0,
        longitude: long0
      }
      const southwest = {
        latitude: lat1,
        longitude: long1
      }
      const bounds = {
        northeast,
        southwest,
      }

      const index = col * i + j

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

  /**
  // test
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

  const markers1 = [
    {
      id: 5,
      latitude: ne[0],
      longitude: ne[1],
      width: 16,
      height: 24
    },
    {
      id: 6,
      latitude: sw[0],
      longitude: sw[1],
      width: 16,
      height: 24
    },
  ]

  mapContext.addMarkers({
    markers: markers1,
  }) 
  .then(res => {
    console.log('markers added')
  })
  .catch(err => {
    console.log(err)
  })

  const src = Env.imageUrl + 'deb/o_' + 0 + '.jpg'
  // const src = Env.imageUrl + 'deb/deb.jpg'
  const o = {
    id: 2,
    src,
    opacity,
    zIndex,
    bounds,
  }
  console.log(o)

  mapContext.addGroundOverlay(o)
  // end test
  //
  // test 1
  const northeast1 = {
    latitude: ne1[0],
    longitude: ne1[1]
  }
  const southwest1 = {
    latitude: sw1[0],
    longitude: sw1[1]
  }
  const bounds1 = {
    northeast: northeast1,
    southwest: southwest1,
  }

  const markers2 = [
    {
      id: 5,
      latitude: ne1[0],
      longitude: ne1[1],
      width: 16,
      height: 24
    },
    {
      id: 6,
      latitude: sw1[0],
      longitude: sw1[1],
      width: 16,
      height: 24
    },
  ]

  mapContext.addMarkers({
    markers: markers2,
  }) 
  .then(res => {
    console.log('markers added')
  })
  .catch(err => {
    console.log(err)
  })

  const src1 = Env.imageUrl + 'deb/o_' + 1 + '.jpg'
  // const src = Env.imageUrl + 'deb/deb.jpg'
  const o1 = {
    id: 5,
    src: src1,
    opacity,
    zIndex,
    bounds: bounds1,
  }
  console.log(o1)

  mapContext.addGroundOverlay(o1)
  // end test1
  */

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
