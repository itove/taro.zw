import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Grid, NoticeBar, Swiper, Tabs, SearchBar } from '@nutui/nutui-react-taro'

function gotoNode(id, type = 1) {
  Taro.navigateTo({url: '/pages/node/show0?type=' + type + '&id=' + id})
}

function toggleFav(node) {
  console.log('togglefav')
  Taro.getStorage({
    key: Env.storageKey
  })
  .then(res => {
    const uid = res.data.id

    const data = {
      uid: uid,
      nid: node.id,
    }

    Taro.request({
      method: 'POST',
      url: Env.apiUrl + 'fav/toggle',
      data
    }).then((res) => {
      console.log(res.data.isFav)
      node.isFav = res.data.isFav
    })

  })
  .catch(err => {
    console.log(err)
    Taro.navigateTo({ url: '/pages/me/login' })
  })
}

function ListItem({node, type, index}) {
  return (
    <View className="card">
      <View className="widget">
        <View className="badge">4.5 <img className="ms-5" width="16px" height="16px" src={Env.iconUrl + 'star-fill.svg'} /></View>
        <img width="22px" height="22px" onClick={() => toggleFav(node)} src={Env.iconUrl + (node.isFav && 'heart-red-fill.svg' || 'heart-white.svg')} />
      </View>

      <Image
      className="w-100 img"
      mode="aspectFill"
      onClick={() => gotoNode(node.id, type)}
      src={Env.imageUrl + node.image}
      alt=""
      />
    <View className="text">
      <View className="plus">
        <img width="36px" height="36px" src={Env.iconUrl + 'plus-circle-fill.svg'} />
      </View>
      <p className="title">{node.title}</p>
      <View className="tags">
        <View className="tag">免费入园</View>
        <View className="tag">免费入园</View>
      </View>
    </View>
    </View>
  )
}

function SwiperItem1({node, index, type}) {
  return (
    <Swiper.Item className="slide-item card">
    <View className="widget">
      <View className="badge">4.5 <img className="ms-5" width="16px" height="16px" src={Env.iconUrl + 'star-fill.svg'} /></View>
      <img width="22px" height="22px" onClick={() => toggleFav(node)} src={Env.iconUrl + (node.isFav && 'heart-red-fill.svg' || 'heart-white.svg')} />
    </View>

    <Image
    className="w-100 img"
    mode="aspectFill"
    onClick={() => gotoNode(node.id, type)}
    src={Env.imageUrl + node.image}
    alt=""
    />
    <View className="text">
    <View className="plus">
      <img width="36px" height="36px" src={Env.iconUrl + 'plus-circle-fill.svg'} />
    </View>
    <p className="title">{node.title}</p>
    <View className="tags">
      <View className="tag">免费入园</View>
      <View className="tag">免费入园</View>
    </View>
    </View>
    </Swiper.Item>
  )
}

function Index() {
  const [youList, setYouList] = useState([])
  const [jingList, setJingList] = useState([])
  const [zhuList, setZhuList] = useState([])
  const [chiList, setChiList] = useState([])
  const [gouList, setGouList] = useState([])
  const [dili, setDili] = useState({})
  const [jianjie, setJianjie] = useState({})
  const [hongsetext, setHongsetext] = useState({})
  const [historytext, setHistorytext] = useState({})
  const [tab1value, setTab1value] = useState<string | number>('0')
  const [logged, setLogged] = useState(false)
  const [uid, setUid] = useState(0)
  // const [isFav, setIsFav] = useState(false)

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

  useEffect(() => {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      setLogged(true)
      setUid(res.data.id)
    })
    .catch(err => {
      console.log(err)
      // Taro.redirectTo({url: '/pages/me/login'})
    })
  }, [])

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'wx/home'
    })
    .then(res => {
      const data = res.data
      console.log(res)

      setJingList(data.jing.map((node, index) => {
        if (node.favs.includes(uid)) {
          node.isFav = true
        } else {
          node.isFav = false
        }
        return <SwiperItem1 node={node} index={index} type={1} />
      }))

      setYouList(data.jing.map((node, index) => {
        if (node.favs.includes(uid)) {
          node.isFav = true
        } else {
          node.isFav = false
        }
        return <ListItem node={node} type={1} index={index} />
      }))
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <View className="jing">
      <View className="pagetitle">景点</View>
      <View className="daolan block">
        <View className="header">
          热门景点
        </View>
        <Swiper indicator defaultValue={0} loop className="slide" height="280">
          {jingList}
        </Swiper>
      </View>

      <View className="leyou block">
        <View className="header">
          全部景点
        </View>
        <View className="list">
          {youList} 
        </View>
      </View>

    </View>
  )
}

export default Index
