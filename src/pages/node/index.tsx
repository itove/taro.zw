import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { View, Image } from '@tarojs/components'
import { Grid } from '@nutui/nutui-react-taro'
import './index.scss'
// import VirtualList from '@tarojs/components-advanced/dist/components/virtual-list'

function gotoNode(id, type = 2) {
  if (type === 1 || type === 2) {
    Taro.navigateTo({url: '/pages/node/show0?type=' + type + '&id=' + id})
  } else {
    Taro.navigateTo({url: '/pages/node/show?type=' + type + '&id=' + id})
  }
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

function ListItem({node, index, type}) {
  return (
    <View key={index} className="list-item" onClick={() => gotoNode(node.id, type)}>
      <Image className="img rounded" src={Env.imageUrl + node.image} mode="aspectFill" />
      <View className="text">
        <View>
        <View className="title mb-4">
          <View className="ellipsis" style="max-width: 65%">{node.title}</View>
          { type == 6 &&
          <View className="tag tag-y ms-5">{node.tags[0]}</View>
          }
        </View>
        { type != 6 &&
          <p className="ellipsis-2">{node.summary}</p>
        }
        </View>

        { type != 3 &&
        <>
        <View className="d-flex">
          <View className="tag tag-b-r">{node.tags[0]}</View>
        </View>
        <View className="d-flex">
          <View className="tag tag-b-r me-8">{node.tags[1]}</View>
          <View className="tag tag-b-r">{node.tags[2]}</View>
        </View>
        <View className="info">
          <img className="me-5" width="12px" height="12px" src={Env.iconUrl + 'location-grey.png'} />
          {node.address}
        </View>
        </>
        }


        { type == 3 &&
        <View className="info justify-between">
          <View className=""><img className="" width="16px" height="16px" src={Env.iconUrl + 'star-fill-gold.svg'} /> {node.rates.rate} ¥ {node.price / 100}/人</View>
          { node.distance && 
          <p className="">{node.distance}km</p>
          }
        </View>
        }
    </View>

    </View>
  )
}

function GridItem({node, index, type}) {
  return (
    <View onClick={() => gotoNode(node.id, 7)}>
      <Image className="w-100 img" src={Env.imageUrl + node.image} mode="aspectFill" />
      <View className="text">
        <View className="title d-flex justify-between mb-10">
          {node.title}
          { type == 7 &&
          <View className="tag tag-y ms-5">{node.tags[0]}</View>
          }
          { type == 5 &&
          <View className="price">¥{node.price / 100}</View>
          }
        </View>
        { type == 7 &&
        <View className="d-flex mb-10">
          <View className="tag tag-b-r me-8">{node.tags[0]}</View>
          <View className="tag tag-b-r me-8">{node.tags[1]}</View>
        </View>
        }
      </View>
    </View>
  )
}

/*
function GridItem({node, index, type}) {
  return (
    <Grid.Item text={node.title} key={index} className="grid-list rounded overflow-hidden" onClick={() => gotoNode(node.id)}>
    <Image className="w-100" src={Env.imageUrl + node.image} mode="aspectFill" />
    </Grid.Item>
  )
}
*/

function Index() {
  const instance = Taro.getCurrentInstance();
  const region = instance.router.params.region
  const title = instance.router.params.title
  const uid = instance.router.params.uid
  const type = instance.router.params.type ? instance.router.params.type : 2
  const [userLocation, setUserLocation] = useState({})

  const [list, setList] = useState([])

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

  // useEffect(() => {
  //   Taro.getLocation({
  //     // type: 'wgs84',
  //     type: 'gcj02',
  //     }).then((res) => {
  //       console.log(res)
  //       setUserLocation({lat: res.latitude, long: res.longitude})
  //     })
  // }, []);

  useEffect(() => {
    // console.log(uid)
    let url = Env.apiUrl + 'nodes/' + region
    if (uid !== undefined ) {
      url = Env.apiUrl + 'fav?region=' + region + '&uid=' + uid
    }
    Taro.request({
      url
    })
    .then(res => {
      const data = res.data
      console.log(res)

      Taro.setNavigationBarTitle({
        title: data.region ? data.region : '列表'
      })

      setList(data.nodes.map((node, index) => {
        return (type == 2 || type == 5 || type == 7)
        &&
        // <Grid.Item text={node.title} key={index} className="grid-list rounded overflow-hidden" onClick={() => gotoNode(node.id, type)}>
        // <Image className="w-100" src={Env.imageUrl + node.image} mode="aspectFill" />
        // </Grid.Item>
            <GridItem node={node} type={type} key={index}/>
          ||
            <ListItem node={node} type={type} key={index} />
        }
        ))

      Taro.getLocation({
        // type: 'wgs84',
        type: 'gcj02',
      }).then((res) => {
        console.log(res)
        setUserLocation({lat: res.latitude, long: res.longitude})

        setList(data.nodes.map((node, index) => {
          node.distance = getDistance(res.latitude, res.longitude, node.latitude, node.longitude)
          return (type == 2 || type == 5 || type == 7)
          &&
              <GridItem node={node} type={type} key={index} />
            ||
              <ListItem node={node} type={type} key={index} />
          }
          ))

      })

    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <View className={"node-index p-1 " + region}>

    {type == 3 &&
    <View className="sort">
      <View>
        排序
        <img className="ms-5" width="16px" height="16px" src={Env.iconUrl + 'chevron-down.svg'} />
      </View>
      <View>
        类别
        <img className="ms-5" width="16px" height="16px" src={Env.iconUrl + 'chevron-down.svg'} />
      </View>
      <View>
        地区
        <img className="ms-5" width="16px" height="16px" src={Env.iconUrl + 'chevron-down.svg'} />
      </View>
    </View>
    }

    { (type == 2 || type == 5 || type == 7) &&
      <View columns="2" gap="5" center={false} className="grid">
        {list}
      </View>
    }
    { (type != 2 && type != 5 && type != 7) &&
      <View className="list">
        {list}
      </View>
    }
    </View>
  )
}

export default Index
