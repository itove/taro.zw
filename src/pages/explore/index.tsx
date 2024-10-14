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
    <Image
    className="w-100 img"
    mode="aspectFill"
    onClick={() => gotoNode(node.id, type)}
    src={Env.imageUrl + node.image}
    alt=""
    />
    <View className="text">
    <p className="title">{node.title}</p>
    <p className="summary ellipsis-2">1720人出游</p>
    </View>
    </Swiper.Item>
  )
}

function SwiperItem1({node, index, type}) {
  return (
    <Swiper.Item className="slide-item">
    <Image
    className="w-100 img"
    mode="aspectFill"
    onClick={() => gotoNode(node.id, type)}
    src={Env.imageUrl + node.image}
    alt=""
    />
    <View className="text text1">
    <p className="title">{node.title}</p>
    </View>
    </Swiper.Item>
  )
}

function ViewItem({node, type, index}) {
  return (
    <View key={index} className="list-item" onClick={() => gotoNode(node.id, type)}>
      <View className="img">
        <Image className="w-100 rounded" src={Env.imageUrl + node.image} mode="widthFix" />
      </View>
      <View className="text">
      <View>{node.title}<span class="d-inline-block badge">{node.tags[0]}</span></View>
      <p className="ellipsis-2 my-1">{node.summary}</p>
      <p class="call"><img width="17px" height="17px" src={Env.iconUrl + 'call.png'} /> 电话：{node.phone}</p>
      </View>
    </View>
  )
}

/*
function GridItem({node, index}) {
  return (
    <Grid.Item text={node.title} key={index} className="grid-list rounded overflow-hidden">
      <Image className="w-100" src={Env.imageUrl + node.image} mode="widthFix" />
    </Grid.Item>
  )
}
*/

function More({region, type}) {
  return (
    <View
      className="more" 
      onClick={() => Taro.navigateTo({url: '/pages/node/index?region=' + region + '&type=' + type})}
    >
    全部 <img width="16px" height="16px" src={Env.iconUrl + 'arrow-right.png'} />
    </View>
  )
}

function Index() {
  const [youList, setYouList] = useState([])
  const [youList1, setYouList1] = useState([])
  const [zhuList, setZhuList] = useState([])
  const [chiList, setChiList] = useState([])
  const [gouList, setGouList] = useState([])
  const [grid, setGrid] = useState([])

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'wx/explore'
    })
    .then(res => {
      const data = res.data
      console.log(res)

      setYouList(data.jing.map((node, index) => <SwiperItem node={node} index={index} type={0} />))
      setYouList1(data.jing.map((node, index) => <SwiperItem1 node={node} index={index} type={0} />))
      setZhuList(data.zhu.map((node, index) => <ViewItem node={node} type={1} index={index} />))
      // setChiList(data.chizai.map((node, index) => <GridItem node={node} index={index} />))
      setGouList(data.gou.map((node, index) => <SwiperItem node={node} index={index} type={3} />))
      setChiList(data.shi.map((node, index) => index < 4 &&
          <Grid.Item text={node.title} key={index} className="grid-list rounded overflow-hidden" onClick={() => gotoNode(node.id, 2)}>
            <Image className="w-100" src={Env.imageUrl + node.image} mode="widthFix" />
          </Grid.Item>
        )
      )
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <View className="leyou p-1">
      <View className="youzai block mb-16">
        <View className="header">
          去哪玩
        </View>
        <Swiper defaultValue={0} loop className="slide slide1" height="90">
          {youList1}
        </Swiper>
      </View>

      <View className="youzai block mb-16">
        <View className="header">
          猜你喜欢
          <More region={'jing'} type={0} />
        </View>
        <Swiper defaultValue={0} loop className="slide" height="230">
          {youList}
        </Swiper>
      </View>

      <View className="youzai block">
        <View className="header">
          热门景点
          <More region={'jing'} type={0} />
        </View>
        <Swiper defaultValue={0} loop className="slide" height="230">
          {youList}
        </Swiper>
      </View>

    </View>
  )
}

export default Index
