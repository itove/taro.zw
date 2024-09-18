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

function TabPane({node, type, index}) {
  return (
    <View key={index} className="list-item" onClick={() => gotoNode(node.id, type)}>
    <View className="img">
    <Image className="w-100 rounded" src={Env.imageUrl + node.image} mode="aspectFill" />
    </View>
    <View className="text">
      <View>
      {node.title}
      <p className="ellipsis-2">{node.summary}</p>
      </View>

      <View className="info">
        <View className=""><img className="" width="16px" height="16px" src={Env.iconUrl + 'star-fill-gold.svg'} /> 4.5 ¥ 111/人</View>
        <p className="">3.1km</p>
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
    <Swiper.Item className="slide-item">
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
      <View className="tag">度假区</View>
      <View className="tag">3A景区</View>
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
    { t: '景点', p: Env.iconUrl + 'grid_1.png', target: '', url: 'jingdian/index', isTab: false, },
    { t: '住宿', p: Env.iconUrl + 'grid_2.png', target: '', url: 'zhusu/index', isTab: false, },
    { t: '美食', p: Env.iconUrl + 'grid_3.png', target: '', url: 'node/index?type=0&region=chizai', isTab: false, },
    { t: '服务', p: Env.iconUrl + 'grid_4.png', target: '', url: 'node/index?type=0&region=youzai', isTab: false, },
    { t: '采摘', p: Env.iconUrl + 'grid_5.png', target: '', url: 'node/index?type=0&region=youzai', isTab: false, },
    { t: '特产', p: Env.iconUrl + 'grid_6.png', target: '', url: 'node/index?type=0&region=youzai', isTab: false, },
    { t: '文体', p: Env.iconUrl + 'grid_7.png', target: '', url: 'wenti/index', isTab: false, },
    { t: '商超', p: Env.iconUrl + 'grid_8.png', target: '', url: 'node/index?type=0&region=youzai', isTab: false, },
  ]

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'wx/home'
    })
    .then(res => {
      const data = res.data
      console.log(res)

      setSliderList(data.slider.map((node, index) => <SwiperItem node={node} index={index} />))
      setTongzhi(data.tongzhi.map((node, index) => <div onClick={() => gotoNode(node.id, 5)}>{node.title}</div> ))
      setYouList(data.youzai.map((node, index) => <TabPane node={node} type={0} index={index} />))
      setJingList(data.youzai.map((node, index) => <SwiperItem1 node={node} index={index} type={0} />))
      setZhuList(data.zhuzai.map((node, index) => <TabPane node={node} type={1} index={index} />))
      setChiList(data.chizai.map((node, index) => <TabPane node={node} type={2} index={index} />))
      setGouList(data.gouzai.map((node, index) => <TabPane node={node} type={3} index={index} />))
      setGridList(gridItems.map((node, index) => <GridItem node={node} index={index} />))
      // setDili(data.dili[0])
      setJianjie(data.jianjie[0])
      setHongsetext(data.hongsetext[0])
      setHistorytext(data.historytext[0])
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <View className="home">
      <View className="hero" style="background-image: url(https://zw.dev.itove.com/images/1.png)">
        <View className="text">
          <View className="title">灵秀张湾</View>
          <View className="desc">十堰市・张湾区</View>
        </View>
         <SearchBar className="search" shape="round" maxLength={5} placeholder="搜索景点、美食和购物" />
      </View>

      <Grid columns="4" className="grid">
        {gridList}
      </Grid>

      <View className="daolan block">
        <View className="header">
          热门景点
          <More region={'youzai'} type={0} />
        </View>
        <Swiper defaultValue={0} loop className="slide" height="260">
          {jingList}
        </Swiper>
      </View>

      <View className="leyou block">
        <View className="header">
          玩法推荐
          <More region={'youzai'} type={0} />
        </View>

        <Tabs
          value={tab1value}
          autoHeight={true}
          onChange={(value) => {
            setTab1value(value)
          }}
          activeType="button"
          className="tabs"
          >
          <Tabs.TabPane className="tabpane" title=""> {youList} </Tabs.TabPane>
        </Tabs>
      </View>

    </View>
  )
}

export default Index
