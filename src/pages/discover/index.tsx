import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { View, Image } from '@tarojs/components'
import { Grid, Avatar } from '@nutui/nutui-react-taro'
import './index.scss'
// import VirtualList from '@tarojs/components-advanced/dist/components/virtual-list'

function gotoNode(id, type = 2) {
  Taro.navigateTo({url: '/pages/node/show?type=' + type + '&id=' + id})
}

function ListItem({node, index, type}) {
  return (
    <View key={index} className="list-item" onClick={() => gotoNode(node.id, type)}>
    <View className="img">
    <Image className="w-100 rounded" src={Env.imageUrl + node.image} mode="aspectFill" />
    </View>
    <View className="text">
    {node.title}
    <p className="ellipsis-2">{node.summary}</p>
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
  const region = instance.router.params.region ? instance.router.params.region: 'jing'
  const title = instance.router.params.title
  const uid = instance.router.params.uid
  const type = instance.router.params.type ? instance.router.params.type : 2
  const [avatarUrl, setAvatarUrl] = useState(Env.imageUrl + 'avatar.png')

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

      // Taro.setNavigationBarTitle({
      //   title: data.region
      // })

      setList(data.nodes.map((node, index) =>

          type == 2
          &&
    <Grid.Item key={index} className="grid-list rounded overflow-hidden" onClick={() => gotoNode(node.id, type)}>
    <Image className="w-100" src={Env.imageUrl + node.image} mode="aspectFill" />
    <View className="text">
      <View>{node.title}</View>
      <View className="more">
        <View className="user">
          <Avatar
            size="32"
            src={avatarUrl}
            className="me-5"
          />
          <View>林丹丹</View>
        </View>
        <View className="like">
        <img className="icon me-5" width="16px" height="16px" src={Env.iconUrl + 'suit-heart-gray.svg'} />
        3.1K</View>
      </View>
    </View>
    </Grid.Item>
          ||
          <ListItem node={node} type={type}/>
        )
      )
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <View className="node-index p-1">
    {type == 2 &&
      <Grid columns="2" gap="3" center={false} className="grid">
        {list}
      </Grid>
    }
    {type != 2 &&
      <View className="list">
        {list}
      </View>
    }
    </View>
  )
}

export default Index
