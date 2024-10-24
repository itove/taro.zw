import React, { useState, useEffect } from 'react'
import { View, Picker, Image } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Grid, NoticeBar, Swiper, Tabs, SearchBar, Calendar } from '@nutui/nutui-react-taro'
import { fmtDate } from '../../utils/fmtDate'

function gotoNode(id, type = 3) {
  Taro.navigateTo({url: '/pages/node/show0?type=' + type + '&id=' + id})
}

function ListItem({node, type, index}) {
  return (
    <View className="d-flex">
      <View className="left align-center">
        <View className="">
          <View>
          <img className="" width="20px" height="20px" src={Env.iconUrl + 'star-fill-gold.svg'} />
          </View>
          <View>{node.rates.rate}</View>
        </View>
        <View className="">
          <View>
          <img className="" width="20px" height="20px" src={Env.iconUrl + 'chat-dots-fill.svg'} />
          </View>
          <View>{node.comments.length}</View>
        </View>
        <View>
          <img className="" width="20px" height="20px" src={Env.iconUrl + 'heart-grey.svg'} />
        </View>
      </View>
      <View className="card right">
        <Image
        className="w-100 img"
        mode="aspectFill"
        onClick={() => gotoNode(node.id, type)}
        src={Env.imageUrl + node.image}
        alt=""
        />
      <View className="text">
        <View className="title">{node.title}</View>
        <View className="price">¥ {node.price / 100}/晚</View>
      </View>
      </View>
    </View>
  )
}

function Index() {
  const today = new Date()
  const tommorrow = new Date()
  tommorrow.setDate(tommorrow.getDate() + 1)
  const endDay = new Date()
  endDay.setDate(endDay.getDate() + 15)
  const [youList, setYouList] = useState([])
  const [start, setStart] = useState(today.getDate())
  const [end, setEnd] = useState(tommorrow.getDate())
  // const [guests, setGuests] = useState(1)
  const numList = [1, 2, 3, 4, 5]
  const [numSelected, setNumSelected] = useState(1)

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

  const [date, setDate] = useState([fmtDate(today, 2), fmtDate(tommorrow, 2)])
  const [isVisible, setIsVisible] = useState(false)

  const openSwitch = () => {
    console.log('open date picker')
    setIsVisible(true)
  }

  const closeSwitch = () => {
    console.log('close date picker')
    setIsVisible(false)
  }

  const setChooseValue = (param: string) => {
    console.log(param);
    // console.log([...[param[0][3], param[1][3]]])
    setDate([...[param[0][3], param[1][3]]])
    setStart(param[0][2])
    setEnd(param[1][2])
    // closeSwitch()
  }

  const select = (param: string) => {
    console.log(param)
  }

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'nodes/zhu'
    })
    .then(res => {
      const data = res.data
      console.log(res)

      setYouList(data.nodes.map((node, index) => <ListItem node={node} type={2} index={index} />))
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  // const chooseNum = () => {
  //   console.log('choose num of guests')
  //   Taro.showActionSheet({
  //     itemList: ['1', '2', '3', '4', '5'],
  //     success: function (res) {
  //       console.log(res.tapIndex)
  //       setGuests(res.tapIndex + 1)
  //     },
  //     fail: function (res) {
  //       console.log(res.errMsg)
  //     }
  //   })
  // }

  const chooseDate = () => {
    console.log('choose date')
  }

  const numChange = (e) => {
    console.log('num change')
    console.log(e.detail.value)
    setNumSelected(numList[e.detail.value])
  }

  const dateChange = (e) => {
    console.log('date change')
    console.log(e.detail.value)
    // setNumSelected(numList[e.detail.value])
  }

  return (
    <View className="index-zhu">
      <View className="d-flex tags">

        <View onClick={openSwitch} className="tag">
          住 {start} - 离 {end}
        </View>

        <View className="tag">
          <Picker mode='selector' range={numList} onChange={numChange}>
            <View className='picker'>
              {numSelected} 位客人
            </View>
          </Picker>
        </View>
      </View>
      <View className="leyou block">
        <View className="list">
          {youList} 
        </View>
      </View>

      <Calendar
        title="日期选择"
        visible={isVisible}
        defaultValue={date}
        type="range"
        startDate={fmtDate(today, 2)}
        endDate={fmtDate(endDay, 2)}
        onClose={closeSwitch}
        onConfirm={setChooseValue}
        onDayClick={select}
      />

    </View>
  )
}

export default Index
