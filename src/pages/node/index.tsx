import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { View, Image } from '@tarojs/components'
import { Grid } from '@nutui/nutui-react-taro'
import './index.scss'

function gotoNode(id, type = 3) {
  Taro.navigateTo({url: '/pages/node/show?type=' + type + '&id=' + id})
}

function Index() {
  const instance = Taro.getCurrentInstance();
  const region = instance.router.params.region
  const title = instance.router.params.title

  const [list, setList] = useState([])

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '列表'
    })
    Taro.request({
      url: Env.apiUrl + 'nodes/' + region
    })
    .then(res => {
      const data = res.data
      console.log(res)

      setList(data.map((node, index) =>
          <Grid.Item text={node.title} key={index} className="grid-list rounded overflow-hidden" onClick={() => gotoNode(node.id)}>
            <Image className="w-100" src={Env.imageUrl + node.image} mode="widthFix" />
          </Grid.Item>
        )
      )
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <View className="node-index p-1">
      <Grid columns="2" gap="3" center={false} className="">
        {list}
      </Grid>
    </View>
  )
}

export default Index
