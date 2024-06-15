import React, { useState, useEffect } from 'react'
import { View, Map } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { fmtSeconds } from '../../utils/fmtSeconds'

function Index() {
  const [display, setDisplay] = useState('none')
  const [progress, setProgress] = useState('语音讲解')
  const [distance, setDistance] = useState(0)
  const [nodes, setNodes] = useState([])
  const [node, setNode] = useState({title: '', summary: '', audio: ''})
  const innerAudioContext = Taro.createInnerAudioContext()
  const [audio, setAudio] = useState(innerAudioContext)
  const [playIcon, setPlayIcon] = useState(Env.iconUrl + 'hotline.png')

  audio.onPlay(() => {
    setPlayIcon(Env.iconUrl + 'hotline-primary.png')
  })
  audio.onStop(() => {
    setPlayIcon(Env.iconUrl + 'hotline.png')
  })
  audio.onPause(() => {
    setPlayIcon(Env.iconUrl + 'hotline.png')
  })
  audio.onEnded(() => {
    setPlayIcon(Env.iconUrl + 'hotline.png')
    setProgress('语音讲解')
  })
  audio.onCanplay(() => {
  })
  audio.onTimeUpdate(() => {
    setProgress(fmtSeconds(audio.duration - audio.currentTime))
  })
  audio.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
  })

  const center = { lat: 32.497362991555164, long: 110.84169432860472 }

  const ne = { lat: 32.50916729, long: 110.86286523 }
  const sw = { lat: 32.48679658, long: 110.82360543 }
  const opacity = 1
  const zIndex = 1
  const row = 8
  const col = 8
  const latPer = (ne.lat - sw.lat) / row
  const longPer = (ne.long - sw.long) / col
  const markerWidth = 16
  const markerHeight = 24

  const markers = [
    {
      id: 0,
      latitude: ne.lat,
      longitude: ne.long,
      width: markerWidth,
      height: markerHeight
    },
    {
      id: 0,
      latitude: sw.lat,
      longitude: sw.long,
      width: markerWidth,
      height: markerHeight
    }
  ]

  const mapContext = Taro.createMapContext('map')

  useEffect(() => {
    return () => {
      audio.destroy()
      innerAudioContext.destroy()
    }
  }, []);

  useEffect(() => {
    const markers = []
    Taro.request({
      url: Env.apiUrl + 'map/markers'
    })
    .then(res => {
      const nodes = res.data
      console.log(nodes)
      setNodes(nodes)
      nodes.map((n, index) => {
        markers.push({
          id: index,
          latitude: n.latitude,
          longitude: n.longitude,
          width: markerWidth,
          height: markerHeight,
        })
      })

      mapContext.addMarkers({
        markers: markers,
      }) 
      .then(res => {
        console.log('markers added')
      })
      .catch(err => {
        console.log(err)
      })
    })


    /*
    // whole one
    const src = Env.imageUrl + 'map/map.png'
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
    // whole one end
    */

    // small ones
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

        // add markers for every ne & sw
        // const markers = [
        //   {
        //     id: index,
        //     latitude: neLat,
        //     longitude: neLong,
        //     width: markerWidth,
        //     height: markerHeight
        //   },
        //   {
        //     id: index,
        //     latitude: swLat,
        //     longitude: swLong,
        //     width: markerWidth,
        //     height: markerHeight
        //   },
        // ]

        // mapContext.addMarkers({
        //   markers: markers,
        // }) 
        // .then(res => {
        //   console.log('markers added')
        // })
        // .catch(err => {
        //   console.log(err)
        // })

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
  // small ones end
  }, [])

  const onTap = (e) => {
    console.log(e.detail.latitude)
    console.log(e.detail.longitude)
    audio.destroy()
    setPlayIcon(Env.iconUrl + 'hotline.png')
    setDisplay('none')
    setProgress('语音讲解')
  }

  const onMarkerTap = (e) => {
    console.log(e.detail.markerId)
    const id = e.detail.markerId
    const title = '景点 ' + e.detail.markerId
    setNode(nodes[id])
    setDisplay('block')
    audio.destroy()
    setPlayIcon(Env.iconUrl + 'hotline.png')
    innerAudioContext.src = Env.imageUrl + nodes[id].audio
    setAudio(innerAudioContext)
    setProgress('语音讲解')
  }

  const openLocation = (latitude, longitude) => {
    Taro.openLocation({
      latitude,
      longitude,
      scale: 15
    })
  }

  const playAudio = (src) => {
      console.log(innerAudioContext.src)
      console.log(audio.src)
      console.log(audio)
      if (audio.paused) {
        audio.play()
        console.log('playing...')
      } else {
        audio.pause()
        console.log('paused...')
      }
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
        max-scale={17}
        min-scale={11}
        onTap={onTap}
        // onClick={onTap}
        // markers={markers}
      />

      <View className="pop">
      <View
        className="wrapper"
        style={{display: display}}
      >
        <View className="card rounded p-1">

          <View className="body">
            <View className="left">
            <View className="title pb-8">{node.title}</View>
              <View className="pb-8">距您{distance}公里 </View>
              <View className="ellipsis-2">{node.summary}</View>
            </View>
            { node.audio &&
            <View className="right" onClick={() => playAudio(Env.imageUrl + node.audio)}>
              <View>
                <img className="icon" src={playIcon} />
                <View className="text">{ progress }</View>
              </View>
              <View className="small" onClick={() => openLocation(node.latitude, node.longitude) }>
                <img className="icon" src={Env.iconUrl + 'nav.png'} /> 前往
              </View>
            </View>
            }
          </View>

            { false &&
          <View className="footer pt-16">
            <View className="small">
              <img className="icon" src={Env.iconUrl + 'share.png'} /> 分享
            </View>
            <View className="small">
              <img className="icon" src={Env.iconUrl + 'star.png'} /> 收藏
            </View>
            <View className="small" onClick={() => openLocation(node.latitude, node.longitude) }>
              <img className="icon" src={Env.iconUrl + 'nav.png'} /> 前往
            </View>
          </View>
            }
        </View>

      </View>
      </View>
    </View>
  )
}

export default Index
