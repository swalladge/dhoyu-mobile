// @flow

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  infoPage: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
  },
  textLink: {
    color: 'blue',
  },
  createImage: {
  },
  gameInList: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    margin: 5,
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  letterTilesWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  letterTile: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    margin: 5,
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

export default styles;
