import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { toast } from 'react-toastify'
import { store, history } from 'store'
import apolloClient from './settings/createApolloClient'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-toastify/dist/ReactToastify.css'
import './styles/core.scss'
import * as serviceWorker from './serviceWorker'

toast.configure({
  autoClose: 8000,
  draggable: false,
})

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
