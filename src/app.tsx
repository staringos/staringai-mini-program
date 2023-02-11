import { Component, PropsWithChildren } from 'react'
import './app.less'
import Store from './store'

class App extends Component<PropsWithChildren> {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return <Store.Provider>{this.props.children}</Store.Provider>
  }
}

export default App
