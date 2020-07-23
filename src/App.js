import React from 'react';
import Homepage from './pages/home';
import { Route } from 'react-router-dom';
import './App.css';
import Navbarcomponent from './components/navbar'
import Productspage from './pages/products'
import Cartpage from './pages/cart'
import Historypage from './pages/history'

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {}
  }
  render() {
      return (
          <div>
              <Navbarcomponent/>
              <Route path='/' component={Homepage} exact />
              <Route path='/products' component={Productspage} exact />
              <Route path='/cart' component={Cartpage} exact />
              <Route path='/history' component={Historypage} exact />
          </div>
      )
  }
}

export default App;

