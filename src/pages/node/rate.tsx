import React, { useState, useEffect } from 'react'
import { View, Image, Input, Button } from '@tarojs/components'
import './show.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Rate } from '@nutui/nutui-react-taro'
import { fmtSeconds } from '../../utils/fmtSeconds'
import { fmtDate } from '../../utils/fmtDate'

function Index() {
  const [node, setNode] = useState({rates: {rate: 0, users: []}, tags: []})
  const [uid, setUid] = useState(0)
  const [body, setBody] = useState('')
  const [logged, setLogged] = useState(false)
  const [rate, setRate] = useState(0)

  const instance = Taro.getCurrentInstance();
  const id = instance.router.params.id
  const nid = instance.router.params.id
  const type = instance.router.params.type ? instance.router.params.type : 2
  const region = instance.router.params.region ? instance.router.params.region : 'all'

  useEffect(() => {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      setLogged(true)
      setUid(res.data.id)
    })
  }, [])

  const rateIt = (nid, uid, rate) => {
    if (!logged) {
      Taro.navigateTo({ url: '/pages/me/login' })
      return
    }

    const data = {
      uid: uid,
      nid: id,
    }

    Taro.request({
      method: 'POST',
      url: Env.apiUrl + 'rates',
      data
    }).then((res) => {
      if (res.statusCode === 200) {
        Taro.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        }).then(() => {
          setTimeout(() => {
            Taro.navigateBack()
          }, 2000)
        })
      } else {
        Taro.showToast({
          title: '系统错误',
          icon: 'error',
          duration: 2000
        })
        console.log('server error！' + res.errMsg)
      }
    })

    console.log('rating: ', rate);
  }

  const rateChange = (e) => {
    console.log(e)
    setRate(e)
  }

  return (
    <View className="rate p-1">
      <Rate className="stars" allowHalf value={rate} onChange={(e) => rateChange(e) } />
      <Button className="w-100 btn-primary btn-rounded mt-16" onClick={() => rateIt(nid, uid, rate) }>提交</Button>
    </View>
  )
}

export default Index
