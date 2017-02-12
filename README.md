[![Build Status](https://travis-ci.org/telemark/tasks-front.svg?branch=master)](https://travis-ci.org/telemark/tasks-front)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# tasks-front

[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/tasks-front.svg)](https://greenkeeper.io/)
Frontend for our tasks microservices

## API
Exposes API. Auth header with jwt

### /user/{userId}
Returns tasks for given user

```sh
$ curl -v -H 'Authorization: your.very.long.jwt' http://localhost:8000/user/mememe 
```

## License
[MIT](LICENSE)