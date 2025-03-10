import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { View, Image, Text, Picker } from '@tarojs/components'
import { Grid } from '@nutui/nutui-react-taro'
import './index.scss'
// import VirtualList from '@tarojs/components-advanced/dist/components/virtual-list'

function gotoNode(id, type = 2) {
  console.log(type)
  if (type == 1 || type == 2) {
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
        { type == 3 &&
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
          <View className="ellipsis" style="width: 80%">{node.address}</View>
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
    <View onClick={() => gotoNode(node.id, 7)} className={'grid-item-' + type}>
      <Image className="w-100 img" src={Env.imageUrl + node.image} mode="aspectFill" />
      <View className="text">
        <View className="title d-flex mb-10">
          <View className="ellipsis">{node.title}</View>
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

function Index() {
  const instance = Taro.getCurrentInstance();
  const region = instance.router.params.region
  const title = instance.router.params.title
  const uid = instance.router.params.uid
  const type = instance.router.params.type ? instance.router.params.type : 2
  const [userLocation, setUserLocation] = useState({})

  const [nodes, setNodes] = useState([])
  const [sorts, setSorts] = useState(['降序', '升序'])
  const [categories, setCategories] = useState([])
  const [areas, setAreas] = useState([])
  // const [areas, setAreas] = useState(['全部', '红卫街道', '花果街道', '黄龙镇', '西沟乡', '方滩乡'])
  const [selectedOrder, setSelectedOrder] = useState('DESC')
  const [selectedCate, setSelectedCate] = useState(0)
  const [selectedArea, setSelectedArea] = useState(0)
  const [sortText, setSortText] = useState('排序')
  const [cateText, setCateText] = useState('类别')
  const [areaText, setAreaText] = useState('地区')

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

  useEffect(() => {
    // console.log(uid)
    let url = Env.apiUrl + 'nodes/' + region
    if (uid !== undefined ) {
      url = Env.apiUrl + 'fav?region=' + region + '&uid=' + uid
    }

    getNodes(region)
  }, [])

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'taxons/'
    })
    .then(res => {
      const c = res.data.categories
      const a = res.data.areas
      c.unshift({name: '全部'})
      a.unshift({name: '全部'})
      setCategories(c)
      setAreas(a)
    })
  }, [])

  const getNodes = (region, sort = 'DESC', cate = 0, area = 0) => {
    let url = Env.apiUrl + 'nodes/' + region + '?order=' + sort
    if (cate > 0 ) {
      url = url + '&cate=' + cate
    }
    if (area > 0) {
      url = url + '&area=' + area
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

      setNodes(data.nodes)

      Taro.getLocation({
        // type: 'wgs84',
        type: 'gcj02',
      }).then((res) => {
        console.log(res)
        setUserLocation({lat: res.latitude, long: res.longitude})

        setNodes(data.nodes.map((node, index) => {
          node.distance = getDistance(res.latitude, res.longitude, node.latitude, node.longitude)
          return node
        }))
    })
    .catch(err => {
      console.log(err)
    })
    })
  }

  const sortChange = (e) => {
    console.log('sort change')
    const v = Number(e.detail.value)
    console.log(v)
    let order = 'DESC'
    if (v !== 0) {
      order = 'ASC'
    }
    setSelectedOrder(order)
    setSortText(sorts[v])
    getNodes(region, order, categories[selectedCate].id, selectedArea)
  }

  const cateChange = (e) => {
    console.log('cate change')
    const v = Number(e.detail.value)
    console.log(v)
    console.log(categories[v])
    setSelectedCate(v)
    setCateText(categories[v].name)
    getNodes(region, selectedOrder, categories[v].id, areas[selectedArea].id)
  }

  const areaChange = (e) => {
    console.log('area change')
    const v = Number(e.detail.value)
    console.log(v)
    setSelectedArea(v)
    setAreaText(areas[v].name)
    getNodes(region, selectedOrder, categories[selectedCate].id, areas[v].id)
  }

  return (
    <View className={"node-index p-1 " + region}>

    {type == 3 &&
    <View className="sort">
      <View>
        <Picker mode='selector' range={sorts} onChange={sortChange}>
          <View className="picker">
            <Text className=''> {sortText}</Text>
            <img className="ms-5" width="16px" height="16px" src={Env.iconUrl + 'chevron-down.svg'} />
          </View>
        </Picker>
      </View>
      <View>
        <Picker mode='selector' range={categories} rangeKey="name" onChange={cateChange}>
          <View className="picker">
            <Text className=''> {cateText}</Text>
            <img className="ms-5" width="16px" height="16px" src={Env.iconUrl + 'chevron-down.svg'} />
          </View>
        </Picker>
      </View>
      <View>
        <Picker mode='selector' range={areas} rangeKey="name" onChange={areaChange}>
          <View className="picker">
            <Text className=''> {areaText}</Text>
            <img className="ms-5" width="16px" height="16px" src={Env.iconUrl + 'chevron-down.svg'} />
          </View>
        </Picker>
      </View>
    </View>
    }

    { (type == 2 || type == 5 || type == 7) &&
      <View columns="2" gap="5" center={false} className="grid">
        {nodes.map((node, index) => <GridItem node={node} type={type} key={index} /> )}
      </View>
    }
    { (type != 2 && type != 5 && type != 7) &&
      <View className="list">
        {nodes.map((node, index) => <ListItem node={node} type={type} key={index} /> )}
      </View>
    }
    </View>
  )
}

export default Index
