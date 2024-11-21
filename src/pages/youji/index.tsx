import React, { useState, useEffect } from 'react'
import { View, Button, Image } from '@tarojs/components'
import { ConfigProvider, TextArea, Dialog } from '@nutui/nutui-react-taro'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { fmtDate } from '../../utils/fmtDate'

function gotoNode(nid) {
}

function GridItem({node, index}) {
  return (
    <View key={index} onClick={() => gotoNode(node.id)} className="grid-item rounded overflow-hidden">
      <Image className="w-100 img" src={Env.imageUrl + node.image} mode="aspectFill" />
      <View className="text">
        <View className="ellipsis">{node.title}</View>
        <View className="more">
          <View>{fmtDate(new Date(node.createdAt), 4)}</View>
          <View className="fav">
            <img className="icon me-5" height="16px" width="16px" src={Env.iconUrl + 'heart-pink-fill.svg'} />
            <View className="count">{node.favs.length}</View>
          </View>
        </View>
      </View>
    </View>
  )
}

function Index() {
  const [nodes, setNodes] = useState([])
  const [uid, setUid] = useState(0)
  const [user, setUser] = useState({})

  useEffect(() => {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      let u = res.data
      setUser(u)
      setUid(u.id)
      Taro.request({
        url: Env.apiUrl + 'youji?uid=' + res.data.id
      })
      .then(res => {
        console.log(res)
        setNodes(res.data)
      })
    })
    .catch(err => {
      console.log(err)
      // Taro.redirectTo({url: '/pages/me/login'})
    })
  }, [])

  return (
    <View className="youji-index p-1">
      <View className="grid">
        {nodes.map((node, index) => <GridItem node={node} index={index} />)}
      </View>
    </View>
  )
}

export default Index
