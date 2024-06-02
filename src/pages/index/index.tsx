import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import { Grid, NoticeBar, Swiper, Tabs } from '@nutui/nutui-react-taro'
import Hill from '../../icons/hill-river-fill.png'
import Slider1 from '../../images/slider1.png'
import Speaker from '../../icons/speaker.png'
import HillRiver from '../../icons/hill-river-1.png'
import Daolan from '../../images/zhihuidaolan.png'
import Image1 from '../../images/image1.png'

const grid = []
const items = [
  {
    t: '游在东沟',
    p: Hill
  },
  {
    t: '住在东沟',
    p: Hill
  },
  {
    t: '吃在东沟',
    p: Hill
  },
  {
    t: '购在东沟',
    p: Hill
  },
  {
    t: '地理位置',
    p: Hill
  },
  {
    t: '投诉建议',
    p: Hill
  },
  {
    t: '文旅要闻',
    p: Hill
  },
  {
    t: '旅行游记',
    p: Hill
  },
]

items.map((i, index) => {
  grid.push(
    <Grid.Item text={i.t} key={index}>
      <Image className="w-25" src={i.p} mode="widthFix" />
    </Grid.Item>
  )
})

const swiperList = [
  {
    p: Slider1,
    link: '',
  },
  {
    p: Slider1,
    link: '',
  },
  {
    p: Slider1,
    link: '',
  },
]

const swiper =  
   <Swiper defaultValue={0} autoPlay indicator className="rounded">
      {swiperList.map((item, index) => (
        <Swiper.Item key={item}>
          <Image
            className="w-100"
            mode="widthFix"
            onClick={() => console.log(index)}
            src={item.p}
            alt=""
          />
        </Swiper.Item>
      ))}
    </Swiper>

const noticeList = [
  '关于十堰市景区型村庄评定名单',
]

const noticeBar = 
      <NoticeBar
        leftIcon={<img
            alt="notice"
            width="16px"
            height="16px"
            src={Speaker}
          />}
        rightIcon={<span className="text-gray">更多 ></span>}
        className="rounded-5 overflow-hidden"
        direction="vertical"
        list={noticeList}
        speed={5}
        duration={1000}
        height={30}
        onClick={(e) => {
        }}
        // closeable
      />

function Index() {
  const [tab1value, setTab1value] = useState<string | number>('0')

  const tabPaneList = [
    {
      p: Image1,
      t: '云上牡丹园',
      s: '东东沟·云上牡丹园地处于十堰市茅箭区茅塔乡东沟村二组，东沟·云上牡丹园地处于十堰市茅箭区茅塔乡东沟村二组，东沟·云上牡丹园地处于十堰市茅箭区茅塔乡东沟村二组，东沟·云上牡丹园地处于十堰市茅箭区茅塔乡东沟村二组，东沟·云上牡丹园地处于十堰市茅箭区茅塔乡东沟村二组，东沟·云上牡丹园地处于十堰市茅箭区茅塔乡东沟村二组，东沟·云上牡丹园地处于十堰市茅箭区茅塔乡东沟村二组，沟·云上牡丹园地处于十堰市茅箭区茅塔乡东沟村二组，平均海拔...',
    },
    {
      p: Image1,
      t: '云上牡丹园',
      s: '东沟·云上牡丹园地处于十堰市茅箭区茅塔乡东沟村二组，平均海拔...',
    },
    {
      p: Image1,
      t: '云上牡丹园',
      s: '东沟·云上牡丹园地处于十堰市茅箭区茅塔乡东沟村二组，平均海拔...',
    },
    {
      p: Image1,
      t: '云上牡丹园',
      s: '东沟·云上牡丹园地处于十堰市茅箭区茅塔乡东沟村二组，平均海拔...',
    },
    {
      p: Image1,
      t: '云上牡丹园',
      s: '东沟·云上牡丹园地处于十堰市茅箭区茅塔乡东沟村二组，平均海拔...',
    },
  ]
  const tabPane1 = []

  tabPaneList.map((i, index) => {
    tabPane1.push(
      <View key={index} className="list-item">
        <View className="img">
          <Image className="w-100 rounded" src={i.p} mode="widthFix" />
        </View>
        <View className="text">
        {i.t}
        <p>{i.s}</p>
        </View>
      </View>
    )
  })

  const tabs = 
    <Tabs
      value={tab1value}
      onChange={(value) => {
        setTab1value(value)
      }}
      activeType="button"
      >
      <Tabs.TabPane title="游在东沟"> {tabPane1} </Tabs.TabPane>
      <Tabs.TabPane title="住在东沟"> 住在东沟 </Tabs.TabPane>
      <Tabs.TabPane title="吃在东沟"> 吃在东沟 </Tabs.TabPane>
      <Tabs.TabPane title="购在东沟"> 购在东沟 </Tabs.TabPane>
    </Tabs>


  return (
    <View className="p-1 home">
      <View className="hell">
      </View>
      {swiper}
      <Grid columns="4" className="">
        {grid}
      </Grid>
      {noticeBar}

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
        {tabs}
      </View>

    </View>
  )
}

export default Index
