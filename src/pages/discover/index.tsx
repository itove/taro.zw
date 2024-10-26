import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { View, Image } from '@tarojs/components'
import { Avatar } from '@nutui/nutui-react-taro'
import './index.scss'
// import VirtualList from '@tarojs/components-advanced/dist/components/virtual-list'

function gotoNode(id, region = 'talk') {
  Taro.navigateTo({url: '/pages/node/show?region=' + region + '&id=' + id})
}

// style={{height: getRandomArbitrary(300, 400) + 'px'}} 
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
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
  const region = instance.router.params.region ? instance.router.params.region: 'all'
  const title = instance.router.params.title
  // const uid = instance.router.params.uid
  const type = instance.router.params.type ? instance.router.params.type : 2

  const [list, setList] = useState([])
  const [nodes, setNodes] = useState([])
  const [logged, setLogged] = useState(false)
  const [uid, setUid] = useState(0)

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

  function onToggleFav(id) {
    const newList = nodes.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          favs: [...item.favs, uid],
        }

        return updatedItem;
      }

      return item;
    })

    setNodes(newList);
  }

  function GridItem({node, index, type}) {
    return (
      <View key={index} className="grid-item rounded overflow-hidden">
        <Image className="w-100 img" style={{height: 300 + 'px'}} src={Env.imageUrl + node.image} mode="aspectFill" onClick={() => gotoNode(node.id, 'talk')} />
        <View className="text">
          <View className="ellipsis">{node.title}</View>
          <View className="more">
            <View className="user">
              <Avatar
                size="24"
                src={Env.imageUrl + node.author.avatar}
                className="me-5"
              />
              <View className="ellipsis">{node.author.name}</View>
            </View>
            <View className="fav" onClick={() => onToggleFav(node.id)}>
              <img className="icon me-5" width="16px" height="16px" src={Env.iconUrl + 'heart-grey.svg'} />
              <View className="count">{node.favs.length}</View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  useEffect(() => {
    // console.log(uid)
    let url = Env.apiUrl + 'nodes/talk'
    Taro.request({
      url
    })
    .then(res => {
      const data = res.data
      console.log(res)

      // Taro.setNavigationBarTitle({
      //   title: data.region
      // })

      setNodes(data.nodes)

      Taro.getStorage({
        key: Env.storageKey
      })
      .then(res => {
        setLogged(true)
        setUid(res.data.id)
      })
    })
    .catch(err => {
      console.log(err)
    })


  }, [])

  return (
    <View className="discover-index p-1">
      <View className="grid">
        {nodes.map((node, index) => <GridItem node={node} key={index} />)}
      </View>
    </View>
  )
}

export default Index
