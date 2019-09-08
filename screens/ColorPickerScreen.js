import React, { Component } from 'react'
import { Text, TextInput, View, Button, KeyboardAvoidingView, StyleSheet, TouchableOpacity} from 'react-native'
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
    

    componentDidMount(){
        if(this.props.navigation.getParam('type', 'background')=="background"){
            this.setState({colors: this.props.background});
        }
    }
    colorChangeHandler(color, index = 0){
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

    

    changeIndex(index){
        (index <= this.state.maxIndex) && this.setState({index:index});
    }

    render() {
        return (
            <View style={appStyle.mainContainer}>
                <Text>Tap the center circle to select your color.</Text>
                <ColorPicker
                    onColorChange={newColor=>{
                             this.colorChangeHandler(fromHsv(newColor), this.state.index);
                    }}
                    onColorSelected={newColor=>this.colorChangeHandler(newColor, this.state.index)}
                    style={{flex:3,
                        paddingBottom: 20,
                    }}
                />
                <View style={[{flex:1}, appStyle.row]}>
                    {this.state.colors.map((currentValue, index)=>{
                            return (
                                <TouchableOpacity onPress={()=>{this.changeIndex(index)}} key={currentValue}>
                                    <View style={[styles.colorArea, {backgroundColor: this.state.colors[index]}]} />
                                    <Text>{currentValue + index}</Text>
                                </TouchableOpacity>
                                );
                            })
                    } 
                    {this.props.navigation.getParam('type', 'background')==="background" 
                        && (
                        <View style={[appStyle.row, {flex:1}]}>
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