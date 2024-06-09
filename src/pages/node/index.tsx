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
  const uid = instance.router.params.uid

  const [list, setList] = useState([])

  useEffect(() => {
    console.log(uid)
    let url = Env.apiUrl + 'nodes/' + region
    if (uid !== undefined ) {
      url = Env.apiUrl + 'userfav?region=' + region + '&uid=' + uid
    }
    Taro.request({
      url
    })
    .then(res => {
      const data = res.data
      console.log(res)

      Taro.setNavigationBarTitle({
        title: data.region
      })

      setList(data.nodes.map((node, index) =>
          <Grid.Item text={node.title} key={index} className="grid-list rounded overflow-hidden" onClick={() => gotoNode(node.id)}>
            <Image className="w-100" src={Env.imageUrl + node.image} mode="aspectFill" />
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
