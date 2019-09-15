import React, { Component } from 'react'
import { Alert, Image, ScrollView, Text, TextInput, View, Button, KeyboardAvoidingView, StyleSheet, TouchableOpacity} from 'react-native'
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import { changeBackgroundRingColor, changeProgressColor, changeTextColor, changeBackground, changeBackgroundImageURI } from '../actions/index.js'
import { connect} from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { appStyle } from '../styles/index'
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
import Constants from "expo-constants"
import {MaterialIcons}from "@expo/vector-icons"

const styles= StyleSheet.create({
    colorArea:{
      width:50,
      height: 50,
      borderRadius: 50,
    },
    plusButton:{
        width:50,
        height:50,
        borderRadius:50,
    }
  });



class ColorPickerScreen extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = ({navigation}) =>{
        return {
            title: 'Pick Color',
        }
    };

    saveHandler(){
        Alert.alert(
            "Confirm Changes",
            "Do you want to save the changes you have made?",
            [
                {
                    text: "Cancel",
                    onPress: () =>{

                    }
                },
                {
                    text: "Confirm",
                    onPress: () => {
                        if(this.state.imageSelected){
                            this.props.changeBackgroundImageURI(this.state.imageURI);
                        }
                        else{
                            this.props.navigation.getParam('type', 'background')=="background" && this.props.changeBackgroundImageURI(null);
                            this.changeColor(this.state.colors);
                        }
                        
                        this.props.navigation.navigate('Settings');
                    }
                },
                
            ]
        )
    }

    static defaultProps = {
        type: "background",
    }

    state={
        colors: ['#ffffff'],
        index: 0,
        maxIndex: 1,
        isBackground: false,
        imageURI: "",
        imageSelected: false,
    }
    

    componentDidMount(){
        this.getPermissionAsync();
        if(this.props.navigation.getParam('type', 'background')=="background"){
            this.setState({
                colors: this.props.background,
                isBackground: true,
            });
        }
    }
    
    colorChangeHandler(color, index = 0){
            this.setState({imageSelected:false, imageURI: null});
            let newColors = [...this.state.colors];
            newColors.splice(index, 1, color);
            this.setState({colors: newColors});
    }

    
    
    //pass in props for what color it's supposed to change
    //type: "background","backgroundring","progresscolor","textcolor"
    changeColor(colors){
        const type = this.props.navigation.getParam('type', 'background');
        
        switch(type){
            case "background":
                this.props.changeBackground(colors);
                break;

            case "backgroundringcolor":
                this.props.changeBackgroundRingColor(colors[0]);
                break;
            
            case "progresscolor":
                this.props.changeProgressColor(colors[0]);
                break;
            
            case "textcolor":
                this.props.changeTextColor(colors[0]);
                break;
            
            default:
                this.props.changeBackground(colors[0]);
        }
    }

    //function called to add color to gradient
    addBackgroundColor(){
        this.setState((previousState)=>{
            return({
                colors: [...previousState.colors, "#ffffff"],
                maxIndex: previousState.maxIndex+1,
            })
        });
    }

    //function called to remove color from gradient
    removeBackgroundColor(index){
        let newColors = [...this.state.colors];
        newColors.splice(index, 1);
        this.setState({
            colors:[...newColors],
        });
    }



    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }


    changeImage= async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,

        });
        if(!result.cancelled){
            this.setState({
                imageSelected: true,
                imageURI: result.uri
            });
        }
        
    }

    

    changeIndex(index){
        (index <= this.state.colors.length) && this.setState({index:index});
    }

    

    render() {
        return (
            <View style={appStyle.mainContainer}>

                <View style={{flex:1}}>
                    <View style={[appStyle.row, {flexDirection:"row-reverse",justifyContent:"space-between"}]}>
                       
                        <MaterialIcons.Button
                            name="save"
                            backgroundColor="#2b2b2b"
                            style={{color: "#ffffff", alignSelf:"flex-end"}}
                            onPress={()=>{
                                this.saveHandler();
                            }} 
                        >
                            
                            Save Changes
                        </MaterialIcons.Button>
                        {this.state.isBackground &&
                        <MaterialIcons.Button
                            name="image"
                            backgroundColor="#2b2b2b"
                            style={{color: "#ffffff",}}
                            onPress={()=>{
                                this.changeImage();
                            }} 
                        >
                            Select Background Image
                        </MaterialIcons.Button>}
                        
                    </View>
                    <Text>Tap the center circle to select your color.</Text>
                    
                    <ColorPicker
                        onColorChange={newColor=>{
                                 this.colorChangeHandler(fromHsv(newColor), this.state.index);
                        }}
                        onColorSelected={newColor=>this.colorChangeHandler(newColor, this.state.index)}
                        style={{flex:1,
                            paddingBottom: 20,
                        }}
                    />
                </View>
                <ScrollView style={{flex:6, paddingHorizontal:20}}>
                <View style={[{flex:2, flexWrap:"wrap", width: "100%"}, appStyle.row]}>
                    {this.state.colors.map((currentValue, index)=>{
                            return (
                                <TouchableOpacity onPress={()=>{this.changeIndex(index)}} key={index}>
                                    <View style={[styles.colorArea, {backgroundColor: this.state.colors[index]}]} />
                                    <Text>{currentValue + index}</Text>
                                </TouchableOpacity>
                                );
                            })
                    } 
                    {this.props.navigation.getParam('type', 'background')==="background" 
                        && (
                        <View style={[appStyle.row]}>
                            <TouchableOpacity onPress={()=>{
                                this.addBackgroundColor();
                            }}>
                            	<View style={{flex:1}}>
                            	        <Ionicons name="md-add-circle"  size={50}/>
                            	</View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                this.removeBackgroundColor(this.state.index);
                            }}>
                            	<View style={{flex:1}} >
                            	        <Ionicons name="md-remove-circle"  size={50}/>
                            	</View>
                            </TouchableOpacity>
                        </View>
                        )
                    }
                    
                </View>
                <KeyboardAvoidingView
                    style={{flex:1, paddingBottom: 20,}}
                    behavior={"position"}
                >
                    <Text>Hex Code:</Text>
                    <TextInput
                        onChangeText= {(color)=>this.colorChangeHandler(color)}
                        value = {this.state.colors[this.state.index]}
                        maxLength={7}
                        keyboardType={"default"}
                    />
                </KeyboardAvoidingView>
                {this.state.isBackground && (<Button
                    title="Select Background Image"
                    onPress={()=>{
                        this.changeImage();
                    }}
                />)}
                {this.state.imageSelected &&
                (<Image source={{uri: this.state.imageURI}} style={{width:100, height:100}}/>)}
               
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    progressColor: state.progressColor,
    backColor: state.backColor,
    background: state.background,
    textColor: state.textColor
});

export default connect(mapStateToProps, { changeBackground, changeBackgroundRingColor, changeProgressColor, changeTextColor, changeBackgroundImageURI })(ColorPickerScreen);