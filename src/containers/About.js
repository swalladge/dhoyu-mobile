// @flow

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
} from 'react-native';

import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../styles';

type Props = {
  navigation: any,
};


import { APPNAME } from '../constants';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});


class About extends Component<Props> {
  static navigationOptions = ({ navigation }: any) => ({
    drawerLabel: 'About',
    title: 'About',
    drawerIcon: <MaterialIcon name='information-outline' size={20} />,
  });

  // TODO: real github link once hosted
  render() {
    return (
      <View style={styles.infoPage}>
        <Text style={styles.headerText}>About</Text>
        <Text>
          {APPNAME} is an application developed by Samuel Walladge as part of a
          thesis on developing mobile games for Aboriginal languages.
        </Text>
        <Text>
          Source code can be found on
          {' '}
          <Text style={styles.textLink} onPress={() => Linking.openURL('https://github.com/')}>GitHub</Text>.
        </Text>

        <Text style={styles.headerText}>Acknowledgements</Text>
        <Text>
          This application is inspired by work and designs by Thompson et al. (2016) and prototype by
          Foley (2017).
        </Text>


        <Text style={styles.headerText}>Feedback</Text>
        <Text>
          Please direct any questions, feedback, concerns, or suggestions to Samuel
          Walladge via email to
          {' '}
          <Text style={styles.textLink} onPress={() => Linking.openURL('mailto:samuel@swalladge.id.au')}>samuel@swalladge.id.au</Text>.
        </Text>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
