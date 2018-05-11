
# Dhoyu Mobile

Copyright © 2018 Samuel Walladge


## About

A mobile game for literacy in Aboriginal languages.

Please note that MVP aimed at supporting Kriol only.

Requires access to an instance of the [server](https://github.com/swalladge/dhoyu-server) to
operate.


### The Dhoyu project

This repository is part of a thesis on mobile games for Aboriginal languages.

Canonical sources are available at the following urls:

- dhoyu-mobile: <https://github.com/swalladge/dhoyu>
- dhoyu-server: <https://github.com/swalladge/dhoyu-server>


## Development

```
git clone repo-source repo
cd repo
npm install -g react-native
yarn install

# edit .env to add api root variable
# example: API_ROOT='http://10.0.0.2:5000/api'
vi .env

# fire up an emulator
# then run:
react-native run-android
```

### Notes

- includes flowtypes so add flow linter to editor (eg. to js linters in ale on
  vim)


## Build release apk

Edit `.env.production` to provide the `API_ROOT` you want baked into the app.

Set up your signing key config, etc. The `android/app/build.gradle` looks for
`DHOYU_RELEASE_{STORE_FILE,STORE_PASSWORD,KEY_ALIAS,KEY_PASSWORD}` vars by
default.

Run `yarn build-release`.

The release apk should appear at
`android/app/build/outputs/apk/app-release.apk`. :tada:


## License


    Dhoyu Mobile
    Copyright (C) 2018 Samuel Walladge

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
