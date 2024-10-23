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

function openLocation(latitude, longitude) {
  Taro.openLocation({
    latitude,
    longitude,
    scale: 15
  })
}

function Rad(d) { 
  //根据经纬度判断距离
  return d * Math.PI / 180.0;
}

/**
 * lat1/lng1 user's
 * lat2/lng2 target's
 */
function getDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = Rad(lat1);
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var b = Rad(lng1) - Rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  s = s.toFixed(1)
  return Number(s)
}

function ListItem({node, type, index}) {
  return (
    <View className="card">
      { type == 4 &&
      <View className="widget">
        <View className="badge">{node.tags[0]}</View>
      </View>
      }

      <Image
      className="w-100 img"
      mode="aspectFill"
      src={Env.imageUrl + node.image}
      alt=""
      onClick={() => goto(node, type)}
      />
      <View className="text">
        <View className="title mb-10">
          <View className="left d-flex" onClick={() => goto(node, type)}>
            {node.title}
            <View className="badge ms-5">{node.tags[0]}</View>
          </View>
          { (node.distance && type == 4) &&
          <View className="right">{node.distance}km</View>
          }
          { (node.latitude && node.longitude && (type == 5 || type == 7)) &&
          <View className="right nav" onClick={() => openLocation(node.latitude, node.longitude)}>
              <img className="me-5" width="16px" height="16px" src={Env.iconUrl + 'nav-blue.png'} /> 导航
          </View>
          }
        </View>
        { type == 4 &&
        <View className="info mb-10">
          <View className="">主办方：{node.note}</View>
          <View className="">活动地点：{node.address}</View>
        </View>
        }
        { (type == 5 || type == 7) &&
        <>
        <View className="d-flex mb-10 tags">
          <View className="tag tag-b-r me-8">{node.tags[0]}</View>
          <View className="tag tag-b-r me-8">{node.tags[1]}</View>
          <View className="tag tag-b-r me-8">{node.tags[2]}</View>
        </View>
        <View className="info">
          <img className="me-5" width="12px" height="12px" src={Env.iconUrl + 'location-grey.png'} />
          {node.address}
        </View>
        </>
        }
      </View>
    </View>
  )
}

function Index() {
  const [list, setList] = useState([])
  const [userLocation, setUserLocation] = useState({})
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

      setList(data.nodes.map((node, index) => <ListItem node={node} type={type} index={index} />))

      Taro.getLocation({
        // type: 'wgs84',
        type: 'gcj02',
      }).then((res) => {
        console.log(res)
        setUserLocation({lat: res.latitude, long: res.longitude})

        setList(data.nodes.map((node, index) => {
          node.distance = getDistance(res.latitude, res.longitude, node.latitude, node.longitude)
          return <ListItem node={node} type={type} index={index} />
        }))

      })

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
