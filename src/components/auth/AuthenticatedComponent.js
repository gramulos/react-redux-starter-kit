import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginIfRequired } from '../../redux/modules/auth'

export function requireAuthentication (Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount () {
      this.checkAuth()
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth()
    }

    checkAuth () {
      const {isAuthenticated, loginIfRequired} = this.props
      if (!isAuthenticated) {
        loginIfRequired()
      }
    }

    render () {
      const {isAuthenticated} = this.props
      return (
        <div className='full-height'>
          {isAuthenticated
              ? <Component {...this.props}/>
              : null
          }
        </div>
      )
    }
  }

  AuthenticatedComponent.propTypes = {
    dispatch: PropTypes.func,
    isAuthenticated: PropTypes.object,
    loginIfRequired: PropTypes.func.isRequired
  }

  const mapStateToProps = ({auth}) => ({
    isAuthenticated: auth.get('loggedUser')
  })

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loginIfRequired }, dispatch)
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
}
