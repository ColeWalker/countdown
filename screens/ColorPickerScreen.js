import React, { Component } from 'react'
import { Text, TextInput, View, Button, KeyboardAvoidingView } from 'react-native'
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import { changeBackgroundRingColor, changeProgressColor, changeTextColor, changeBackground } from '../actions/index.js'
import { connect} from 'react-redux'

import { appStyle } from '../styles/index'


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
        color: '#ffffff'
    }
    
    //pass in props for what color it's supposed to change
    //type: "background","backgroundring","progresscolor","textcolor"
    changeColor(color){
        const type = this.props.navigation.getParam('type', 'background');
        switch(type){
            case "background":
                this.props.changeBackground(color);
                break;

            case "backgroundringcolor":
                this.props.changeBackgroundRingColor(color);
                break;
            
            case "progresscolor":
                this.props.changeProgressColor(color);
                break;
            
            case "textcolor":
                this.props.changeTextColor(color);
                break;
            
            default:
                this.props.changeBackground(color);
        }
    }

    render() {
        return (
            <View style={appStyle.mainContainer}>
                <Text>Tap the center circle to select your color.</Text>
                <ColorPicker
                    onColorChange={newColor=>{
                        this.setState(previousState=>({
                            color: fromHsv(newColor)
                        }));
                    }}
                    onColorSelected={newColor=>this.setState(previousState=>
                        ({color: newColor}))}
                    style={{flex:3,
                        paddingBottom: 20,
                    }}
                />
                <KeyboardAvoidingView
                    style={{flex:1, paddingBottom: 20,}}
                    behavior={"position"}
                >
                    <Text>Hex Code:</Text>
                    <TextInput
                        onChangeText= {(text)=> this.setState({color:text})}
                        value = {this.state.color}
                        maxLength={7}
                        keyboardType={"default"}
                    />
                </KeyboardAvoidingView>
                <Button
                    title="Save Color"
                    onPress={()=>{
                        this.changeColor(this.state.color);
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