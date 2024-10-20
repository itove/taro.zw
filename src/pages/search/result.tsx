import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { SearchBar } from '@nutui/nutui-react-taro'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Tabs, Empty } from '@nutui/nutui-react-taro'

function Index() {
  const instance = Taro.getCurrentInstance();
  const keyword = instance.router.params.k
  const [tab1value, setTab1value] = useState<string | number>('0')

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
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane title="景点">
          <View>
            <Empty status="empty" description="抱歉，未找到相关内容哦~"
            image={<img src={Env.imageUrl+ 'empty.png'} />}
            imageSize={120}
            />
          </View>
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
