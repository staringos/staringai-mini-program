import { Component, PropsWithChildren } from 'react'
import './app.less'
import { StoreProvider, Store } from './store'

const store = new Store();

class App extends Component<PropsWithChildren> {

  componentDidMount () {
  }

  componentDidShow () {
  }

  componentDidHide () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return <StoreProvider store={store}>{this.props.children}</StoreProvider>
  }
}

export default App
