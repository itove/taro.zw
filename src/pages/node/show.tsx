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

function openSticker() {
  console.log('open sticker...')
  // Taro.openStickerSetView()
}

function gotoRate(nid) {
  console.log('go to rate...');
  Taro.navigateTo({url: 'rate?nid=' + nid})
}

function Index() {
  const [node, setNode] = useState({rates: {rate: 0, users: []}, tags: []})
  const [rooms, setRooms] = useState([])
  const [uid, setUid] = useState(0)
  const [body, setBody] = useState('')
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [tags, setTags] = useState([])
  const [isFav, setIsFav] = useState(false)
  const [favs, setFavs] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const [logged, setLogged] = useState(false)
  const [commentCount, setCommentCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [favCount, setFavCount] = useState(0)

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

  const instance = Taro.getCurrentInstance();
  const id = instance.router.params.id
  const nid = instance.router.params.id
  // 0: all // 1: jing // 2: zhu // 3: shi // 4: dong // 5: wen // 6: yi // 7: gou // 8: wan
  // index list & show normal
  const type = instance.router.params.type ? instance.router.params.type : 2
  const region = instance.router.params.region ? instance.router.params.region : 'all'

  // const innerAudioContext = Taro.createInnerAudioContext()
  // const [audio, setAudio] = useState(innerAudioContext)
  // const [playIcon, setPlayIcon] = useState(Env.iconUrl + 'hotline.png')
  // const [progress, setProgress] = useState('语音讲解')

  // audio.onPlay(() => {
  //   setPlayIcon(Env.iconUrl + 'hotline-primary.png')
  // })
  // audio.onStop(() => {
  //   setPlayIcon(Env.iconUrl + 'hotline.png')
  // })
  // audio.onPause(() => {
  //   setPlayIcon(Env.iconUrl + 'hotline.png')
  // })
  // audio.onEnded(() => {
  //   setPlayIcon(Env.iconUrl + 'hotline.png')
  //   setProgress('语音讲解')
  // })
  // audio.onCanplay(() => {
  // })
  // audio.onTimeUpdate(() => {
  //   setProgress(fmtSeconds(audio.duration - audio.currentTime))
  // })
  // audio.onError((res) => {
  //   console.log(res.errMsg)
  //   console.log(res.errCode)
  // })

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'nodes/' + id
    })
    .then(res => {
      const n = res.data
      setNode(n)
      setFavCount(n.favs.length)
      console.log(n)
      if (n.body) {
        setBody(n.body.replace(/&nbsp;/g, '<br/>'))
      }

      Taro.setNavigationBarTitle({
        title: n.title
      })

      setCommentCount(n.comments.length)
      setComments(n.comments)
      setFavCount(n.favs.length)
      setTags(n.tags.map((i, index) => <View className="tag tag-blue" key={index}>{i}</View> ))
      // setRooms(n.children.map((child, index) => <RoomView key={index} room={child} node={n}/>))

      // innerAudioContext.src = Env.imageUrl + n.audio

      Taro.getStorage({
        key: Env.storageKey
      })
      .then(res => {
        setLogged(true)
        setUid(res.data.id)
        if (n.favs.includes(res.data.id)) {
          setIsFav(true)
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
      Taro.navigateTo({ url: '/pages/me/login' })
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
        setComments(res.data.comments)
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
        setCommentCount(res.data.comments.length)
        setComments(res.data.comments)
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

  // const playAudio = () => {
  //     console.log(audio.src)
  //     if (audio.paused) {
  //       audio.play()
  //       console.log('playing...')
  //     } else {
  //       audio.pause()
  //       console.log('paused...')
  //     }
  // }

  // useEffect(() => {
  //   return () => {
  //     audio.destroy()
  //   }
  // }, []);

  const Comment = ({comment, index}) => {
    return (
          <View className="item" key={index}>
            <View className="top">
              <View className="user">
                <img width="48px" height="48px" className="img" src={Env.imageUrl + comment.author.avatar} />
                <View>{comment.author.name}</View>
              </View>
              <View className="like">
                <img width="16px" height="16px" className="img" onClick={() => upit(comment.id)} src={Env.iconUrl + (comment.ups.includes(uid) ? 'hand-thumbs-up-fill.svg' : 'hand-thumbs-up.svg')} />
                {comment.ups.length}
              </View>
            </View>
            <View className="content">
              <View className="body">{comment.body}</View>
              <View className="time">{fmtDate(new Date(comment.createdAt))} </View>
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
        setFavCount(favCount + 1)
      } else {
        setFavCount(favCount - 1)
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
    <View className={"show p-1 " + region+"-show"}>
      <View className="hero">
        { type == 4 &&
        <View className="widget">
          <View className="badge">活动日期：{fmtDate(new Date(node.startAt), 3)} - {fmtDate(new Date(node.endAt), 3)}</View>
        </View>
        }
        <Image className="w-100 rounded" src={Env.imageUrl + node.image} mode="heightFix" />
      </View>

      { type == 6 &&
      <>
      <View className="text">
        <View className="title mb-10">
          {node.title}
          <View className="tag tag-y ms-5">{node.tags[0]}</View>
        </View>

        <View className="d-flex mb-10">
          <View className="tag tag-b-r me-8">{node.tags[1]}</View>
          <View className="tag tag-b-r me-8">{node.tags[2]}</View>
          <View className="tag tag-b-r me-8">{node.tags[3]}</View>
        </View>

        <View className="info">
          <img className="me-5" width="12px" height="12px" src={Env.iconUrl + 'location-grey.png'} />
          {node.address}
        </View>
      </View>
      </>
      }

      { (type != 4 && type !=6 && region != 'talk') &&
      <View className="card">
        <View className="header">
          <View className="">
            { (type == 0 || type == 1) &&
            <View className="tags">{tags}</View>
            }

            <View className="title article-title mt-1">{node.title}</View>

            <View className="reviews d-flex align-items-center" onClick={() => gotoRate(node.id)}>
              <Rate className="stars me-8" allowHalf readOnly value={node.rates.rate} />
              <View className="">{node.rates.rate} <span className="count">({node.rates.users.length} 条评分)</span> </View>
            </View>
          </View>
        </View>
      </View>
      }
      
      { type == 4 &&
      <>
      <View className="text">
        <View className="title justify-between">
          <View className="left d-flex">
            {node.title}
            <View className="badge ms-5">{node.tags[0]}</View>
          </View>
          <View className="right">
            <View className="d-flex">
              <img className="" width="16px" height="16px" src={Env.iconUrl + 'chat-dots-grey.svg'} />
              <View className="count ms-5">{commentCount}</View>
              <img className="ms-20" width="16px" height="16px" onClick={toggleFav} src={Env.iconUrl + (isFav && 'heart-pink-fill.svg' || 'heart-pink.svg')} />
              <View className="count ms-5">{favCount}</View>
            </View>
          </View>
        </View>
        <View className="info">
          <View className="">主办方：{node.note}</View>
          <View className="location">
            <View>活动地点：{node.address}</View>
            <View class="icon" onClick={() => openLocation(node.latitude, node.longitude)}>
              <img className="me-5" width="16px" height="16px" src={Env.iconUrl + 'nav-blue.png'} /> 导航
            </View>
          </View>
        </View>
      </View>

      <View dangerouslySetInnerHTML={{__html: body}} className='body py-16'></View>
      </>
      }

      { type == 5 &&
      <>
      <View dangerouslySetInnerHTML={{__html: body}} className='body py-16'></View>
      </>
      }

      { region == 'talk' &&
      <>
        <View dangerouslySetInnerHTML={{__html: body}} className='body py-6'></View>

        <View className="info d-flex justify-between align-items-center py-16">
          <View className="like d-flex align-items-center">
            <img height="20px" width="20px" onClick={toggleFav} src={Env.iconUrl + (isFav ? 'heart-pink-fill.svg' : 'heart-pink.svg') } />
            <View className="ms-5">{favCount}</View>
          </View>
          <View className="date">{fmtDate(new Date(node.createdAt))}</View>
        </View>
      </>
      }

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

      { type == 6 &&
      <Tabs
        value={tab1value}
        autoHeight={true}
        onChange={(value) => {
          setTab1value(value)
        }}
        align="left"
        className="rooms"
      >
        <Tabs.TabPane title="简介">
          <View>
            <View dangerouslySetInnerHTML={{__html: body}} className='body'></View>
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane title="入馆须知">
          <View dangerouslySetInnerHTML={{__html: body}} className='body'></View>
        </Tabs.TabPane>
      </Tabs>
      }

      <View className="comments">
        <View className="title">评论 ({commentCount})</View>
        <View className="comments-list">
        {comments.map((c, i) => <Comment comment={c} index={i} />)}
        </View>
      </View>

      <View className="footer fixed d-flex">
        <Input width="" placeholder='我想说...' className="input" value={comment} onInput={(e) => updateInput(e)}>
          <img width="12px" height="12px" src={Env.iconUrl + 'pen.svg'} />
        </Input>
        <View className="d-flex btns">
          <img width="28px" height="28px" src={Env.iconUrl + 'send.svg'} onClick={() => sendComment(comment)} />
        </View>
      </View>

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
