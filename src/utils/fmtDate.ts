export function fmtDate (date, style = 0) {
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  // const result = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  let result = `${year}年${month}月${day} ${hour}:${minute}`
  if (style === 1) {
    result = `${month}/${day}`
  }

  if (style === 2) {
    result = `${year}-${month}-${day}`
  }

  if (style === 3) {
    result = `${year}/${month}/${day}`
  }

  if (style === 4) {
    result = `${month}月${day} ${hour}:${minute}`
  }

  if (style === 5) {
    result = `${year}年${month}月`
  }

  return result
}
