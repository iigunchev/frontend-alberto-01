export const postTweet = async (url, values) => {
  const result =  new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve('ok')
      }, 3000)
  })
  return result;
}