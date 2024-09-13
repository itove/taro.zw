import React, { useState, useEffect } from 'react'
import { View, Image, Button } from '@tarojs/components'
import './show.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Tabs, ImagePreview } from '@nutui/nutui-react-taro'
import { fmtSeconds } from '../../utils/fmtSeconds'

Taro.options.html.transformElement = (el) => {
  if (el.nodeName === 'image') {
    el.setAttribute('mode', 'widthFix')
    el.setAttribute('src', Env.baseUrl + el.getAttribute('src'))
  }
  return el
}

function Index() {
  const [node, setNode] = useState({})
  const [rooms, setRooms] = useState([])
  const [uid, setUid] = useState(0)
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [isFav, setIsFav] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const [logged, setLogged] = useState(false)

  const instance = Taro.getCurrentInstance();
  const id = instance.router.params.id
  // 0: you // 1: zhu // 2: chi & normal node // 3: gou // 4: 走进东沟 // 5: index list & show normal
  const type = instance.router.params.type ? instance.router.params.type : 2
  const innerAudioContext = Taro.createInnerAudioContext()
  const [audio, setAudio] = useState(innerAudioContext)
  const [playIcon, setPlayIcon] = useState(Env.iconUrl + 'hotline.png')
  const [progress, setProgress] = useState('语音讲解')

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

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

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'nodes/' + id
    })
    .then(res => {
      const n = res.data
      setNode(n)
      console.log(n)
      if (n.body) {
        setBody(n.body.replace(/&nbsp;/g, '<br/>'))
      }

      n.tags = ['免费入园', '度假区', '3A景区']

      Taro.setNavigationBarTitle({
        title: n.title
      })

      setTags(n.tags.map((i, index) => <View className="tag" key={index}>{i}</View> ))

      setRooms(n.children.map((child, index) => <RoomView key={index} room={child} node={n}/>))

      innerAudioContext.src = Env.imageUrl + n.audio
    })
  }, [])


  const playAudio = () => {
      console.log(audio.src)
      if (audio.paused) {
        audio.play()
        console.log('playing...')
      } else {
        audio.pause()
        console.log('paused...')
      }
  }

  useEffect(() => {
    return () => {
      audio.destroy()
    }
  }, []);

  useEffect(() => {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      setLogged(true)
      setUid(res.data.id)
      Taro.request({
        url: Env.apiUrl + 'isfav?uid=' + res.data.id + '&nid=' + id
      })
      .then(res => {
        console.log(res.data)
        setIsFav(res.data.isFav)
      })
    })
    .catch(err => {
      console.log(err)
      // Taro.redirectTo({url: '/pages/me/login'})
    })
  }, [])

  const RoomView = ({room, index, node}) => {
    const previews = []
    room.images.map((i) => previews.push({src: Env.imageUrl + i}))
    return (
      <View key={index} className="list">
        <View className="img">
          <Image className="w-100" mode="scaleToFill" src={Env.imageUrl + room.images[0]} onClick={() => preview(previews)} />
          <View className="count">
            <img src={Env.iconUrl + 'image.png'} />
            {room.images.length}
          </View>
        </View>
        <View className="info">
          <View className="title">
          {room.title}
          </View>
          <View className="summary">
          {room.summary}
          </View>
          <View className="tags">
          {
            room.tags.map((t, ind) => (ind < 3 && <View key={ind}>{t}</View>))
          }
          </View>
        </View>
        <View className="reserve">
        <Button className='btn-primary' size="mini" onClick={() => preview([{src: Env.imageUrl + node.qr}])}>预定</Button>
        </View>
      </View>
    )
  }

  const makeCall = (num = node.phone) => {
    Taro.makePhoneCall({phoneNumber: num})
  }

  const openLocation = () => {
    let latitude = 32.499823
    let longitude = 110.8336
    if (node.latitude && node.longitude) {
      latitude = node.latitude
      longitude = node.longitude
    }
    Taro.openLocation({
      latitude,
      longitude,
      scale: 18
    })
  }

  const toggleFav = () => {
    if (!logged) {
      Taro.navigateTo({ url: '/pages/me/login' })
      return
    }
    let url = 'fav/add'
    const data = {
      uid: uid,
      nid: id,
    }
    if (isFav) {
      url = 'fav/remove'
      setIsFav(false)
    } else {
      setIsFav(true)
    }
    Taro.request({
      method: 'POST',
      url: Env.apiUrl + url,
      data
    }).then((res) => {
      setIsFav(res.data.isFav)
    })
  }

  const preview = (images) => {
    setPreviewImages(images)
    setShowPreview(true)
  }

  const [tab1value, setTab1value] = useState<string | number>('0')

  return (
    <View className="show">
      <Image className="w-100 hero" src={Env.imageUrl + node.image} mode="aspectFill" />

      <View className="p-1 card">

        <View className="header">
          <View className="">
            { (type == 0 || type == 1) &&
            <View className="tags">{tags}</View>
            }
            <View className="title article-title mt-1">{node.title}</View>
          </View>
        </View>
      </View>

      { type == 0 &&
      <Tabs
        value={tab1value}
        autoHeight={true}
        onChange={(value) => {
          setTab1value(value)
        }}
        className="rooms"
      >
        <Tabs.TabPane title="景区简介">
          <View>
            <View dangerouslySetInnerHTML={{__html: body}} className='body'></View>
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane title="游客点评">
          <View dangerouslySetInnerHTML={{__html: body}} className='body'></View>
        </Tabs.TabPane>
        <Tabs.TabPane title="门票预定">
          <View dangerouslySetInnerHTML={{__html: body}} className='body'></View>
        </Tabs.TabPane>
      </Tabs>
      }

      { type == 3 &&
      <View className="footer fixed">
        <View className="left">
          <View className="" onClick={() => Taro.switchTab({url: '/pages/index/index'})}>
            <img src={Env.iconUrl + 'house.png'} />
            <View>主页</View>
          </View>
          <View className="fav d-none" onClick={toggleFav}>
            <img src={Env.iconUrl + (isFav && 'star.png' || 'star.png')} />
            <View>{ isFav && '已收藏' || '收藏'}</View>
          </View>
        </View>
        <View className="right">
          <Button className="w-100 btn-primary btn-rounded" onClick={() => preview([{src: Env.imageUrl + node.qr}])}>立即购买</Button>
        </View>
      </View>
      }

      <ImagePreview
        // autoPlay
        // visible={true}
        images={previewImages}
        visible={showPreview}
        showMenuByLongpress={true}
        onClose={() => setShowPreview(false)}
      />

    </View>
  )
}

export default Index
