import React from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import { Swiper, Grid } from '@nutui/nutui-react-taro'
import Youzai from '../../icons/youzai.png'
import Slider1 from '../../images/slider1.png'
import Image1 from '../../images/image1.png'
import Call from '../../icons/call.png'

function Index() {

  const swiperList = [
    {
      p: Slider1,
      link: '',
      t: '云上牡丹园',
      s: '东沟·云云上牡丹园地处于十堰云上牡丹园地处于十堰云上牡丹园地处于十堰云上牡丹园地处于十堰云上牡丹园地处于十堰云上牡丹园地处于十堰上牡丹园地处于十堰市茅箭区茅塔乡...',
    },
    {
      p: Slider1,
      link: '',
      t: '云上牡丹园',
      s: '东沟·云上牡丹园地处于十堰',
    },
    {
      p: Slider1,
      link: '',
      t: '云上牡丹园',
      s: '东沟·云上牡丹园地处于十堰市茅箭区茅塔乡...',
    },
  ]

  const swiper =  
     <Swiper defaultValue={0} loop className="slide" height="230">
        {swiperList.map((item, index) => (
          <Swiper.Item key={item} className="slide-item">
            <Image
              className="w-100 img"
              mode="widthFix"
              onClick={() => console.log(index)}
              src={item.p}
              alt=""
            />
            <View className="text">
            <p className="title">{item.t}</p>
            <p className="summary ellipsis">{item.s}</p>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>

  const zhuzaiList = [
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
  const zhuzai = []

  zhuzaiList.map((i, index) => {
    zhuzai.push(
      <View key={index} className="list-item">
        <View className="img">
          <Image className="w-100 rounded" src={i.p} mode="widthFix" />
        </View>
        <View className="text">
        <View>{i.t}<span class="d-inline-block badge ms-1">民宿</span></View>
        <p className="ellipsis my-1">{i.s}</p>
        <p class="call"><img width="17px" height="17px" src={Call} /> 电话：0719-8888888</p>
        </View>
      </View>
    )
  })

  const grid = []
  const gridList = [
    {
      t: '茅塔百花蜜',
      p: Image1 
    },
    {
      t: '住在东沟',
      p: Image1
    },
    {
      t: '吃在东沟',
      p: Image1
    },
    {
      t: '购在东沟',
      p: Image1
    },
  ]
  gridList.map((i, index) => {
    grid.push(
      <Grid.Item text={i.t} key={index} className="grid-list rounded overflow-hidden">
        <Image className="w-100" src={i.p} mode="widthFix" />
      </Grid.Item>
    )
  })

  return (
    <View className="leyou p-1">
      <View className="youzai block">
        <View className="header">
          <img
            src={Youzai}
          />
          游在东沟
        </View>
        {swiper}
      </View>

      <View className="zhuzai block">
        <View className="header">
          <img
            src={Youzai}
          />
          住在东沟
        </View>
        <View class="list p-1 rounded">
        {zhuzai}
        </View>
      </View>

      <View className="chizai block node-index">
        <View className="header">
          <img
            src={Youzai}
          />
          吃在东沟
          <View class="more"> 更多 > </View>
        </View>
        <Grid columns="2" gap="3" center={false} className="">
          {grid}
        </Grid>
      </View>

      <View className="gouzai block">
        <View className="header">
          <img
            src={Youzai}
          />
          购在东沟
          <View class="more"> 更多 > </View>
        </View>
        {swiper}
      </View>

    </View>
  )
}

export default Index
