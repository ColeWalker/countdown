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
        colors: ['#ffffff'],
        index: 0
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