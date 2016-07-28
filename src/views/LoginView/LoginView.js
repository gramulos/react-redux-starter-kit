import React from 'react'
import { Link } from 'react-router'

export class LoginView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
      <form className='form-horizontal'>
        <div className='form-group'>
          <label className='col-sm-2 control-label'>Email</label>
          <div className='col-sm-10'>
            <input type='email' className='form-control' id='inputEmail3' placeholder='Email'/>
          </div>
        </div>
        <div className='form-group'>
          <label className='col-sm-2 control-label'>Password</label>
          <div className='col-sm-10'>
            <input type='password' className='form-control' id='inputPassword3' placeholder='Password'/>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-offset-2 col-sm-10'>
            <div className='checkbox'>
              <label>
                <input type='checkbox'/> Remember me
              </label>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-offset-2 col-sm-10'>
            <button type='submit' className='btn btn-default'>Sign in</button>
          </div>
        </div>
        </form>
        <Link to='/'>Back To Home View</Link>
      </div>
    )
  }
}

export default LoginView
