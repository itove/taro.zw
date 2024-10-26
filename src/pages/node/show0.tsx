import React, { useState, useEffect } from 'react'
import { View, Image, Input, Button } from '@tarojs/components'
import './show.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Tabs, Rate, ImagePreview } from '@nutui/nutui-react-taro'
import { fmtSeconds } from '../../utils/fmtSeconds'
import { fmtDate } from '../../utils/fmtDate'

Taro.options.html.transformElement = (el) => {
  if (el.nodeName === 'image') {
    el.setAttribute('mode', 'widthFix')
    el.setAttribute('src', Env.baseUrl + el.getAttribute('src'))
  }
  return el
}

function openLocation(latitude, longitude) {
  Taro.openLocation({
    latitude,
    longitude,
    scale: 15
  })
}

function Index() {
  const [node, setNode] = useState({rates: {rate: 0, users: []}, tags: []})
  const [rooms, setRooms] = useState([])
  const [uid, setUid] = useState(0)
  const [body, setBody] = useState('')
  const [comment, setComment] = useState('')
  const [tags, setTags] = useState([])
  const [isFav, setIsFav] = useState(false)
  const [favs, setFavs] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const [logged, setLogged] = useState(false)
  const [commentList, setCommentList] = useState([])
  const [commentCount, setCommentCount] = useState(0)
  const [rateCount, setRateCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  const instance = Taro.getCurrentInstance();
  const id = instance.router.params.id
  const nid = instance.router.params.id
  // 0: all // 1: jing // 2: zhu // 3: shi // 4: dong // 5: wen // 6: yi // 7: gou // 8: wan
  // index list & show normal
  const type = instance.router.params.type ? instance.router.params.type : 2
  const region = instance.router.params.region ? instance.router.params.region : 'all'
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
      setFavs(n.favs.length)
      console.log(n)
      if (n.body) {
        setBody(n.body.replace(/&nbsp;/g, '<br/>'))
      }

      Taro.setNavigationBarTitle({
        title: n.title
      })

      setCommentCount(n.comments.length)
      setLikeCount(n.likes.length)
      setCommentList(makeCommentsList(n.comments))
      setTags(n.tags.map((i, index) => index < 3 && <View className="tag tag-blue" key={index}>{i}</View> ))
      // setRooms(n.children.map((child, index) => <RoomView key={index} room={child} node={n}/>))

      innerAudioContext.src = Env.imageUrl + n.audio

      Taro.getStorage({
        key: Env.storageKey
      })
      .then(res => {
        if (n.likes.includes(res.data.id)) {
          setLiked(true)
        }
      })

    })
  }, [])

  const likeit = () => {
    if (!logged) {
      Taro.navigateTo({ url: '/pages/me/login' })
      return
    }
    console.log('like it: ')

    const data = {
      uid, 
      nid,
    }
    Taro.request({
      method: 'POST',
      url: Env.apiUrl + 'like',
      data
    }).then((res) => {
      if (res.statusCode === 200) {
        console.log(res.data)
        setLikeCount(res.data.count)
        setLiked(true)
      } else {
        Taro.showToast({
          title: '系统错误',
          icon: 'error',
          duration: 2000
        })
        console.log('server error！' + res.errMsg)
      }
    })
  }

  const upit = (cid) => {
    console.log('logged? ,', logged);
    if (!logged) {
      // Taro.navigateTo({ url: '/pages/me/login' })
      return
    }
    console.log('up comment: ' + cid)

    const data = {
      uid, 
      cid,
    }
    Taro.request({
      method: 'POST',
      url: Env.apiUrl + 'up',
      data
    }).then((res) => {
      if (res.statusCode === 200) {
        console.log(res.data)
        setCommentList(makeCommentsList(res.data.comments))
      } else {
        Taro.showToast({
          title: '系统错误',
          icon: 'error',
          duration: 2000
        })
        console.log('server error！' + res.errMsg)
      }
    })
  }

  const sendComment = (body) => {
    if (!logged) {
      Taro.navigateTo({ url: '/pages/me/login' })
      return
    }
    setComment('')
    console.log('send comment: ', body)
    if(body == '') {
      console.log('comment body blank')
      return
    }

    const data = {
      body,
      uid, 
      nid,
    }
    Taro.request({
      method: 'POST',
      url: Env.apiUrl + 'comments',
      data
    }).then((res) => {
      if (res.statusCode === 200) {
        setCommentList(makeCommentsList(res.data.comments))
        setCommentCount(res.data.comments.length)
        Taro.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        }).then(() => {
          setTimeout(() => {
            // Taro.reLaunch({ url: '/pages/index/index' })
          }, 2000)
        })
      } else {
        Taro.showToast({
          title: '系统错误',
          icon: 'error',
          duration: 2000
        })
        console.log('server error！' + res.errMsg)
      }
    })
  }

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

  const makeCommentsList = (comments) => {
    return comments.map((c, i) => (
          <View className="item">
            <View className="top">
              <View className="user">
                <img width="48px" height="48px" className="img" src={Env.imageUrl + c.author.avatar} />
                <View>{c.author.name}</View>
              </View>
              <View className="like">
                <img width="16px" height="16px" className="img" onClick={() => upit(c.id)} src={Env.iconUrl + (c.ups.includes(uid) ? 'hand-thumbs-up-fill.svg' : 'hand-thumbs-up.svg')} />
                {c.ups.length}
              </View>
            </View>
            <View className="content">
              <View className="body">{c.body}</View>
              <View className="time">{fmtDate(new Date(c.createdAt))} </View>
            </View>
          </View>
      ))
  }

  const commentItem = ({c}) => {
    return (
      <View className="item">
        <View className="top">
          <View className="user">
            <img width="48px" height="48px" className="img" src={Env.imageUrl + c.author.avatar} />
            <View>{c.author.name}</View>
          </View>
          <View className="like">
            <img width="16px" height="16px" className="img" onClick={() => upit(c.id)} src={Env.iconUrl + (c.ups.includes(uid) ? 'hand-thumbs-up-fill.svg' : 'hand-thumbs-up.svg')} />
            {c.ups.length}
          </View>
        </View>
        <View className="content">
          <View className="body">{c.body}</View>
          <View className="time">{fmtDate(new Date(c.createdAt))} </View>
        </View>
      </View>
    )
  }

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
    const data = {
      uid: uid,
      nid: id,
    }

    Taro.request({
      method: 'POST',
      url: Env.apiUrl + 'fav/toggle',
      data
    }).then((res) => {
      setIsFav(res.data.isFav)
      if (res.data.isFav) {
        setFavs(favs + 1)
      } else {
        setFavs(favs - 1)
      }
    })
  }

  const preview = (images) => {
    setPreviewImages(images)
    setShowPreview(true)
  }

  const updateInput = (e) => {
    const v = e.detail.value
    setComment(v)
  }

  const [tab1value, setTab1value] = useState<string | number>('0')

  return (
    <View className={"show " + region+"-show" + " show-" + type}>
      <View className="hero hero-jing">
        <img className="img" onClick={() => Taro.navigateBack()} width="28px" height="28px" src={Env.iconUrl + 'chevron-left-white.svg'} />
        <Image className="w-100 rounded" src={Env.imageUrl + node.image} mode="heightFix" />
      </View>


      { (type != 4 && type !=6 && region != 'talk') &&
      <View className="card card-jing">
        <View className="header">
          <View className="">
            { (type == 0 || type == 1) &&
            <View className="tags">{tags}</View>
            }

            <View className="title article-title mt-1">{node.title}</View>

            { type == 1 &&
            <View className="reviews d-flex align-items-center">
              <Rate className="stars me-8" allowHalf readOnly touchable defaultValue={0} value={node.rates.rate} />
              <View className="">{node.rates.rate} <span className="counts">({node.rates.users.length} 条评价)</span> </View>
            </View>
            }

            { type == 2 &&

            <View className="info d-flex justify-between">
              <View className="address d-flex">
                <img className="me-5 img" width="22px" height="16px" src={Env.iconUrl + 'location-grey.png'} />
                <View>{node.address}</View>
              </View>
              <View className="nav d-flex" onClick={openLocation}>
                <img className="me-5" width="16px" height="16px" src={Env.iconUrl + 'nav-blue.png'} /> 导航
              </View>
            </View>
            }

          </View>
        </View>
      </View>
      }

      { type == 2 &&
        <>
        <View className="d-flex justify-between p-1">
          <View className="tag tag-b">
            <img width="20px" height="20px" src={Env.iconUrl + 'chat-dots-fill.svg'} />
            <View> {commentCount} 评论 </View>
          </View>
          <View className="tag tag-y">
            <img width="20px" height="20px" src={Env.iconUrl + 'star-fill-gold.svg'} />
            <View> {node.rates.rate} 评分 </View>
          </View>
        </View>
        <View dangerouslySetInnerHTML={{__html: body}} className='body p-1'></View>

        <View className="services p-1 section">
          <View className="title">服务</View>
          <View className="icons d-flex">
            <View className="icon">
              <img width="40px" height="40px" src={Env.iconUrl + 'wifi.svg'} />
              <View>Wifi</View>
            </View>
            <View className="icon">
              <img width="40px" height="40px" src={Env.iconUrl + 'cup-hot.svg'} />
              <View>咖啡</View>
            </View>
            <View className="icon">
              <img width="40px" height="40px" src={Env.iconUrl + 'tv.svg'} />
              <View>电视</View>
            </View>
          </View>
        </View>

        <View className="near p-1 section">
          <View className="title">附近地标</View>
        </View>

        </>
      }

      
      { (type == 0 || type == 1) &&
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

          <View className="comments">
            <View className="title">评论 ({commentCount})</View>
            <View className="comments-list">
            {commentList}
            </View>
          </View>

        </Tabs.TabPane>
        <Tabs.TabPane title="门票预定">
          <View dangerouslySetInnerHTML={{__html: body}} className='body'></View>
        </Tabs.TabPane>
      </Tabs>
      }

      { type == 1 &&
      <View className="footer fixed d-flex p-1">
        <Input width="" placeholder='我想说...' className="input" value={comment} onInput={(e) => updateInput(e)}>
          <img width="12px" height="12px" src={Env.iconUrl + 'pen.svg'} />
        </Input>
        <View className="d-flex justify-between btns">
          <img width="28px" height="28px" src={Env.iconUrl + 'emoji-smile.svg'} />
          <img width="28px" height="28px" src={Env.iconUrl + 'send.svg'} onClick={() => sendComment(comment)} />
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
