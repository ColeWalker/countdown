import React, {Component} from 'react';
import { Alert, StyleSheet, ScrollView, Text, TextInput, View, AsyncStorage, Button, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { connect} from 'react-redux';
import { resetToDefaults, changeDeadline, changeProgressColor, changeBackgroundRingColor, changeBackground, changeCountdownName, changeTextColor } from '../actions/index.js';
import { TouchableOpacity } from 'react-native';
import { appStyle } from '../styles/index'
import { spacing } from '../styles/spacing.js'
import { typography } from '../styles/typography.js'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { LinearGradient } from 'expo-linear-gradient'
var moment = require('moment');




const textRow= StyleSheet.flatten([spacing.spaceBetween,spacing.row, {alignItems:"center", paddingVertical:20, flex:1}]);

const styles= StyleSheet.create({
  colorArea:{
    width:50,
    height: 50,
	borderRadius: 50,
	borderWidth: 2,
	borderColor: "#EBE6E6"
  },
  resetText:{
	color: "#B33A3A",
	fontSize: 22
  }

});


class SettingsScreen extends Component{

  constructor(props){
    super(props);
  }
  saveItems(name){
    this.props.changeCountdownName(name);
  }


  resetToDefaults(){
    this.props.resetToDefaults();
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
		   
					<LinearGradient 
					colors={this.props.background.length > 1 ? this.props.background : [this.props.background[0], this.props.background[0]]} 
					style={[{height:200, justifyContent:"center", alignItems:"center",}, spacing.center, spacing.column]} >
						
					
					<AnimatedCircularProgress size={125} width={5} rotation={0} tintColor={this.props.progressColor} backgroundColor = {this.props.backColor} backgroundWidth={1} fill={75} >
                        {fill=><Text style={[styles.innerText, {color: this.props.textColor}]}>Placeholder</Text>}
                    </AnimatedCircularProgress>
                    <Text style={[{color: this.props.textColor}]}>Placeholder</Text>
				</LinearGradient>

          <ScrollView style={{flex:1,}}>
		  	<View
                   style={[{flex:1, paddingBottom: 20, backgroundColor:'#fff'}, textRow]}>
          	 
          	   <Text style={[typography.settingsLabel]}>
          	     Countdown Name:
          	   </Text>
          	   <TextInput 
          	    value = {this.state.name}
				  onChangeText= {(text)=> this.setState({name:text})}
				  onEndEditing={(text)=>{this.saveItems(this.state.name)}}
          	   />
          	 
                   </View>
          	<View style={[textRow]}> 
          	  <Text style={[typography.settingsLabel]}>
          	   Date: 
          	 </Text>
          	  <DatePicker
          	  style={{width: 200, padding:10}}
          	  mode="datetime"
          	  date={moment(this.props.deadline).format("MMM DD, YYYY hh:mm:ss a")}
          	  placeholder="select date"
          	  format="MMM DD, YYYY hh:mm:ss a"
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
                   
                   <View style={{flex:1}}>
          	 
				   <TouchableOpacity 
				             	  onPress={()=>{Alert.alert(
				   				'Reset to Defaults',
				   				'Are you sure you want to reset to defaults?',
				   				[
				   				  {text: "Cancel", style:'cancel'},
				   				  {text: "Confirm", onPress: ()=>{this.resetToDefaults()}}
				   				],
				   			  );}}
				             	 >
				             	   <Text style={[styles.resetText,]}>
				             	     Reset to Defaults
				             	   </Text>
				             	 </TouchableOpacity>
			   
                   </View>
          </ScrollView>
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


export default connect(mapStateToProps, { resetToDefaults, changeDeadline, changeBackgroundRingColor, changeBackground, changeProgressColor,changeTextColor, changeCountdownName })(SettingsScreen);