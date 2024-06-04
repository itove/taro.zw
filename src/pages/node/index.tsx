import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { Grid } from '@nutui/nutui-react-taro'
import './index.scss'
import Image1 from '../../images/image1.png'

function Index() {
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '吃在东沟'
    })
  }, [])

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
    <View className="node-index p-1">
      <Grid columns="2" gap="3" center={false} className="">
        {grid}
      </Grid>
    </View>
  )
}

export default Index
