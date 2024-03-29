import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div>
      <div className="HomeContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="website_logos"
        />
        <button type="button" className="LogoutButton" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="cardContainer">
        <h1 className="cardHead">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digital_card"
        />
      </div>
    </div>
  )
}
export default Home
