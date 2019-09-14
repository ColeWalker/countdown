import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';

import { MonoText } from '../components/StyledText';
import CountDown from '../components/CountDown'
import { withNavigation } from 'react-navigation';
import { appStyle } from '../styles/index.js'
import { spacing } from '../styles/spacing.js'
import { connect } from 'react-redux';
import { typography } from '../styles/typography'
import { LinearGradient } from 'expo-linear-gradient'

const ConditionalWrap = ({condition, wrap, children}) => condition ? wrap(children) : <View style={[spacing.mainContainer, spacing.column, spacing.center, spacing.mainTopPad]}>{children}</View>;

class HomeScreen extends React.Component {
  render(){
    return (

    
        <LinearGradient 
        colors={this.props.background.length > 1 ? this.props.background : [this.props.background[0], this.props.background[0]]} 
        style={[spacing.mainContainer, spacing.column, spacing.center, spacing.mainTopPad]} >
       
  

      
      {!this.props.countDownName&& ( <Text style={[typography.heading, typography.center, {color: this.props.textColor}]}>{this.props.countdownName}</Text>)}
      <ScrollView
        
        contentContainerStyle={{alignItems:'center'}}
        >
        <CountDown /> 
        
      </ScrollView>
        
          
      <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
          style={appStyle.colorPickerButton}
          />
    </LinearGradient>
  );}

}

HomeScreen.navigationOptions = {
  header: null,
};
const mapStateToProps= state=>({
  countdownName: state.countdownName,
  background: state.background,
  textColor: state.textColor,
});

export default connect(mapStateToProps)(HomeScreen);




