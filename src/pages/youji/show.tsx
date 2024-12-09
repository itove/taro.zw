import React, { useState, useEffect } from 'react'
import { View, Image, Input, Button } from '@tarojs/components'
import './show.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Tabs, Rate, ImagePreview } from '@nutui/nutui-react-taro'
import { fmtSeconds } from '../../utils/fmtSeconds'
import { fmtDate } from '../../utils/fmtDate'

Taro.options.html.transformElement = (el) => {
  if (el.nodeName === 'image') {
    el.setAttribute('mode', 'widthFix')
    el.setAttribute('src', Env.baseUrl + el.getAttribute('src'))
  }
  return el
}

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
  const [node, setNode] = useState({rates: {rate: 0, users: []}, tags: []})
  const [uid, setUid] = useState(0)
  const [body, setBody] = useState('')
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [logged, setLogged] = useState(false)
  const [commentCount, setCommentCount] = useState(0)
  const [rateCount, setRateCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  const instance = Taro.getCurrentInstance();
  const nid = instance.router.params.nid

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'youji/' + nid
    })
    .then(res => {
      const n = res.data
      setNode(n)
      if (n.body) {
        setBody(n.body.replace(/&nbsp;/g, '<br/>'))
      }
    })
  }, [])

  return (
    <View className="youji-show">
      <View className="hero">
        <Image className="w-100 rounded" src={Env.imageUrl + node.image} mode="heightFix" />
      </View>
      <View className="title mb-10 p-1">
        {node.title}
      </View>

      <View className="plan mb-10 d-flex justify-between p-1">
        <View className="">
          <View>出发时间</View>
          <View>5月</View>
        </View>
        <View className="">
          <View>行程天数</View>
          <View>2天</View>
        </View>
        <View className="">
          <View>人均花费</View>
          <View>500</View>
        </View>
        <View className="">
          <View>和谁出行</View>
          <View>5月</View>
        </View>
      </View>

      <View className="steps mb-10 p-1">
        <View>行程单</View>
        <View className="d-flex justify-between">
          <View>
            <View>icon</View>
            <View>总览</View>
          </View>
          <View>
            <View>icon</View>
            <View>总览</View>
          </View>
        </View>

        {node.plan && node.plan.steps.map((s, i) => 
        <View className="d-flex justify-between" key={i}>
            <View>{fmtDate(new Date(s.startAt), 1)}</View>
            <View>{s.body}</View>
        </View>)}
      </View>

      <View className="p-1">详情</View>
      <View className="images mb-10 p-1">
        {node.images && node.images.map((img, i) => <Image className="w-100" src={Env.imageUrl + img} mode="heightFix" />)}
      </View>

      <View dangerouslySetInnerHTML={{__html: body}} className='body p-1'></View>
    </View>
  )
}

export default Index
