import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { SearchBar } from '@nutui/nutui-react-taro'
import './index.scss'
import Taro from '@tarojs/taro'

function search(keyword) {
  console.log('search: ', keyword)
  Taro.navigateTo({url: 'result?k=' + keyword})
}

function Index() {
  const [keyword, setKeyword] = useState('')

  return (
    <View className="search-index">
      <SearchBar className="" shape="round"
        right={
          <View className="searchbtn" onClick={() => search(keyword)}>搜索</View>
        }
        onBlur={(e) => {setKeyword(e)} }
        // value={keyword}
        onSearch={(e) => search(e) }
      />
    </View>
  )
}

export default Index
