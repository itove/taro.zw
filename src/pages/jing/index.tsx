import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Grid, NoticeBar, Swiper, Tabs, SearchBar } from '@nutui/nutui-react-taro'

function gotoNode(id, type = 1) {
  Taro.navigateTo({url: '/pages/node/show0?type=' + type + '&id=' + id})
}

function Index() {
  const [youNodes, setYouNodes] = useState([])
  const [jingNodes, setJingNodes] = useState([])
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
      url: Env.apiUrl + 'nodes/jing'
    })
    .then(res => {
      const nodes = res.data.nodes
      console.log(res)

      setJingNodes(nodes.slice(0, 5))
      setYouNodes(nodes)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  function addToPlan(node) {
    if (!logged) {
      Taro.navigateTo({ url: '/pages/me/login' })
      return
    }

    const data = {
      uid: uid,
      nid: node.id,
      title: node.title,
    }

    Taro.request({
      method: 'POST',
      url: Env.apiUrl + 'plans',
      data
    }).then((res) => {
      console.log(res.data)
      if (res.statusCode === 200) {
        Taro.showToast({
          title: '已加入行程',
          icon: 'success',
          duration: 2000
        }).then(() => {
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

  function toggleFav(id) {
    if (!logged) {
      Taro.navigateTo({ url: '/pages/me/login' })
      return
    }

    const newJingNodes = jingNodes.map((node) => {
      if (node.id === id) {

        const data = { uid: uid, nid: node.id }

        Taro.request({
          method: 'POST',
          url: Env.apiUrl + 'fav/toggle',
          data
        }).then((res) => {
          console.log(res.data)
          // return res.data.node
        })

        let favs = node.favs
        if (node.favs.includes(uid)) {
          favs = node.favs.filter((i) => {return i !== uid})
        } else {
          favs = [...node.favs, uid]
        }

        const updatedNode = {
          ...node,
          favs: favs,
        }

        return updatedNode
      }

      // console.log(node)
      return node
    })

    const newYouNodes = youNodes.map((node) => {
      if (node.id === id) {

        const data = { uid: uid, nid: node.id }

        Taro.request({
          method: 'POST',
          url: Env.apiUrl + 'fav/toggle',
          data
        }).then((res) => {
          console.log(res.data)
          // return res.data.node
        })

        let favs = node.favs
        if (node.favs.includes(uid)) {
          favs = node.favs.filter((i) => {return i !== uid})
        } else {
          favs = [...node.favs, uid]
        }

        const updatedNode = {
          ...node,
          favs: favs,
        }

        return updatedNode
      }

      // console.log(node)
      return node
    })

    setJingNodes(newJingNodes);
    setYouNodes(newYouNodes);
  }

  function ListItem({node, type, index}) {
    if (node.favs.includes(uid)) {
      node.isFav = true
    } else {
      node.isFav = false
    }

    return (
      <View className="card">
        <View className="widget">
          <View className="badge">4.5 <img className="ms-5" width="16px" height="16px" src={Env.iconUrl + 'star-fill.svg'} /></View>
          <img width="22px" height="22px" onClick={() => toggleFav(node.id)} src={Env.iconUrl + (node.isFav && 'heart-red-fill.svg' || 'heart-white.svg')} />
        </View>

        <Image
        className="w-100 img"
        mode="aspectFill"
        onClick={() => gotoNode(node.id, type)}
        src={Env.imageUrl + node.image}
        alt=""
        />
      <View className="text">
        <View className="plus" onClick={() => addToPlan(node)}>
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
    if (node.favs.includes(uid)) {
      node.isFav = true
    } else {
      node.isFav = false
    }

    return (
      <Swiper.Item className="slide-item card">
      <View className="widget">
        <View className="badge">4.5 <img className="ms-5" width="16px" height="16px" src={Env.iconUrl + 'star-fill.svg'} /></View>
        <img width="22px" height="22px" onClick={() => toggleFav(node.id)} src={Env.iconUrl + (node.isFav && 'heart-red-fill.svg' || 'heart-white.svg')} />
      </View>

      <Image
      className="w-100 img"
      mode="aspectFill"
      onClick={() => gotoNode(node.id, type)}
      src={Env.imageUrl + node.image}
      alt=""
      />
      <View className="text">
      <View className="plus" onClick={() => addToPlan(node)}>
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

  return (
    <View className="jing">
      <View className="pagetitle">景点</View>
      <View className="daolan block">
        <View className="header">
          热门景点
        </View>
        <Swiper indicator defaultValue={0} loop className="slide" height="280">
          {jingNodes.map((node, index) => <SwiperItem1 node={node} index={index} type={1} />)}
        </Swiper>
      </View>

      <View className="leyou block">
        <View className="header">
          全部景点
        </View>
        <View className="list">
          {youNodes.map((node, index) => <ListItem node={node} type={1} index={index} />)}
        </View>
      </View>

    </View>
  )
}

export default Index
