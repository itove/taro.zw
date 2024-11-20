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
    <View onClick={() => gotoNode(node.id)}>
      <Image className="w-100 img" src={Env.imageUrl + node.image} mode="aspectFill" />
      <View className="text">
        <View className="title d-flex mb-10">
          <View className="ellipsis">{node.title}</View>
        </View>
        <View>
          <View>{fmtDate(new Date(node.createdAt), 4)}</View>
          <View>
            <View className="count">{node.favCount}</View>
            <img className="icon ms-5" height="16px" width="16px" src={Env.iconUrl + 'heart-pink-fill.svg'} />
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
    <View className="">
      <View className="">
        {nodes.map((node, index) => <GridItem node={node} index={index} />)}
      </View>
    </View>
  )
}

export default Index
