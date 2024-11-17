import React, { useState, useEffect } from 'react'
import { View, Button } from '@tarojs/components'
import { Avatar } from "@nutui/nutui-react-taro"
import './index.scss'
import Taro from '@tarojs/taro'
import { useDidShow } from '@tarojs/taro'
import { Env } from '../../env'

function More({text}) {
  return (
    <View
      className="more" 
    >
    全部{text} <img width="16px" height="16px" src={Env.iconUrl + 'arrow-right.png'} />
    </View>
  )
}

function Index() {
  const [logged, setLogged] = useState(false)
  const [user, setUser] = useState({})
  const [uid, setUid] = useState(0)
  const [avatarUrl, setAvatarUrl] = useState(Env.imageUrl + 'avatar.jpg')
  const [favCount, setFavCount] = useState(0)
  const [planCount, setPlanCount] = useState(0)
  const [youCount, setYouCount] = useState(0)
  const [couponCount, setCouponCount] = useState(0)

  useEffect(() => {
    console.log('page me useEffect')
  }, [])

  useDidShow(() => {
    console.log('page me show')
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      setLogged(true)
      // fetch data
      Taro.request({
        url: Env.apiUrl + 'users/' + res.data.id
      })
      .then(res => {
        console.log(res)
        let u = res.data
        setUser(u)
        setUid(u.id)
        setFavCount(u.favCount)
        setPlanCount(u.planCount)
        setYouCount(u.youCount)
        if (u.avatar !== undefined && u.avatar !== null) {
          setAvatarUrl(Env.imageUrl + u.avatar)
        }
      })
    })
    .catch(err => {
      console.log(err)
      // Taro.redirectTo({url: '/pages/me/login'})
    })
  })

  const goto = (region) => {
    if (logged) {
      Taro.navigateTo({ url: '/pages/node/index?region=' + region + '&uid=' + uid})
    } else {
      Taro.navigateTo({ url: 'login'})
    }
  }

  const gotoInfo = () => {
    if (logged) {
      Taro.navigateTo({ url: 'info'})
    } else {
      Taro.navigateTo({ url: 'login'})
    }
  }

  return (
    <View className="me">
      <View className="user">
        <View onClick={gotoInfo}>
          <Avatar
            size="75"
            src={avatarUrl}
          />
        </View>
        <View className="">
            { logged &&
            <View onClick={() => Taro.navigateTo({url: 'info'})}>{user.name}</View>
            ||
            <View onClick={() => Taro.navigateTo({url: 'login'})}>请点击登录</View>
            }
        </View> 
      </View>

      <View className="block">
        <View className="info">
          <View className="item">
            <View className="">{favCount}</View>
            <View className="">收藏</View>
          </View>
          <View className="item">
            <View className="">{couponCount}</View>
            <View className="">优惠券</View>
          </View>
          <View className="item">
            <View className="">{planCount}</View>
            <View className="">行程</View>
          </View>
          <View className="item" onClick={() => Taro.navigateTo({url: '/pages/youji/index'})}>
            <View className="">{youCount}</View>
            <View className="">游记</View>
          </View>
        </View>
        <Button className="btn">开始你的游记</Button>
      </View>

      <View className="block">
        <View className="header">
          我的订单
          <More text={'订单'} />
        </View>
        <View className="info-2">
          <View className="item" onClick={() => goto('youzai')}>
            <img
              src={Env.iconUrl + 'grid_1.png'}
            />
            <View> 待付款 </View>
          </View>
          <View className="item" onClick={() => goto('zhuzai')} >
            <img
              src={Env.iconUrl + 'grid_2.png'}
            />
            <View> 待出行 </View>
          </View>
          <View className="item" onClick={() => goto('chizai')} >
            <img
              src={Env.iconUrl + 'grid_3.png'}
            />
            <View> 待点评 </View>
          </View>
          <View className="item" onClick={() => goto('gouzai')} >
            <img
              src={Env.iconUrl + 'grid_4.png'}
            />
            <View> 历史 </View>
          </View>
        </View>
      </View>

      <View className="block">
        <View className="header">
          我的足迹
          <More text={'足迹'} />
        </View>
        <Button className="btn">分享你的足迹照片</Button>
        <View className="note">
          用照片记录旅行的小技巧
        </View>
      </View>

      <View className="block">
        <View className="header">
          更多服务
          <More text={'服务'} />
        </View>
        <View className="info-2">
          <View className="item">
            <img
              src={Env.iconUrl + 'grid_1.png'}
            />
            <View> 积分商城 </View>
          </View>
          <View className="item">
            <img
              src={Env.iconUrl + 'grid_2.png'}
            />
            <View> 会员卡 </View>
          </View>
          <View className="item">
            <img
              src={Env.iconUrl + 'grid_3.png'}
            />
            <View> 常用信息 </View>
          </View>
          <View className="item" onClick={() => Taro.navigateTo({url: '/pages/feedback/index'})} >
            <img
              src={Env.iconUrl + 'grid_4.png'}
            />
            <View> 反馈 </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
