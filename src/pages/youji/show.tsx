import React, { useState, useEffect } from 'react'
import { View, Button, Image } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { fmtDate } from '../../utils/fmtDate'
import { Tabs, Empty } from '@nutui/nutui-react-taro'

function gotoNode(nid, type) {
  console.log('go to node ', nid);
  console.log('type ', type);
  if (type === 0) {
    Taro.navigateTo({url: 'show?nid=' + nid})
  } else {
    // Taro.navigateTo({url: 'new?nid=' + nid})
  }
}

function Index() {
  const [nodes, setNodes] = useState([])
  const [nodes1, setNodes1] = useState([])
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
        url: Env.apiUrl + 'youji?uid=' + res.data.id
      })
      .then(res => {
        console.log(res)
        setNodes(res.data[0])
        setNodes1(res.data[1])
      })
    })
    .catch(err => {
      console.log(err)
      // Taro.redirectTo({url: '/pages/me/login'})
    })
  }, [])

  function delNode(nid, uid) {
    console.log('delete node ', nid);
    console.log('uid ', uid);
      Taro.showModal({
        title: '提示',
        content: '确定删除？',
        success: function (res) {
          if (res.confirm) {
            Taro.request({
              method: 'DELETE',
              data: { uid: uid },
              url: Env.apiUrl + 'youji/' + nid
            }).then((res) =>{
              if (res.statusCode === 200) {
                Taro.request({
                  url: Env.apiUrl + 'youji?uid=' + uid
                })
                .then(res => {
                  console.log(res)
                  setNodes(res.data[0])
                  setNodes1(res.data[1])
                })
                Taro.showToast({
                  title: '草稿已取消',
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

  function GridItem({node, index, type, uid}) {
    return (
      <View key={index} className="grid-item rounded overflow-hidden">
        <Image onClick={() => gotoNode(node.id, type)} className="w-100 img" src={Env.imageUrl + node.image} mode="aspectFill" />
        <View className="text">
          <View className="ellipsis mb-8">{node.title}</View>
          <View className="more">
            <View>{fmtDate(new Date(node.createdAt), 4)}</View>
            { type === 0 &&
            <View className="fav">
              <img className="icon me-5" height="16px" width="16px" src={Env.iconUrl + 'heart-pink-fill.svg'} />
              <View className="count">{node.favs.length}</View>
            </View>
            ||
            <View className="fav">
              <img className="icon me-5" height="16px" width="16px" src={Env.iconUrl + 'trash.svg'} onClick={() => delNode(node.id, uid) } />
            </View>
            }
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className="youji-index p-1">
      <Tabs
        value={tab1value}
        autoHeight={true}
        align="left"
        activeType="smile"
        onChange={(value) => {
          setTab1value(value)
        }}
        className=""
      >
        <Tabs.TabPane title="我发布的">
          { nodes.length > 0 &&
          <View className="grid">
            {nodes.map((node, index) => <GridItem node={node} index={index} type={0} uid={uid} />)}
          </View>
          ||
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
          }
        </Tabs.TabPane>
        <Tabs.TabPane title="我的草稿">
          { nodes1.length > 0 &&
          <View className="grid">
            {nodes1.map((node, index) => <GridItem node={node} index={index} type={1} uid={uid} />)}
          </View>
          ||
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
          }
        </Tabs.TabPane>
      </Tabs>
    </View>
  )
}

export default Index
