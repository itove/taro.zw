export function More({region, type}) {
  return (
    <div
      className="more" 
      onClick={() => Taro.navigateTo({url: '/pages/node/index?region=' + region + '&type=' + type})}
    >
    更多 <img width="16px" height="16px" src={Env.iconUrl + 'arrow-right.png'} />
    </div>
  )
}
