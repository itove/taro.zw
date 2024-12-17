import React, { useState, useEffect } from 'react'
import { View, Button, Image } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { fmtDate } from '../../utils/fmtDate'
import { Empty } from '@nutui/nutui-react-taro'

function gotoNode(nid) {
  console.log('go to node ', nid);
  Taro.navigateTo({url: '/pages/node/show0?type=1&id=' + nid})
}

function Index() {
  const [nodes, setNodes] = useState([])
  const [uid, setUid] = useState(0)
  const [user, setUser] = useState({})
  const [tab1value, setTab1value] = useState<string | number>('0')

  useEffect(() => {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      let u = res.data
      setUser(u)
      setUid(u.id)
      Taro.request({
        url: Env.apiUrl + 'fav?uid=' + res.data.id
      })
      .then(res => {
        console.log(res)
        setNodes(res.data.nodes)
      })
    })
    .catch(err => {
      console.log(err)
      // Taro.redirectTo({url: '/pages/me/login'})
    })
  }, [])

  function unFav(nid, uid) {
    console.log('unfav node ', nid);
    console.log('uid ', uid);
      Taro.showModal({
        title: '提示',
        content: '确定删除？',
        success: function (res) {
          if (res.confirm) {
            Taro.request({
              method: 'POST',
              data: { uid, nid },
              url: Env.apiUrl + 'fav/remove'
            }).then((res) =>{
              if (res.statusCode === 200) {
                console.log(res.data.nodes)
                setNodes(res.data.nodes)
                Taro.showToast({
                  title: '已取消收藏',
                  icon: 'success',
                  duration: 2000,
                  success: () => {
                    // setTimeout(
                    //   () => {
                    //     Taro.reLaunch({url: '/pages/order/index'})
                    //   }, 500
                    // )
                  }
                })
              }
            })
          } else if (res.cancel) {
          }
        }
      })
  }

  function GridItem({node, index, uid}) {
    return (
      <View key={index} className="grid-item rounded overflow-hidden">
        <Image onClick={() => gotoNode(node.id)} className="w-100 img" src={Env.imageUrl + node.image} mode="aspectFill" />
        <View className="text">
          <View className="ellipsis mb-8">{node.title}</View>
          <View className="more">
            <View></View>
            <View className="fav">
              <img className="icon me-5" height="16px" width="16px" src={Env.iconUrl + 'trash.svg'} onClick={() => unFav(node.id, uid) } />
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className="fav-index p-1">
        { nodes.length > 0 &&
        <View className="grid">
          {nodes.map((node, index) => <GridItem node={node} index={index} uid={uid} />)}
        </View>
        ||
        <View>
          <Empty status="empty" description="抱歉，未找到相关内容哦~"
          image={<img src={Env.imageUrl+ 'empty.png'} />}
          imageSize={120}
          />
        </View>
        }
    </View>
  )
}

export default Index
