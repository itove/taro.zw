import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Avatar } from "@nutui/nutui-react-taro"
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'

function goto() {
  const link = '/pages/me/info'
  Taro.navigateTo({ url: link })
}

function Index() {
  // const [list, setList] = useState([])
  const [user, setUser] = useState({name: '请点击登录'})
  const [avatarUrl, setAvatarUrl] = useState('')
  let l = []

  useEffect(() => {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      // fetch data
      Taro.request({
        url: Env.apiUrl + 'users/' + res.data.id
      })
      .then(res => {
        console.log(res)
        let u = res.data
        if (u.firm === undefined) {
          u.firm = {name: ''}
        }
        setUser(u)
        if (u.avatar !== undefined) {
          setAvatarUrl(Env.baseUrl + u.avatar)
        }
      })
    })
    .catch(err => {
      console.log(err)
      // Taro.redirectTo({url: '/pages/me/login'})
    })
  }, [])

  return (
    <View className="">
      <View className="p-1 align-items-center d-flex">
        <View>
          <Avatar
            size="50"
            src={avatarUrl}
          />
        </View>
        <View className="ms-1">
            {user.name}
        </View> 
      </View>

      <View className="block">
        <View className="header">
          我的收藏
        </View>
        <View className="info-2">
          <View className="item">
            <img
              src={Env.iconUrl + 'grid_1.png'}
            />
            <View> 游在东沟 </View>
          </View>
          <View className="item">
            <img
              src={Env.iconUrl + 'grid_2.png'}
            />
            <View> 住在东沟 </View>
          </View>
          <View className="item">
            <img
              src={Env.iconUrl + 'grid_3.png'}
            />
            <View> 吃在东沟 </View>
          </View>
          <View className="item">
            <img
              src={Env.iconUrl + 'grid_4.png'}
            />
            <View> 购在东沟 </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
