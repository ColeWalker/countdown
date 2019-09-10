import React, {Component} from 'react';
import { Alert, StyleSheet, ScrollView, Text, TextInput, View, AsyncStorage, Button, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { connect} from 'react-redux';
import { changeDeadline, changeProgressColor, changeBackgroundRingColor, changeBackground, changeCountdownName, changeTextColor } from '../actions/index.js';
import { TouchableOpacity } from 'react-native';
import { appStyle } from '../styles/index'
import { spacing } from '../styles/spacing.js'
import { typography } from '../styles/typography.js'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
var moment = require('moment');




const textRow= StyleSheet.flatten([spacing.spaceBetween,spacing.row, {alignItems:"center", paddingBottom:20, flex:1}]);

const styles= StyleSheet.create({
  colorArea:{
    width:50,
    height: 50,
    borderRadius: 50,
  },

});

class SettingsScreen extends Component{

  constructor(props){
    super(props);
  }
  saveItems(name){
    this.props.changeCountdownName(name);
  }

  resetToDefaultsWarning(){
    Alert.alert(
      'Reset to Defaults',
      'Are you sure you want to reset to defaults?'
      [
        {text: "Cancel", style: 'cancel'},
        {text: "Confirm", onPress: ()=>{this.resetToDefaults()}}
      ],
      {cancelable: true}
    )
  }

  resetToDefaults(){
    
  }

  state={
    name: this.props.countdownName,
  }

  static navigationOptions = ({navigation}) =>{
    return{
      title: 'Settings',
    }
  };
  render(){
    
    return(
       <KeyboardAwareScrollView style={[spacing.mainContainer]} contentContainerStyle={{flex:1}} enableOnAndroid={true}>
          <View style={[textRow]}> 
            <Text style={[typography.settingsLabel]}>
             Date: 
           </Text>
            <DatePicker
            style={{width: 200}}
            mode="datetime"
            date={moment(this.props.deadline).format("MMM DD, YYYY hh:mm:ss")}
            placeholder="select date"
            format="MMM DD, YYYY hh:mm:ss"
            minDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={(date) => {this.props.changeDeadline(new Date(date).getTime())}}
            />
          </View>
         <View style={[textRow]}>
           <Text style={[typography.settingsLabel]}>
            Background:
           </Text>
           <TouchableOpacity onPress={()=>this.props.navigation.navigate('ColorPicker', {type: 'background'})}>
             <View style={[styles.colorArea,{
               backgroundColor: this.props.background[0],
             }]}>
             </View>
           </TouchableOpacity>
         </View>
         <View style={[textRow]}>
           <Text style={[typography.settingsLabel]}>
             Text Color:
           </Text>
           <TouchableOpacity onPress={()=>this.props.navigation.navigate('ColorPicker', {type: 'textcolor'})}>
             <View style={[styles.colorArea, {
               backgroundColor: this.props.textColor,
             }]}>
             </View>
           </TouchableOpacity>
         </View>
         <View style={[textRow]}>
           <Text style={[typography.settingsLabel]}>
             Ring Color:
           </Text>
           <TouchableOpacity onPress={()=>this.props.navigation.navigate('ColorPicker', {type: 'backgroundringcolor'})}>
             <View style={[styles.colorArea, {
               backgroundColor: this.props.backColor,

             }]}>
             </View>
           </TouchableOpacity>
         </View>
         <View style={[textRow]}>
           <Text style={[typography.settingsLabel]}>
             Progress Color:
           </Text>
           <TouchableOpacity onPress={()=>this.props.navigation.navigate('ColorPicker', {type: 'progresscolor'})}>
             <View style={[styles.colorArea, {
               backgroundColor: this.props.progressColor,

             }]}>
             </View>
           </TouchableOpacity>
         </View>
         <View
         style={[{flex:1, paddingBottom: 20, backgroundColor:'#fff'}, textRow]}>
           
             <Text style={[typography.settingsLabel]}>
               Countdown Name:
             </Text>
             <TextInput 
              value = {this.state.name}
              onChangeText= {(text)=> this.setState({name:text})}
             />
           
         </View>
         <View style={{flex:1}}>
           <TouchableOpacity 
            onPress={()=>{this.resetToDefaultsWarning()}}
           >
             <Text >
               Reset to Defaults
             </Text>
           </TouchableOpacity>
         </View>
         <View style={[{flex:2, display: "flex", flexDirection: "column", justifyContent:"space-around"}, ]}>
         <Button
          style={{flex:1}}
            title="Save"
            onPress={()=> {this.saveItems(this.state.name)}}
          />
          <Button
          style={{flex:1}}
            title="Go Back"
            onPress={()=> this.props.navigation.navigate('Home')}
          />
        </View>
      </KeyboardAwareScrollView>

    )
    
  }
}


const mapStateToProps = state => (
  
  {
  
  deadline: state.deadline,
  progressColor: state.progressColor,
  backColor: state.backColor,
  background: state.background,
  countdownName: state.countdownName,
  textColor: state.textColor
});


export default connect(mapStateToProps, { changeDeadline, changeBackgroundRingColor, changeBackground, changeProgressColor,changeTextColor, changeCountdownName })(SettingsScreen);