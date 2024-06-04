import React, { useState, useEffect } from 'react'
import { View, Image, Button } from '@tarojs/components'
import './show.scss'
import Taro from '@tarojs/taro'
import { Tabs, ImagePreview } from '@nutui/nutui-react-taro'
import Image1 from '../../images/image1.png'
import Hotline from '../../icons/hotline.png'
import Location from '../../icons/location.png'
import Call from '../../icons/call.png'
import Pic from '../../icons/image.png'
import Bookmark from '../../icons/bookmark.png'

function Index() {
  const [showPreview, setShowPreview] = useState(false)
  const [previewImages, setPreviewImages] = useState([])

  // 0: 景点
  // 1: 住宿
  // 2: 商品
  // 3: normal node
  // 4: 走进东沟
  const type = 4

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '详情'
    })
    // console.log(nodeList)
    // Taro.getStorage({
    //   key: Env.storageKey
    // })
    // .then(res => {
    //   console.log('logged in')
    //   setUser(res.data)
    //   getNodes(res.data.id)
    // })
    // .catch(err => {
    //   console.log(err)
    //   setNodeList([])
    //   // Taro.redirectTo({url: '/pages/me/login'})
    // })
  }, [])

  const node = {
    title: '云上牡丹园',
    tags: [
      '品种齐全',
      '拍照打卡',
    ],
    summary: '目前整个园园区牡丹栽植面积达到80余亩，近区牡丹栽植面积达到80余亩，近年来牡丹园又多次...',
    address: '湖北省十堰市茅箭区茅塔乡东沟村一组湖北省十堰市茅箭区茅塔乡东沟村一组',
    name: '桃园人家',
    phone: '0719-8457770',
    body: '<b>test</b><p>tes2</p><h3>sadff</h3>',
    rooms: [
      {
        title: '桃园人家大床房',
        images: [
          {
            src: Image1,
          },
          {
            src: Image1,
          },
          {
            src: Image1,
          },
        ],
        summary: 'very long 1.2M宽宽单人床2张 1-5楼 无早 可住宽单人床2张 1-5楼 无早 可住宽单人床2张 1-5楼 无早 可住宽单人床2张 1-5楼 无早 可住单人床2张 1-5楼 无早 可住2人',
        tags: ['电视/投影仪', '书桌', '衣架', '有窗户', '独立卫浴'],
      },
      {
        title: '桃园人家大床房',
        images: [
          {
            src: Image1,
          },
          {
            src: Image1,
          },
          {
            src: Image1,
          },
        ],
        summary: '1.2M宽单人床2张 1-5楼 无早 可住2人',
        tags: ['电视/投影仪', '书桌', '衣架', '有窗户', '独立卫浴'],
      },
      {
        title: '桃园人家大床房',
        images: [
          {
            src: Image1,
          },
          {
            src: Image1,
          },
          {
            src: Image1,
          },
        ],
        summary: '1.2M宽单人床2张 1-5楼 无早 可住2人',
        tags: ['电视/投影仪', '书桌', '衣架', '有窗户', '独立卫浴'],
      },
      {
        title: '桃园人家大床房',
        images: [
          {
            src: Image1,
          },
          {
            src: Image1,
          },
          {
            src: Image1,
          },
        ],
        summary: '1.2M宽单人床2张 1-5楼 无早 可住2人',
        tags: ['电视/投影仪', '书桌', '衣架', '有窗户', '独立卫浴'],
      },
      {
        title: '桃园人家大床房',
        images: [
          {
            src: Image1,
          },
          {
            src: Image1,
          },
          {
            src: Image1,
          },
        ],
        summary: '1.2M宽单人床2张 1-5楼 无早 可住2人',
        tags: ['电视/投影仪', '书桌', '衣架', '有窗户', '独立卫浴'],
      },
    ],
    qr: Image1
  }

  const tags = []

  node.tags.map((i, index) => {
    tags.push(
      <View key={index}>{i}</View>
    )
  })

  const rooms = []

  node.rooms.map((i, index) => {
    const tags = []
    i.tags.map((j, ind) => {
      tags.push(
        <View key={ind}>{j}</View>
      )
    })
    rooms.push(
      <View key={index} className="list">
        <View className="img">
          <Image className="w-100" mode="scaleToFill" src={i.images[0].src} onClick={() => preview(i.images)} />
          <View className="count">
            <img src={Pic} />
            {i.images.length}
          </View>
        </View>
        <View className="info">
          <View className="title">
          {i.title}
          </View>
          <View className="summary">
          {i.summary}
          </View>
          <View className="tags">
          {tags}
          </View>
        </View>
        <View className="reserve">
        <Button className='btn-primary' size="mini" onClick={() => preview([{src:node.qr}])}>预定</Button>
        </View>
      </View>
    )
  })

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

      <Image className="w-100" src={Image1} mode="widthFix" />

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
                src={Hotline}
              />
              </View>
            <View className="">语音讲解</View>
          </View>
          }
          { type == 1 &&
          <View className="right">
            <View className="icon">
              <img
                src={Call}
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
                src={Location}
              />
              <View> asdf </View>
            </View>
            <View className="item">
              <img
                src={Location}
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
                src={Bookmark}
              />
              <View> asdf </View>
            </View>
            <View className="item">
              <img
                src={Bookmark}
              />
              <View> asdf </View>
            </View>
            <View className="item">
              <img
                src={Bookmark}
              />
              <View> asdf </View>
            </View>
            <View className="item">
              <img
                src={Bookmark}
              />
              <View> asdf </View>
            </View>
          </View>
        }

        { type == 2 &&
        <View className="contact">
          <View className="img">
            <Image mode="widthFix" className="w-100" src={Image1} />
          </View>
          <View className="">
            <View className="name">
              {node.name}
            </View>
            <View className="phone">
              <img src={Call} />
              电话：{node.phone}
            </View>
          </View>
        </View>
        }

        { type < 3 &&
        <View className="address">
          <View className="text">{node.address}</View>
          <View className="right">
            <View className="icon">
              <img
                src={Location}
              />
            </View>
            <View className="">地图导航</View>
          </View>
        </View>
        }
      </View>

      { (type == 0 || type == 2) &&
      <View className="p-1 card-1">
        <View className="title acive"> 景点介绍 </View>
      </View>
      }

      { type != 1 &&
      <View dangerouslySetInnerHTML={{__html: node.body}} className='body p-1'></View>
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
          <View dangerouslySetInnerHTML={{__html: node.body}} className='body'></View>
        </Tabs.TabPane>
      </Tabs>
      }

    </View>
  )
}

export default Index
