import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userName: '', userPin: '', errorMsg: '', onShowMsg: false}

  onChangeInput = event => {
    this.setState({userName: event.target.value})
  }

  onChangePin = event => {
    this.setState({userPin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {userName, userPin} = this.state
    const UserDetails = {userName, userPin}
    const Url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(UserDetails),
    }

    const response = await fetch(Url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onShowingErrorMsg(data.errorMsg)
    }
  }

  renderUsername = () => {
    const {userName} = this.state
    return (
      <>
        <label className="userName" htmlFor="user">
          User ID
        </label>
        <br />
        <input
          type="text"
          id="user"
          placeholder="Enter User ID"
          className="userInput"
          value={userName}
          onChange={this.onChangeInput}
        />
      </>
    )
  }

  renderUserPin = () => {
    const {userPin} = this.state
    return (
      <>
        <label className="userName" htmlFor="pin">
          PIN
        </label>
        <br />
        <input
          type="password"
          id="pin"
          placeholder="Enter Pin"
          className="userInput"
          value={userPin}
          onChange={this.onChangePin}
        />
      </>
    )
  }

  onShowingErrorMsg = errorMsg => {
    this.setState({onShowMsg: true, errorMsg})
  }

  render() {
    const {onShowMsg, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="superMain">
        <div className="mainContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="LoginPic"
          />

          <div>
            <h1 className="welcomeHead">Welcome Back!</h1>
            <form className="formContainer" onSubmit={this.submitForm}>
              <div>{this.renderUsername()}</div>
              <div>{this.renderUserPin()}</div>
              <button type="submit" className="login">
                Login
              </button>
              {onShowMsg && <p>*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
