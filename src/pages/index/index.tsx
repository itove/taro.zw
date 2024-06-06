import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Grid, NoticeBar, Swiper, Tabs } from '@nutui/nutui-react-taro'
import Hill from '../../icons/hill-river-fill.png'
import Slider1 from '../../images/slider1.png'
import Speaker from '../../icons/speaker.png'
import HillRiver from '../../icons/hill-river-1.png'
import Daolan from '../../images/zhihuidaolan.png'
import Image1 from '../../images/image1.png'


const noticeList = [
  '关于十堰市景区型村庄评定名单',
  '2关于十堰市景区型村庄评定名单',
  '3关于十堰市景区型村庄评定名单',
]

function gotoNode(id) {
  console.log(id)
  Taro.navigateTo({url: '/pages/node/show?type=3&id=' + id})
}

function gotoUrl(url) {
  Taro.navigateTo({url: '/pages/' + url})
}

function gridGoto(node) {
  if (node.isTab) {
    Taro.switchTab({url: '/pages/' + node.url})
  } else {
    Taro.navigateTo({url: '/pages/' + node.url})
  }
}

function TabPane({node, index}) {
  return (
    <View key={index} className="list-item" onClick={() => gotoNode(node.id)}>
    <View className="img">
    <Image className="w-100 rounded" src={node.image} mode="widthFix" />
    </View>
    <View className="text">
    {node.title}
    <p>{node.summary}</p>
    </View>
    </View>
  )
}

function SwiperItem({node, index}) {
  return (
    <Swiper.Item key={index}>
    <Image
    className="w-100"
    mode="widthFix"
    onClick={() => console.log(index)}
    src={Env.imageUrl + node.image}
    alt=""
    />
    </Swiper.Item>
  )
}

function GridItem({node, index}) {
  return (
    <Grid.Item text={node.t} key={index} onClick={() => gridGoto(node) }>
    <Image className="w-25" src={node.p} mode="widthFix" />
    </Grid.Item>
  )
}

function Index() {
  const [sliderList, setSliderList] = useState([])
  const [noticeBar, setNoticeBar] = useState([])
  const [gridList, setGridList] = useState([])
  const [youList, setYouList] = useState([])
  const [zhuList, setZhuList] = useState([])
  const [chiList, setChiList] = useState([])
  const [gouList, setGouList] = useState([])
  const [tab1value, setTab1value] = useState<string | number>('0')


  const items = [
    {
      t: '游在东沟',
      p: Hill,
      url: 'leyou/index',
      isTab: true,
    },
    {
      t: '住在东沟',
      p: Hill,
      url: 'leyou/index',
      isTab: true,
    },
    {
      t: '吃在东沟',
      p: Hill,
      url: 'leyou/index',
      isTab: true,
    },
    {
      t: '购在东沟',
      p: Hill,
      url: 'leyou/index',
      isTab: true,
    },
    {
      t: '地理位置',
      p: Hill,
      isTab: false,
    },
    {
      t: '投诉建议',
      p: Hill,
      url: 'feedback/index',
      isTab: false,
    },
    {
      t: '文旅要闻',
      p: Hill,
      isTab: false,
    },
    {
      t: '旅行游记',
      p: Hill,
      isTab: false,
    },
  ]

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'wx/home'
    })
    .then(res => {
      const home = res.data
      console.log(res)

      setSliderList(
        home.slider.map((node, index) => <SwiperItem node={node} index={index} />)
      )

      setYouList(
        home.youzai.map((node, index) => <TabPane node={node} index={index} />)
      )

      setZhuList(
        home.zhuzai.map((node, index) => <TabPane node={node} index={index} />)
      )

      setChiList(
        home.chizai.map((node, index) => <TabPane node={node} index={index} />)
      )

      setGouList(
        home.gouzai.map((node, index) => <TabPane node={node} index={index} />)
      )

      setGridList(
        items.map((node, index) => <GridItem node={node} index={index} />)
      )

    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <View className="p-1 home">
      <View className="hell">
      </View>
      <Swiper defaultValue={0} autoPlay indicator className="rounded">
        {sliderList}
      </Swiper>
      <Grid columns="4" className="">
        {gridList}
      </Grid>

      <NoticeBar
      leftIcon={<img alt="notice" width="16px" height="16px" src={Speaker} />}
      rightIcon={<span className="text-gray">更多 ></span>}
      className="rounded-5 overflow-hidden"
      direction="vertical"
      list={noticeList}
      speed={5}
      duration={1000}
      height={30}
      onClick={(e) => { }}
      // closeable
      />

      <View className="daolan block">
        <View className="header">
          智慧导览
          <img
            src={HillRiver}
          />
        </View>
        <Image className="w-100 rounded" src={Daolan} mode="widthFix" />
      </View>

      <View className="zoujin block">
        <View className="header">
          走进东沟
          <img
            src={HillRiver}
          />
        </View>
        <View className="wrapper">
          <View className="">
            <Image className="w-100 rounded" src={Daolan} mode="center" />
            <View class="text">
              东沟简介
              <p>点击查看></p>
            </View>
          </View>
          <View className="col2">
            <View className="">
              <Image className="w-100 rounded" src={Daolan} mode="center" />
              <View class="text">
                东沟文化
                <p>爱国主义教育基地</p>
              </View>
            </View>
            <View className="">
              <Image className="w-100 rounded" src={Daolan} mode="center" />
              <View class="text">
                东沟历史
                <p>瞻仰革命圣迹</p>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="leyou block">
        <View className="header">
          乐游东沟
          <img
            src={HillRiver}
          />
        </View>

        <Tabs
          value={tab1value}
          onChange={(value) => {
            setTab1value(value)
          }}
          activeType="button"
          >
          <Tabs.TabPane title="游在东沟"> {youList} </Tabs.TabPane>
          <Tabs.TabPane title="住在东沟"> {zhuList} </Tabs.TabPane>
          <Tabs.TabPane title="吃在东沟"> {chiList} </Tabs.TabPane>
          <Tabs.TabPane title="购在东沟"> {gouList} </Tabs.TabPane>
        </Tabs>
      </View>

    </View>
  )
}

export default Index
