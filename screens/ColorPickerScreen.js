import React, { Component } from 'react'
import { Text, TextInput, View, Button, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import { changeBackgroundRingColor, changeProgressColor, changeTextColor, changeBackground } from '../actions/index.js'
import { connect} from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { appStyle } from '../styles/index'

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

    static defaultProps = {
        type: "background",
    }

    state={
        colors: ['#ffffff'],
        index: 0,
        maxIndex: 1,
    }
    
    colorChangeHandler(color, index = 0){
            var newColors = [...this.state.colors];
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




    addBackgroundColor(){
        this.setState((previousState)=>{
            return{
                colors: [...previousState.colors, "#ffffff"],
                maxIndex: previousState.maxIndex+1,
            }
        });
    }



    changeIndex(index){
        (index<= maxIndex) && this.setState({index:index});
    }

    render() {
        return (
            <View style={appStyle.mainContainer}>
                <Text>Tap the center circle to select your color.</Text>
                <ColorPicker
                    onColorChange={newColor=>{
                             this.colorChangeHandler(fromHsv(newColor));
                    }}
                    onColorSelected={newColor=>this.colorChangeHandler(newColor)}
                    style={{flex:3,
                        paddingBottom: 20,
                    }}
                />
                <View style={[{flex:1}, appStyle.row]}>
                    { this.state.colors && typeof this.state.colors === "object"
                        && this.state.colors.forEach(function(currentValue, index){
                            return (
                                <TouchableOpacity onPress={()=>{changeIndex(index)}}>
                                    <View style={[styles.colorArea, {backgroundColor: currentValue}]} > </View>
                                </TouchableOpacity>
                                );
                            })
                    } 
                    <View style={[styles.colorArea, {backgroundColor: this.state.colors[0]}]}>

                    </View> 
                    {this.props.navigation.getParam('type', 'background')==="background" 
                        && ( <View>
                                <Ionicons name="md-add-circle"  size={50}/>
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
                <Button
                    title="Save Color"
                    onPress={()=>{
                        this.changeColor(this.state.colors);
                        this.props.navigation.navigate('Settings');
                    }} 
                />
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

export default connect(mapStateToProps, { changeBackground, changeBackgroundRingColor, changeProgressColor, changeTextColor })(ColorPickerScreen);