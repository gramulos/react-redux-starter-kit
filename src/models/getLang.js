import { languages } from '../redux/middleware/config'

const getLang = (url) => {
  const urlParams = url.split('/')
  const lang = urlParams[urlParams.length - 1]
  if (languages.indexOf(lang) !== -1) {
    return lang
  } else {
    return languages[0]
  }
}

export default getLang
