import React from 'react'
import { View, Image } from '@tarojs/components'
import { Button } from "@nutui/nutui-react-taro"
import './index.scss'
import { Grid, NoticeBar, Swiper } from '@nutui/nutui-react-taro'
import Hill from '../../icons/hill-river-fill.png'
import Slider1 from '../../images/slider1.png'
import Speaker from '../../icons/speaker.png'
import HillRiver from '../../icons/hill-river-1.png'
import Daolan from '../../images/zhihuidaolan.png'


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
            width="24px"
            height="24px"
            src={HillRiver}
          />
        </View>
        <Image className="w-100" src={Daolan} mode="widthFix" />
      </View>

      <View className="zoujin block">
        <View className="header">
          走进东沟
          <img
            width="24px"
            height="24px"
            src={HillRiver}
          />
        </View>
        <View className="wrapper">
          <View className="">
            <Image className="w-100" src={Daolan} mode="center" />
            <View class="text">
              东沟简介
              <p>点击查看></p>
            </View>
          </View>
          <View className="col2">
            <View className="">
              <Image className="w-100" src={Daolan} mode="center" />
              <View class="text">
                东沟文化
                <p>爱国主义教育基地</p>
              </View>
            </View>
            <View className="">
              <Image className="w-100" src={Daolan} mode="center" />
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
            width="24px"
            height="24px"
            src={HillRiver}
          />
        </View>
        <Image className="w-100" src={Daolan} mode="widthFix" />
      </View>

    </View>
  )
}

export default Index
