const HOST = '/api/v1'

const API = {
  'user': {
    'login': HOST + '/users/login/',

    'logout': HOST + '/users/logout/',

    'register': HOST + '/users/register/',

    'info': HOST + '/users/info/'
  },
  'diary': {
    'list': HOST + '/diary/',

    'write': HOST + '/diary/write/'
  }
}

export default API
