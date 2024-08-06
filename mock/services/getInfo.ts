export default {
  url: '/userinfo',
  type: 'post',
  response: () => {
    return {
      status: 'success',
      code: 200,
      msg: '成功',
      data: {
        name: 'kabutoa',
        email: 'yinyun957@163.com'
      }
    }
  }
}
