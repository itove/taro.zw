import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import { SearchBar } from '@nutui/nutui-react-taro'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Tabs, Empty } from '@nutui/nutui-react-taro'

function gotoNode(id, type = 2) {
  Taro.navigateTo({url: '/pages/node/show?type=' + type + '&id=' + id})
}

function ListItem({node, index, type}) {
  console.log(node);
  return (
    <View key={index} className="list-item" onClick={() => gotoNode(node.id, type)}>
      <View className="widget">
        <View className="badge">景点</View>
      </View>
      <Image className="img rounded" src={Env.imageUrl + node.image} mode="aspectFill" />
      <View className="text">
        <View>
          <View className="title mb-10">
            {node.title}
          </View>

          <View className="d-flex">
            <View className="tag tag-b me-8">预约入馆</View>
            <View className="tag tag-b">免费开放</View>
          </View>
        </View>

        <View className="info">
          <img className="me-5" width="12px" height="12px" src={Env.iconUrl + 'location-grey.png'} />
          某某区某街道民主路34号
        </View>
    </View>

    </View>
  )
}

function Index() {
  const instance = Taro.getCurrentInstance();
  const keyword = instance.router.params.k
  const [tab1value, setTab1value] = useState<string | number>('0')
  const [nodes, setNodes] = useState([])
  const [list, setList] = useState([])

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'search?q=' + keyword
    })
    .then(res => {
      const nodes = res.data.nodes
      setList(nodes.map((node, index) => <ListItem node={node} type={1} key={index} />))
    })
  }, [])

  return (
    <View className="search-result p-16">
      <SearchBar className="" shape="round"
        value={keyword}
        onChange={(e) => setKeyword(e) }
        value={keyword}
        onSearch={(e) => search(e) }
      />

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
        <Tabs.TabPane title="全部">
          <View>{list}</View>
        </Tabs.TabPane>
        <Tabs.TabPane title="景点">
          <View>{list}</View>
        </Tabs.TabPane>
        <Tabs.TabPane title="住宿">
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane title="美食">
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane title="文创">
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane title="购物">
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane title="活动">
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane title="玩法">
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane title="艺动">
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
        </Tabs.TabPane>
      </Tabs>

    </View>
  )
}

export default Index
