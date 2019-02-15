const HOST = '/api/v1'

const API = {
  'user': {
    'login': HOST + '/users/login/',

    'logout': HOST + '/users/logout/',

    'register': HOST + '/users/register/',

    'info': HOST + '/users/info/',

    'changePWD': HOST + '/users/changePassword/'
  },
  'diary': {
    'list': HOST + '/diary/',

    'write': HOST + '/diary/write/',

    'upload': '/api/v1/diary/upload/'
  }
}

export default API
