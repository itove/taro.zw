import React, { useState, useEffect } from 'react'
import { View, Image, Button } from '@tarojs/components'
import './show.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Tabs, ImagePreview } from '@nutui/nutui-react-taro'

Taro.options.html.transformElement = (el) => {
  if (el.nodeName === 'image') {
    el.setAttribute('mode', 'widthFix')
    el.setAttribute('src', Env.baseUrl + el.getAttribute('src'))
  }
  return el
}

function Index() {
  const [node, setNode] = useState({})
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [isFav, setIsFav] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const [logged, setLogged] = useState(false)

  const instance = Taro.getCurrentInstance();
  const id = instance.router.params.id
  const type = instance.router.params.type ? instance.router.params.type : 2

  // 0: you // 1: zhu // 2: chi & normal node // 3: gou // 4: 走进东沟

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'nodes/' + id
    })
    .then(res => {
      const node = res.data
      setNode(node)
      console.log(node)
      setBody(node.body.replace(/&nbsp;/g, ''))

      Taro.setNavigationBarTitle({
        title: node.title
      })

      setTags(node.tags.map((i, index) => <View key={index}>{i}</View> ))
    })
  }, [])

  useEffect(() => {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      setLogged(true)
      Taro.request({
        url: Env.apiUrl + 'isfav?uid=' + res.data.id + '&nid=' + id
      })
      .then(res => {
        console.log(res.data)
        setIsFav(res.data.isFav)
      })
    })
    .catch(err => {
      console.log(err)
      // Taro.redirectTo({url: '/pages/me/login'})
    })
  }, [])


  // const rooms = []

  // node.rooms.map((i, index) => {
  //   const tags = []
  //   i.tags.map((j, ind) => {
  //     tags.push(
  //       <View key={ind}>{j}</View>
  //     )
  //   })
  //   rooms.push(
  //     <View key={index} className="list">
  //       <View className="img">
  //         <Image className="w-100" mode="scaleToFill" src={i.images[0].src} onClick={() => preview(i.images)} />
  //         <View className="count">
  //           <img src={Env.iconUrl + 'image.png'} />
  //           {i.images.length}
  //         </View>
  //       </View>
  //       <View className="info">
  //         <View className="title">
  //         {i.title}
  //         </View>
  //         <View className="summary">
  //         {i.summary}
  //         </View>
  //         <View className="tags">
  //         {tags}
  //         </View>
  //       </View>
  //       <View className="reserve">
  //       <Button className='btn-primary' size="mini" onClick={() => preview([{src:node.qr}])}>预定</Button>
  //       </View>
  //     </View>
  //   )
  // })

  const preview = (images) => {
    setPreviewImages(images)
    setShowPreview(true)
  }

  const [tab1value, setTab1value] = useState<string | number>('0')

  return (
    <View className="show">

      <ImagePreview
        autoPlay
        // visible={true}
        images={previewImages}
        visible={showPreview}
        onClose={() => setShowPreview(false)}
      />

      <Image className="w-100 hero" src={Env.imageUrl + node.image} mode="widthFix" />

      <View className="p-1 card">

        <View className="header">
          <View className="">
            <View className="title">{node.title}</View>
            { (type == 0 || type == 1) &&
            <View className="tags">{tags}</View>
            }
          </View>
          { type == 0 &&
          <View className="right">
            <View className="icon">
              <img
                src={Env.iconUrl + 'hotline.png'}
              />
              </View>
            <View className="">语音讲解</View>
          </View>
          }
          { type == 1 &&
          <View className="right">
            <View className="icon">
              <img
                src={Env.iconUrl + 'call.png'}
              />
              </View>
            <View className="">电话</View>
          </View>
          }
        </View>

        { (type == 0 || type == 1) &&
        <View className="summary">{node.summary}</View>
        }

        { type == 4 &&
          <View className="info-1">
            <View className="item">
              <img
                src={Env.iconUrl + 'location-1.png'}
              />
              <View> asdf </View>
            </View>
            <View className="item">
              <img
                src={Env.iconUrl + 'call-1.png'}
              />
              <View> asdf </View>
            </View>
          </View>
        }

        <View className="divider"></View>

        { type == 4 &&
          <View className="info-2">
            <View className="item">
              <img
                src={Env.iconUrl + 'bookmark.png' }
              />
              <View> asdf </View>
            </View>
            <View className="item">
              <img
                src={Env.iconUrl + 'honor.png' }
              />
              <View> asdf </View>
            </View>
            <View className="item">
              <img
                src={Env.iconUrl + 'map.png' }
              />
              <View> asdf </View>
            </View>
            <View className="item">
              <img
                src={Env.iconUrl + 'letter.png' }
              />
              <View> asdf </View>
            </View>
          </View>
        }

        { type == 3 &&
        <View className="contact">
          <View className="img">
            <Image mode="widthFix" className="w-100" src={Env.imageUrl + node.image} />
          </View>
          <View className="">
            <View className="name">
              {node.name}
            </View>
            <View className="phone">
              <img src={Env.iconUrl + 'call.png'} />
              电话：{node.phone}
            </View>
          </View>
        </View>
        }

        { (type != 2 && type != 4) &&
        <View className="address">
          <View className="text">{node.address}</View>
          <View className="right">
            <View className="icon">
              <img
                src={Env.iconUrl + 'location.png'}
              />
            </View>
            <View className="">地图导航</View>
          </View>
        </View>
        }
      </View>

      { (type == 0 || type == 2 || type == 3) &&
      <View className="p-1 card-1">
        <View className="no-overflow title acive"> { type == 0 && '景点介绍' || '商品详情' }</View>
      </View>
      }

      { type != 1 &&
      <View dangerouslySetInnerHTML={{__html: body}} className='body p-1'></View>
      }

      { type == 1 &&
      <Tabs
        value={tab1value}
        onChange={(value) => {
          setTab1value(value)
        }}
        align="left"
        className="rooms"
      >
        <Tabs.TabPane title="房间预定">
          <View>
            {rooms}
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane title="酒店详情">
          <View dangerouslySetInnerHTML={{__html: body}} className='body'></View>
        </Tabs.TabPane>
      </Tabs>
      }

    </View>
  )
}

export default Index
