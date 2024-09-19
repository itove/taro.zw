import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Grid, NoticeBar, Swiper, Tabs, SearchBar } from '@nutui/nutui-react-taro'

function gotoNode(id, type = 3) {
  Taro.navigateTo({url: '/pages/node/show?type=' + type + '&id=' + id})
}

function ListItem({node, type, index}) {
  return (
    <View className="d-flex">
      <View className="left align-center">
        <View className="">
          <View>
          <img className="" width="20px" height="20px" src={Env.iconUrl + 'star-fill-gold.svg'} />
          </View>
          <View> 4.6 </View>
        </View>
        <View className="">
          <View>
          <img className="" width="20px" height="20px" src={Env.iconUrl + 'chat-dots-fill.svg'} />
          </View>
          <View> 126 </View>
        </View>
        <View>
          <img className="" width="20px" height="20px" src={Env.iconUrl + 'suit-heart-gray.svg'} />
        </View>
      </View>
      <View className="card right">
        <Image
        className="w-100 img"
        mode="aspectFill"
        onClick={() => gotoNode(node.id, type)}
        src={Env.imageUrl + node.image}
        alt=""
        />
      <View className="text">
        <View className="title">{node.title}</View>
        <View className="price">¥ 898/晚</View>
      </View>
      </View>
    </View>
  )
}

function Index() {
  const [youList, setYouList] = useState([])

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'nodes/zhuzai'
    })
    .then(res => {
      const data = res.data
      console.log(res)

      setYouList(data.nodes.map((node, index) => <ListItem node={node} type={0} index={index} />))
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <View className="zhusu">
      <View className="d-flex tags">
        <View className="tag">住 28 - 离 30</View>
        <View className="tag">2 位客人</View>
      </View>
      <View className="leyou block">
        <View className="list">
          {youList} 
        </View>
      </View>

    </View>
  )
}

export default Index
