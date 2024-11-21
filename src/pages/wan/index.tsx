import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
// import { More } from '../../components/more'
import './index.scss'
import { Swiper, Grid } from '@nutui/nutui-react-taro'

function gotoNode(id, type = 2) {
  Taro.navigateTo({url: '/pages/node/show?type=' + type + '&id=' + id})
}

function SwiperItem({node, index, type}) {
  return (
    <Swiper.Item className="slide-item">
      <View className="widget">
        <View className="badge">{node.tags[0]}</View>
      </View>
      <Image
      className="w-100 img"
      mode="aspectFill"
      onClick={() => gotoNode(node.id, type)}
      src={Env.imageUrl + node.image}
      alt=""
      />
      <View className="text">
      <p className="title">{node.title}</p>
      <View className="d-flex mb-10">
        <View className="tag tag-b me-8">人均¥{node.price / 100}</View>
        <View className="tag tag-b me-8">{node.tags[1]}</View>
      </View>
      </View>
    </Swiper.Item>
  )
}

function GridItem({node, index, type}) {
  return (
    <View className="grid-item mb-10" onClick={() => gotoNode(node.id, type)} >
      <View className="text mb-8">
        <View className="title d-flex mb-4">
          <View className="ellipsis" style="width: 70%">{node.title}</View>
          <View className="price">¥{node.price / 100}</View>
        </View>
        <View className="summary">{node.summary}</View>
      </View>
      <Image className="w-100 img" src={Env.imageUrl + node.image} mode="aspectFill" />
    </View>
  )
}

function ViewItem({node, type, index}) {
  return (
    <View key={index} className="list-item" onClick={() => gotoNode(node.id, type)}>
      <View className="img">
        <Image className="w-100 rounded" src={Env.imageUrl + node.image} mode="aspectFill" />
      </View>
      <View className="text">
        <View className="ellipsis-2 title mb-10">{node.title}</View>
        <View className="d-flex">
          <View className="left">
            <img className="avatar" width="16px" height="16px" src={Env.imageUrl + node.author.avatar} /> {node.author.name}
          </View>
          <View className="right">
            <img width="16px" height="16px" src={Env.iconUrl + 'heart.png'} /> {node.favs.length}
          </View>
        </View>
      </View>
    </View>
  )
}

function More({region, type}) {
  return (
    <View
      className="more" 
      onClick={() => Taro.navigateTo({url: '/pages/node/index?region=' + region + '&type=' + type})}
    >
    更多 <img width="14px" height="14px" src={Env.iconUrl + 'arrow-right.png'} />
    </View>
  )
}

function Index() {
  const [youList, setYouList] = useState([])
  const [wanList, setWanList] = useState([])
  const [luList, setLuList] = useState([])
  const [grid, setGrid] = useState([])

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'wx/wan'
    })
    .then(res => {
      const data = res.data
      console.log(res)

      setLuList(data.lu.map((node, index) => <SwiperItem node={node} key={index} type={0} />))
      setWanList(data.wan.map((node, index) => index < 4 && <GridItem node={node} type={0} key={index} />))
      setYouList(data.youji.map((node, index) => <ViewItem node={node} type={1} key={index} />))
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <View className="wan p-1" style={{backgroundImage: `url(${Env.imageUrl}grid-bg.png)`}}>
      <View className="youzai block">
        <View className="header">
          推荐路线
          <More region={'lu'} type={0} />
        </View>
        <Swiper defaultValue={0} loop className="slide" height="184">
          {luList}
        </Swiper>
      </View>

      <View className="chizai block node-index">
        <View className="header">
          去哪玩
          <More region={'wan'} type={2} />
        </View>
        <View columns="2" gap="3" center={false} className="grid">
          {wanList}
        </View>
      </View>

      <View className="you block">
        <View className="header">
          用户游记
          <More region={'youji'} type={1} />
        </View>
        <View class="list">
        {youList}
        </View>
      </View>

    </View>
  )
}

export default Index
