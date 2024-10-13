import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { View, Image } from '@tarojs/components'
import { Grid } from '@nutui/nutui-react-taro'
import './index.scss'
// import VirtualList from '@tarojs/components-advanced/dist/components/virtual-list'

function gotoNode(id, type = 2) {
  Taro.navigateTo({url: '/pages/node/show?type=' + type + '&id=' + id})
}

function ListItem({node, index, type}) {
  return (
    <View key={index} className="list-item" onClick={() => gotoNode(node.id, type)}>
      <Image className="img rounded" src={Env.imageUrl + node.image} mode="aspectFill" />
    <View className="text">
      <View className="title">
        {node.title}
        { type != 6 &&
        <p className="ellipsis-2">{node.summary}</p>
        }
        { type == 6 &&
        <>
        <View className="tag tag-y ms-5">开放中</View>
        </>
        }
      </View>

      <View className="d-flex">
        <View className="tag tag-b-r">周一至周日：09:00-18:00</View>
      </View>
      <View className="d-flex">
        <View className="tag tag-b-r me-8">预约入馆</View>
        <View className="tag tag-b-r">免费开放</View>
      </View>
      <View className="info">
        <img className="me-5" width="12px" height="12px" src={Env.iconUrl + 'location-grey.png'} />
        某某区某街道民主路34号
      </View>


      { type != 6 &&
      <View className="info">
        <View className=""><img className="" width="16px" height="16px" src={Env.iconUrl + 'star-fill-gold.svg'} /> 4.5 ¥ 111/人</View>
        <p className="">3.1km</p>
      </View>
      }
    </View>

    </View>
  )
}

function GridItem({node, index, type}) {
  return (
    <View>
      <Image className="w-100 img" src={Env.imageUrl + node.image} mode="aspectFill" />
      <View className="text">
        <View className="title d-flex mb-10">
          {node.title}
          { type == 7 &&
          <View className="tag tag-y ms-5">营业中</View>
          }
          { type == 5 &&
          <View className="price">¥39</View>
          }
        </View>
        { type == 7 &&
        <View className="d-flex mb-10">
          <View className="tag tag-b-r me-8">可堂食</View>
          <View className="tag tag-b-r me-8">2楼</View>
          <View className="tag tag-b-r me-8">超市</View>
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

  const [list, setList] = useState([])

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

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

      setList(data.nodes.map((node, index) => 
        (type == 2 || type == 5 || type == 7)
        &&
        // <Grid.Item text={node.title} key={index} className="grid-list rounded overflow-hidden" onClick={() => gotoNode(node.id, type)}>
        // <Image className="w-100" src={Env.imageUrl + node.image} mode="aspectFill" />
        // </Grid.Item>
            <GridItem node={node} type={type} key={index}/>
          ||
            <ListItem node={node} type={type} key={index}/>
        ))
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <View className="node-index p-1">

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
