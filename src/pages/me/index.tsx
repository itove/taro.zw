import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Button, Cell, Avatar, Row, Col } from "@nutui/nutui-react-taro"
import { Right } from '@nutui/icons-react-taro'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'

function goto() {
  const link = '/pages/me/info'
  Taro.navigateTo({ url: link })
}

function Index() {
  // const [list, setList] = useState([])
  const [user, setUser] = useState({firm: {name: ''}})
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
      Taro.redirectTo({url: '/pages/me/login'})
    })
  }, [])

  return (
    <View className="">
      <Row className="p-1 align-item-center">
        <Col span="">
          <Avatar
            size="50"
            src={avatarUrl}
          />
        </Col>
        <Col span="" className="ps-1">
            <div className="ellipsis w-10 flex-content flex-content-light">{user.name}</div>
            <div className="ellipsis w-10 flex-content flex-content-light">{user.firm.name}</div>
        </Col> 
      </Row>
      <Cell.Group>
        <Cell
        className='nutui-cell--clickable'
        title='个人信息'
        align='center'
        extra={<Right size="12" />}
        onClick={goto}
        />
        <Cell
        className='nutui-cell--clickable'
        title='我的收藏'
        align='center'
        extra={<Right size="12" />}
        />
        <Cell
        className='nutui-cell--clickable'
        title='设置'
        align='center'
        extra={<Right size="12" />}
        />
      </Cell.Group>
    </View>
  )
}

export default Index
