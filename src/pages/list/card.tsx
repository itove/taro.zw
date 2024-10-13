import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'

function gotoNode(id, type = 3) {
  Taro.navigateTo({url: '/pages/node/show?type=' + type + '&id=' + id})
}

function gotoNodeIndex(region, type) {
  Taro.navigateTo({url: '/pages/node/index?region=' + region + '&type=' + type})
}

function goto(node, type) {
  if (type == 5 || type == 7) {
    gotoNodeIndex('shop', type)
  } else {
    gotoNode(node.id, type)
  }
}

function ListItem({node, type, index}) {
  return (
    <View className="card" onClick={() => goto(node, type)}>
      { type == 4 &&
      <View className="widget">
        <View className="badge">活动日期：2024/09/30 - 2024/10/30</View>
      </View>
      }

      <Image
      className="w-100 img"
      mode="aspectFill"
      src={Env.imageUrl + node.image}
      alt=""
      />
      <View className="text">
        <View className="title mb-10">
          <View className="left d-flex">
            {node.title}
            <View className="badge ms-5">进行中</View>
          </View>
          { type == 4 &&
          <View className="right">12.4km</View>
          }
          { (type == 5 || type == 7) &&
          <View className="right nav">
              <img className="me-5" width="16px" height="16px" src={Env.iconUrl + 'nav-blue.png'} /> 导航
          </View>
          }
        </View>
        { type == 4 &&
        <View className="info mb-10">
          <View className="">主办方：十堰市某单位</View>
          <View className="">活动地点：活动地点</View>
        </View>
        }
        { (type == 5 || type == 7) &&
        <>
        <View className="d-flex mb-10 tags">
          <View className="tag tag-b-r me-8">驻场商家125</View>
          <View className="tag tag-b-r me-8">共6层</View>
          <View className="tag tag-b-r me-8">营业时间：10:00-19:00</View>
        </View>
        <View className="info">
          <img className="me-5" width="12px" height="12px" src={Env.iconUrl + 'location-grey.png'} />
          某某区某街道民主路34号
        </View>
        </>
        }
      </View>
    </View>
  )
}

function Index() {
  const [list, setList] = useState([])
  const instance = Taro.getCurrentInstance();
  const region = instance.router.params.region
  const title = instance.router.params.title
  const type = instance.router.params.type ? instance.router.params.type : 2

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'nodes/' + region
    })
    .then(res => {
      const data = res.data
      console.log(res)

      Taro.setNavigationBarTitle({
        title: data.region
      })

      setList(data.jing.map((node, index) => <ListItem node={node} type={type} index={index} />))
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <View className="card-list">
      <View className="list">
        {list} 
      </View>
    </View>
  )
}

export default Index
