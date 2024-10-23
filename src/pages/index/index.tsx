import React, { useState, useEffect } from 'react'
import { View, Image, Swiper, SwiperItem, Text } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Grid, NoticeBar, Tabs, SearchBar } from '@nutui/nutui-react-taro'

function gotoNode(id, type = 3) {
  Taro.navigateTo({url: '/pages/node/show?type=' + type + '&id=' + id})
}

function gotoNodeIndex(region, type) {
  Taro.navigateTo({url: '/pages/node/index?region=' + region + '&type=' + type})
}

function gotoUrl(url) {
  Taro.navigateTo({url: '/pages/' + url})
}

function gridGoto(node) {
  if (node.isTab) {
    Taro.switchTab({url: '/pages/' + node.url})
    .then(
      res => {
        Taro.pageScrollTo({
          selector: node.target,
          duration: 300
        })
      }
    )
  } else {
    Taro.navigateTo({url: '/pages/' + node.url})
  }
}

function More({region, type}) {
  return (
    <View
      className="more" 
      onClick={() => Taro.navigateTo({url: '/pages/node/index?region=' + region + '&type=' + type})}
    >
    更多 <img width="16px" height="16px" src={Env.iconUrl + 'arrow-right.png'} />
    </View>
  )
}

function List({node, type, index}) {
  const style = {
    fontSize: "22px",
    "&:before": {
      color: "#ffffff",
      backgroundImage: `url(${Env.imageUrl + node.image})`
    }
  }
  return (
    <View key={index} className="list-item" onClick={() => gotoNode(node.id, type)}
     // style={{"::before": {backgroundImage: `url(${Env.imageUrl + node.image})`}}}
     style={{background: `linear-gradient(90deg, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.8)), url(${Env.imageUrl + node.image}) no-repeat center / cover`}}
     // style={style}
    >
    <View className="img">
    <Image className="w-100 rounded" src={Env.imageUrl + node.image} mode="aspectFill" />
    </View>
    <View className="text">
      <View>
      <View className="badge title-badge">一日游</View>
      {node.title}
      </View>
      <View className="info">
        <View className="badge">3A景区</View>
        <View className="badge">门票 ¥54</View>
      </View>
    </View>
    </View>
  )
}

function List2({node, type, index}) {
  return (
    <View key={index} className="list-item" onClick={() => gotoNode(node.id, type)}>
    <View className="img">
    <Image className="w-100 rounded" src={Env.imageUrl + node.image} mode="aspectFill" />
    </View>
    <View className="text">
      <View className="ellipsis"> {node.title} </View>
      <View className="info">
        {type === 0 &&
        <View className="">09/22</View>
        }
        {type === 1 &&
        <View>
          <img className="me-5" width="10px" height="10px" src={Env.iconUrl + 'star-fill-gold.svg'} />
          <Text className="hightlight me-5">4.5 </Text>
          人均 ¥ 56
        </View>
        }
      </View>
    </View>
    </View>
  )
}

function SwiperItem1({node, index, type}) {
  return (
    <SwiperItem className="slide-item">
    <View className="widget">
      <View className="badge"><img className="me-5" width="10px" height="10px" src={Env.iconUrl + 'star-fill.svg'} /> 4.5 </View>
    </View>

    <Image
    className="w-100 img"
    mode="aspectFill"
    onClick={() => gotoNode(node.id, type)}
    src={Env.imageUrl + node.image}
    alt=""
    />
    <View className="text"> {node.title} </View>
    </SwiperItem>
  )
}

function GridItem({node, index}) {
  return (
    <Grid.Item className="background-none" text={node.t} key={index} onClick={() => gridGoto(node) }>
    <Image className="img" src={node.p} mode="widthFix" />
    </Grid.Item>
  )
}

function Index() {
  const [gridList, setGridList] = useState([])
  const [wanList, setWanList] = useState([])
  const [jingList, setJingList] = useState([])
  const [dongList, setDongList] = useState([])
  const [shiList, setShiList] = useState([])

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

  const gridItems = [
    { t: '景点', p: Env.iconUrl + 'grid_1.png', target: '', url: 'jing/index', isTab: false, },
    { t: '住宿', p: Env.iconUrl + 'grid_2.png', target: '', url: 'zhu/index', isTab: false, },
    { t: '美食', p: Env.iconUrl + 'grid_3.png', target: '', url: 'node/index?type=3&region=shi', isTab: false, },
    { t: '活动', p: Env.iconUrl + 'grid_4.png', target: '', url: 'list/card?type=4&region=dong', isTab: false, },
    { t: '文创', p: Env.iconUrl + 'grid_5.png', target: '', url: 'list/card?type=5&region=wen', isTab: false, },
    { t: '艺动', p: Env.iconUrl + 'grid_6.png', target: '', url: 'node/index?type=6&region=yi', isTab: false, },
    { t: '购物', p: Env.iconUrl + 'grid_7.png', target: '', url: 'list/card?type=7&region=gou', isTab: false, },
    { t: '玩法', p: Env.iconUrl + 'grid_8.png', target: '', url: 'wan/index', isTab: false, },
  ]

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'wx/home'
    })
    .then(res => {
      const data = res.data
      console.log(res)

      setGridList(gridItems.map((node, index) => <GridItem node={node} index={index} />))
      setJingList(data.jing.map((node, index) => <SwiperItem1 node={node} index={index} type={0} />))
      setDongList(data.jing.map((node, index) => index < 3 && <List2 node={node} index={index} type={0} />))
      setShiList(data.jing.map((node, index) => index < 3 && <List2 node={node} index={index} type={1} />))
      setWanList(data.jing.map((node, index) => <List node={node} type={0} index={index} />))
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <View className="home">
      <View className="hero" style="background-image: url(https://zw.dev.itove.com/images/1.png)">
        <View className="text">
          <View className="desc"><img src={Env.iconUrl + 'dingwei.png'} />张湾区</View>
          <View className="title">遇见张湾</View>
          <View className="placeholder"></View>
        </View>
        <View
         onClick={() => Taro.navigateTo({url: '/pages/search/index'})}
        >
         <SearchBar className="search" disabled={true} shape="round" maxLength={5} placeholder="请输入关键字搜索景点，美食，购物…" />
        </View>
      </View>

      <Grid columns="4" className="grid" style={{backgroundImage: `url(${Env.imageUrl}grid-bg.png)`}}>
        {gridList}
      </Grid>

      <View className="jingdian block" style={{backgroundImage: `url(${Env.imageUrl + 'jingdian_bg.png'})`}}>
        <View className="header">
          <View className="left">
            <img width="18px" height="18px" className="me-5" src={Env.iconUrl + 'fire.png'} />
            热门景点
          </View>
          <View
            className="more" 
            onClick={() => Taro.navigateTo({url: '/pages/node/index?region=jing&type=0'})}
          >
          更多 <img width="14px" height="14px" src={Env.iconUrl + 'arrow_1.png'} />
          </View>
        </View>
        <Swiper defaultValue={0} circular className="slide">
          {jingList}
        </Swiper>
      </View>

      <View className="featured block">
        <View className="dong item bg-img" style={{backgroundImage: `url(${Env.imageUrl + 'huodong_bg.png'})`}}>
          <View className="header">
            <View className="left">
              <img width="16px" height="16px" className="me-5" src={Env.imageUrl+ 'flag.png'} />
              热门活动
            </View>
            <View
              className="more" 
              onClick={() => Taro.navigateTo({url: '/pages/node/index?region=jing&type=0'})}
            >
            <img width="14px" height="14px" src={Env.iconUrl + 'arrow_2.png'} />
            </View>
          </View>
          <View className="list">{dongList} </View>
        </View>

        <View className="shi item bg-img" style={{backgroundImage: `url(${Env.imageUrl + 'meishi_bg.png'})`}}>
          <View className="header">
            <View className="left">
              <img width="16px" height="16px" className="me-5" src={Env.iconUrl+ 'meishi.png'} />
              推荐美食
            </View>
            <View
              className="more" 
              onClick={() => Taro.navigateTo({url: '/pages/node/index?region=shi&type=0'})}
            >
            <img width="14px" height="14px" src={Env.iconUrl + 'arrow_2.png'} />
            </View>
          </View>
          <View className="list">{shiList} </View>
        </View>


      </View>

      <View className="you block" style={{backgroundImage: `url(${Env.imageUrl + 'you_bg.png'})`}}>
        <View className="header">
          <View className="left">
            #游玩推荐#
          </View>
          <View
              className="more" 
              onClick={() => Taro.navigateTo({url: '/pages/node/index?region=wan&type=0'})}
            >
            更多 <img width="14px" height="14px" src={Env.iconUrl + 'arrow-right.png'} />
          </View>
        </View>

        <View className="list"> {wanList} </View>
      </View>

    </View>
  )
}

export default Index
