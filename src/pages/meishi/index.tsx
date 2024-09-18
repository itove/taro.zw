import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Grid, NoticeBar, Swiper, Tabs, SearchBar } from '@nutui/nutui-react-taro'

function gotoNode(id, type = 3) {
  Taro.navigateTo({url: '/pages/node/show?type=' + type + '&id=' + id})
}

function gotoNodeIndex(region, type) {
  Taro.navigateTo({url: '/pages/node/index?region=' + region + '&type=' + type})
}

function gotoUrl(url) {
  Taro.navigateTo({url: '/pages/' + url})
}

function gridGoto(node) {
  if (node.isTab) {
    Taro.switchTab({url: '/pages/' + node.url})
    .then(
      res => {
        Taro.pageScrollTo({
          selector: node.target,
          duration: 300
        })
      }
    )
  } else {
    Taro.navigateTo({url: '/pages/' + node.url})
  }
}

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

function ListItem({node, type, index}) {
  return (
    <View className="card">
      <View className="widget">
        <View className="badge">4.5 <img className="ms-5" width="16px" height="16px" src={Env.iconUrl + 'star-fill.svg'} /></View>
        <img width="22px" height="22px" src={Env.iconUrl + 'suit-heart.svg'} />
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

function SwiperItem({node, index}) {
  return (
    <Swiper.Item key={index} className="rounded">
    <Image
    className="w-100 rounded"
    mode="widthFix"
    onClick={() => console.log(index)}
    src={Env.imageUrl + node.image}
    alt=""
    />
    </Swiper.Item>
  )
}

function SwiperItem1({node, index, type}) {
  return (
    <Swiper.Item className="slide-item card">
    <View className="widget">
      <View className="badge">4.5 <img className="ms-5" width="16px" height="16px" src={Env.iconUrl + 'star-fill.svg'} /></View>
      <img width="22px" height="22px" src={Env.iconUrl + 'suit-heart.svg'} />
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

function GridItem({node, index}) {
  return (
    <Grid.Item className="background-none" text={node.t} key={index} onClick={() => gridGoto(node) }>
    <Image className="img" src={node.p} mode="widthFix" />
    </Grid.Item>
  )
}

function Index() {
  const [sliderList, setSliderList] = useState([])
  const [tongzhi, setTongzhi] = useState([])
  const [gridList, setGridList] = useState([])
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

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

  const gridItems = [
    { t: '景点', p: Env.iconUrl + 'grid_1.png', target: '', url: 'node/index?type=0&region=youzai', isTab: false, },
    { t: '住宿', p: Env.iconUrl + 'grid_2.png', target: '', url: 'node/index?type=0&region=youzai', isTab: false, },
    { t: '美食', p: Env.iconUrl + 'grid_3.png', target: '', url: 'node/index?type=0&region=youzai', isTab: false, },
    { t: '服务', p: Env.iconUrl + 'grid_4.png', target: '', url: 'node/index?type=0&region=youzai', isTab: false, },
    { t: '采摘', p: Env.iconUrl + 'grid_5.png', target: '', url: 'node/index?type=0&region=youzai', isTab: false, },
    { t: '特产', p: Env.iconUrl + 'grid_6.png', target: '', url: 'node/index?type=0&region=youzai', isTab: false, },
    { t: '文体', p: Env.iconUrl + 'grid_7.png', target: '', url: 'node/index?type=0&region=youzai', isTab: false, },
    { t: '商超', p: Env.iconUrl + 'grid_8.png', target: '', url: 'node/index?type=0&region=youzai', isTab: false, },
  ]

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'nodes/chizai'
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
    <View className="home">
      <View className="pagetitle">文体场馆</View>
      <View className="daolan block">
        <View className="header">
          热门场馆
        </View>
        <Swiper defaultValue={0} loop className="slide" height="260">
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
