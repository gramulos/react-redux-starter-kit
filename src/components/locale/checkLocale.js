import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { languages } from '../../redux/middleware/config'
import { setLocale, goToUrl } from '../../redux/modules/webpage'

export function checkLocale (Component) {
  class LocalizationComponent extends React.Component {
    componentWillMount () {
      this.setLocalization()
    }

    componentWillReceiveProps () {
      this.setLocalization()
    }

    setLocalization () {
      const { setLocale, locale, goToUrl } = this.props
      const { lang } = this.props.params
      if (lang) {
        if (locale !== lang) {
          if (languages.indexOf(lang) !== -1) {
            setLocale(lang)
          } else {
            const urlParams = this.props.location.pathname.split('/')
            let customUrl = ''
            for (let i = 1; i < urlParams.length - 1; i++) {
              customUrl += '/' + urlParams[i]
            }
            goToUrl(customUrl + '/az')
          }
        }
      } else if (this.props.location.pathname === '/') {
        goToUrl('/az')
      } else {
        goToUrl(this.props.location.pathname + '/az')
      }
    }

    render () {
      const { locale } = this.props
      const { lang } = this.props.params
      return (
        <div className='full-height'>
          {locale === lang
              ? <Component {...this.props}/>
              : this.loader()
          }
        </div>
      )
    }

    loader () {
      return (
        <div id='site-loader' className='load-complete'>
          <div className='loader'>
            <div className='loader-inner ball-clip-rotate'>
              <div></div>
            </div>
          </div>
        </div>
      )
    }
  }

  LocalizationComponent.propTypes = {
    dispatch: PropTypes.func,
    goToUrl: PropTypes.func,
    locale: PropTypes.string,
    setLocale: PropTypes.func.isRequired,
    lang: PropTypes.string,
    params: PropTypes.object,
    location: PropTypes.object
  }

  const mapStateToProps = ({webpage}) => ({
    locale: webpage.get('locale')
  })

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setLocale, goToUrl }, dispatch)
  }

  return connect(mapStateToProps, mapDispatchToProps)(LocalizationComponent)
}
