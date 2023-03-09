import { Component } from 'react'
import { WebView } from '@tarojs/components'
import './index.less'
import Taro from '@tarojs/taro'
import { mtbirdUrl } from '@/utils/config';

interface IProps {}

interface IState {
  mtbirdAppId: string | undefined;
}

export default class Index extends Component<IProps, IState> {
  constructor(props) {
    super(props)

    this.state = {
      mtbirdAppId: undefined
    }
  }

  componentWillMount () { }

  componentDidMount = async () => {
    if (!Taro.getExtConfig) return
    const data: any = await Taro.getExtConfig()
    const ext = data.extConfig
    if (ext.mtbirdAppId) {
      this.setState({
        mtbirdAppId: ext.mtbirdAppId
      })
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleMessage(msg: any) {
    console.log("msg:", msg)
  }

  render () {
    if (!this.state.mtbirdAppId) return <div>加载中...</div>

    const src = `${mtbirdUrl}/app/${this.state.mtbirdAppId}/home`

    return (
      <WebView src={src} onMessage={this.handleMessage} />
    )
  }
}
