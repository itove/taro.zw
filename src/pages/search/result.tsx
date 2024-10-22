import React, { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { SearchBar } from '@nutui/nutui-react-taro'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Tabs, Empty } from '@nutui/nutui-react-taro'

function gotoNode(id, type = 2) {
  Taro.navigateTo({url: '/pages/node/show?type=' + type + '&id=' + id})
}

function ListItem({node, index, keyword, type}) {
  const title = node.title.replace(keyword, `<Text class="hightlight">${keyword}</Text>`)
  const address = node.address ? node.address.replace(keyword, `<Text class="hightlight">${keyword}</Text>`) : ''
  return (
    <View key={index} className="list-item" onClick={() => gotoNode(node.id, type)}>
      <View className="widget">
        <View className={'badge badge-' + node.region.label}>{node.region.name}</View>
      </View>
      <Image className="img rounded" src={Env.imageUrl + node.image} mode="aspectFill" />
      <View className="text">
        <View>
          <View className="title mb-10">
            <View dangerouslySetInnerHTML={{__html: title}}></View>
          </View>

          <View className="d-flex">
            <View className="tag tag-b me-8">预约入馆</View>
            <View className="tag tag-b">免费开放</View>
          </View>
        </View>

        <View className="info">
          <img className="me-5" width="12px" height="12px" src={Env.iconUrl + 'location-grey.png'} />
            <View dangerouslySetInnerHTML={{__html: address}}></View>
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
  const [list1, setList1] = useState([])
  const [list2, setList2] = useState([])
  const [list3, setList3] = useState([])
  const [list4, setList4] = useState([])
  const [list5, setList5] = useState([])
  const [list6, setList6] = useState([])
  const [list7, setList7] = useState([])
  const [list8, setList8] = useState([])

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'search?q=' + keyword
    })
    .then(res => {
      const nodes = res.data.nodes
      console.log(nodes)
      setList(nodes.map((node, index) => <ListItem node={node} type={1} keyword={keyword} key={index} />))
      setList1(nodes.map((node, index) => {
        if (node.region.label === 'jing') {
          return <ListItem node={node} type={1} keyword={keyword} key={index} />
        }
      }))
      setList2(nodes.map((node, index) => {
        if (node.region.label === 'zhu') {
          return <ListItem node={node} type={1} keyword={keyword} key={index} />
        }
      }))
      setList3(nodes.map((node, index) => {
        if (node.region.label === 'shi') {
          return <ListItem node={node} type={1} keyword={keyword} key={index} />
        }
      }))
      setList4(nodes.map((node, index) => {
        if (node.region.label === 'wen') {
          return <ListItem node={node} type={1} keyword={keyword} key={index} />
        }
      }))
      setList5(nodes.map((node, index) => {
        if (node.region.label === 'gou') {
          return <ListItem node={node} type={1} keyword={keyword} key={index} />
        }
      }))
      setList6(nodes.map((node, index) => {
        if (node.region.label === 'dong') {
          return <ListItem node={node} type={1} keyword={keyword} key={index} />
        }
      }))
      setList7(nodes.map((node, index) => {
        if (node.region.label === 'wan') {
          return <ListItem node={node} type={1} keyword={keyword} key={index} />
        }
      }))
      setList8(nodes.map((node, index) => {
        if (node.region.label === 'yi') {
          return <ListItem node={node} type={1} keyword={keyword} key={index} />
        }
      }))
    })
  }, [])

  return (
    <View className="search-result p-16">
      <SearchBar className="" shape="round"
        value={keyword}
        disabled={true}
        clearable={false}
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
          { list.length > 0 &&
          <View>
          {list}
          </View>
          ||
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
          }
        </Tabs.TabPane>
        <Tabs.TabPane title="景点">
          { list1.length > 0 &&
          <View>
          {list1}
          </View>
          ||
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
          }
        </Tabs.TabPane>
        <Tabs.TabPane title="住宿">
          { list2.length > 0 &&
          <View>
          {list2}
          </View>
          ||
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
          }
        </Tabs.TabPane>
        <Tabs.TabPane title="美食">
          { list3.length > 0 &&
          <View>
          {list3}
          </View>
          ||
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
          }
        </Tabs.TabPane>
        <Tabs.TabPane title="文创">
          { list4.length > 0 &&
          <View>
          {list4}
          </View>
          ||
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
          }
        </Tabs.TabPane>
        <Tabs.TabPane title="购物">
          { list5.length > 0 &&
          <View>
          {list5}
          </View>
          ||
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
          }
        </Tabs.TabPane>
        <Tabs.TabPane title="活动">
          { list6.length > 0 &&
          <View>
          {list6}
          </View>
          ||
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
          }
        </Tabs.TabPane>
        <Tabs.TabPane title="玩法">
          { list7.length > 0 &&
          <View>
          {list7}
          </View>
          ||
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
          }
        </Tabs.TabPane>
        <Tabs.TabPane title="艺动">
          { list8.length > 0 &&
          <View>
          {list8}
          </View>
          ||
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
          }
        </Tabs.TabPane>
      </Tabs>

    </View>
  )
}

export default Index
