// @flow

import React, { Component } from 'react';
import {
  Text,
  View,
  Linking,
} from 'react-native';

import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../styles';

import { APPNAME } from '../constants';

type Props = {
  navigation: any,
};


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});


class About extends Component<Props> {
  static navigationOptions = ({ navigation }: any) => ({
    drawerLabel: 'About',
    title: 'About',
    drawerIcon: <MaterialIcon name="information-outline" size={20} />,
  });

  render() {
    return (
      <View style={styles.infoPage}>
        <Text style={styles.headerText}>About</Text>
        <Text>
          {APPNAME} is an application developed by Samuel Walladge as part of a
          thesis on developing mobile games for Aboriginal languages.
        </Text>
        <Text>
          Source code can be found at
          {' '}
          <Text style={styles.textLink} onPress={() => Linking.openURL('https://github.com/swalladge/dhoyu-mobile/')}>https://github.com/swalladge/dhoyu-mobile/</Text>.
        </Text>

        <Text>
          Please note only Kriol is currently supported for the games. Future
          work may expand this to support other languages and switching between
          them in the application.
        </Text>

        <Text style={styles.headerText}>Acknowledgements</Text>
        <Text>
          This application is inspired by work and designs by Thompson et al.
          (2016) and prototype by Foley (2017).
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
