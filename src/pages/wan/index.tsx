import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
// import { More } from '../../components/more'
import './index.scss'
import { Swiper, Grid } from '@nutui/nutui-react-taro'

function scrollTo() {
  Taro.pageScrollTo({
    scrollTop: 0,
    duration: 300
  })
}

function gotoNode(id, type = 2) {
  Taro.navigateTo({url: '/pages/node/show?type=' + type + '&id=' + id})
}

function SwiperItem({node, index, type}) {
  return (
    <Swiper.Item className="slide-item">
      <View className="widget">
        <View className="badge">一日游</View>
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
        <View className="tag tag-b me-8">人均¥50</View>
        <View className="tag tag-b me-8">3A景区</View>
      </View>
      </View>
    </Swiper.Item>
  )
}

function GridItem({node, index, type}) {
  return (
    <View className="grid-item">
      <View className="text mb-8">
        <View className="title d-flex mb-4">
          {node.title}
          <View className="price">¥39</View>
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
        <View className="ellipsis-2 title">{node.title}</View>
        <View className="d-flex">
          <View className="left">
            <img width="16px" height="16px" src={Env.imageUrl + 'avatar.png'} /> 天台上的皮卡丘
          </View>
          <View className="right">
            <img width="16px" height="16px" src={Env.iconUrl + 'heart.png'} /> 246
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
  const [zhuList, setZhuList] = useState([])
  const [chiList, setChiList] = useState([])
  const [grid, setGrid] = useState([])

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'wx/home'
    })
    .then(res => {
      const data = res.data
      console.log(res)

      setYouList(data.jing.map((node, index) => <SwiperItem node={node} key={index} type={0} />))
      setZhuList(data.jing.map((node, index) => <ViewItem node={node} type={1} key={index} />))
      setChiList(data.jing.map((node, index) => index < 4 && <GridItem node={node} type={0} key={index} />))
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
          <More region={'jing'} type={0} />
        </View>
        <Swiper defaultValue={0} loop className="slide" height="184">
          {youList}
        </Swiper>
      </View>

      <View className="chizai block node-index">
        <View className="header">
          去哪玩
          <More region={'jing'} type={2} />
        </View>
        <View columns="2" gap="3" center={false} className="grid">
          {chiList}
        </View>
      </View>

      <View className="you block">
        <View className="header">
          用户游记
          <More region={'jing'} type={1} />
        </View>
        <View class="list">
        {zhuList}
        </View>
      </View>

    </View>
  )
}

export default Index
