export function fmtSeconds (totalSeconds) {
  // https://bobbyhadz.com/blog/javascript-convert-seconds-to-minutes-and-seconds
  //
  // const totalSeconds = 565.34314;

  // 👇️ get the number of full minutes
  const minutes = Math.floor(totalSeconds / 60)

  // 👇️ get the remainder of the seconds
  const seconds = Math.floor(totalSeconds % 60)

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0')
  }

  // ✅ format as MM:SS
  const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
  // console.log(result); // 👉️ "09:25"

  return result
}
