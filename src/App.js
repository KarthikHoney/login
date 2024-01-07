import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Login from './components/Login'
import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/ebank/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
      <Redirect to="/notFound" />
    </Switch>
  </>
)

export default App
