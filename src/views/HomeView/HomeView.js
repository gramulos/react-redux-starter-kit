import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as counterActions } from '../../redux/modules/counter'
import DuckImage from './Duck.jpg'
import { Button } from 'react-toolbox/lib/button'
import Checkbox from 'react-toolbox/lib/checkbox'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter: state.counter
})
export class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      check1: true
    }
  }
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='container text-center'>
        <div className='row'>
          <div className='col-xs-2 col-xs-offset-5'>
            <img src={DuckImage}
                 alt='This is a duck, because Redux.' />
          </div>
        </div>
        <h1>Welcome to the React Redux Starter Kit</h1>
        <h2>
          Sample Counter:
          {' '}
          <span>{this.props.counter}</span>
        </h2>
        <button className='btn btn-default'
                onClick={() => this.props.increment(1)}>
          Increment
        </button>
        {' '}
        <button className='btn btn-default'
                onClick={this.props.doubleAsync}>
          Double (Async)
        </button>
        <Button icon='bookmark' label='Bookmark' primary />
        <Checkbox
          checked={this.state.check1}
          label='Checked option'
          onChange={this.handleChange.bind(this)}
        />
        <hr />
        <Link to='/404'>Go to 404 Page</Link>
      </div>
    )
  }
  handleChange () {
    this.setState({
      check1: this.state.check1
    })
  }
}

export default connect(mapStateToProps, counterActions)(HomeView)
