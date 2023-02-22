export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/chat/index',
    'pages/my/index',
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  plugins: {
    "chatbot": {
      "version": "1.3.3",
      "provider": "wx8c631f7e9f2465e1"
    }
  }
})
