import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { SearchBar } from '@nutui/nutui-react-taro'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'

const key = 'hist'
let hist = []

function Index() {
  const [keyword, setKeyword] = useState('')
  // const [hist, setHist] = useState([])
  const [hot, setHot] = useState(['亲子', '民宿推荐', '赏花', '购物', '文创'])
  const [tags, setTags] = useState([])
  const [tags2, setTags2] = useState([])


  useEffect(() => {
    Taro.getStorage({
      key: key
    })
    .then(res => {
      console.log(res.data)
      // setHist(res.data)
      hist = res.data
      setTags(makeTags(res.data))
      setTags2(makeTags2(hot))
    })
    .catch(err => {
      console.log(err)
      // Taro.redirectTo({url: '/pages/me/login'})
    })
  }, [])

  const search = (kw) => {
    console.log('search: ', kw)

    console.log('hist is ', hist);
    const newhist = hist.slice(0, 7)
    console.log('newhist is ', newhist);
    newhist.unshift(kw) // so we only store 8 keywords
    console.log('newhist is ', newhist);
    const newUniqHist = [...new Set(newhist)]
    // const newUniqHist = newhist
    console.log('newUniqHist is ', newUniqHist);

    setKeyword(kw)

    // setHist(newUniqHist)
    hist = newUniqHist
    
    setTags(makeTags(newUniqHist))

    Taro.setStorage({
      key: key,
      data: newUniqHist
    })

    Taro.navigateTo({url: 'result?k=' + kw})
  }

  const makeTags = (items) => {
    return items.map((k, i) => 
    <View className="tag tag-grey" index={i}>
      <View className="text" onClick={() => search(k)}>{k}</View>
      <img onClick={() => rmHist(i)} className="img" width="12px" height="12px" src={Env.iconUrl + 'close.png'} />
    </View>
          )
  }

  const makeTags2 = (items) => {
    return items.map((k, i) => 
    <View className="tag tag-b-r" index={i}>
      <View className="text" onClick={() => search(k)}>{k}</View>
    </View>
          )
  }

  const clearHist = () => {
    console.log('clear hist...')
    // setHist([])
    hist = []
    setTags([])
    Taro.removeStorage({
      key: key,
      success: res => {
        console.log('storeage removed: ', key);
      },
      fail: res => {
        console.log('storeage removed failed: ', key);
      }
    })
  }

  const rmHist = (index) => {
    console.log('remove hist: ', index)
    console.log(hist)
    const newhist = hist
    console.log(newhist)
    newhist.splice(index, 1)
    console.log(newhist)
    // setHist(newhist)
    hist = newhist
    setTags(makeTags(newhist))
    Taro.setStorage({
      key: key,
      data: newhist
    })
  }


  return (
    <View className="search-index p-16">
      <SearchBar className="" shape="round"
        right={
          <View className="searchbtn" onClick={() => search(keyword)}>搜索</View>
        }
        value={keyword}
        autoFocus={true}
        onChange={(e) => setKeyword(e) }
        // value={keyword}
        onSearch={(e) => search(e) }
      />

      <View className="hist">
        <View className="title d-flex justify-between">
          <View className="right d-flex align-items-center">
            <View className="bar"></View>
            <View>搜索历史</View>
          </View>
          <View className="left d-flex align-items-center" onClick={clearHist}>
            <img className="me-4" width="14px" height="14px" src={Env.iconUrl + 'trash.png'} />
            <View>清空</View>
          </View>
        </View>

        <View className="tags row">
          {tags}
        </View>

      </View>

      <View className="hot">
        <View className="title d-flex justify-between">
          <View className="right d-flex align-items-center">
            <View className="bar"></View>
            <View>热门搜索</View>
          </View>
        </View>

        <View className="tags row">
          {tags2}
        </View>
      </View>

    </View>
  )
}

export default Index
