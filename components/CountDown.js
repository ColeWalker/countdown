import React, { Component } from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DatePicker from 'react-native-datepicker'
import { connect} from 'react-redux'
import { changeDeadline } from '../actions/index.js'
import { typography } from '../styles/typography.js';
import { spacing } from '../styles/spacing'
var moment = require('moment');

var backWidth=1;
var progressWidth=5;
var progressColor='#FC9F5B';
var backColor='#010400';
var diameter = 100;
/*----------------------------------
        COUNTDOWN MATH
------------------------------------*/
var deadline = new Date("jul 1, 2019 15:37:25").getTime();
var now = new Date().getTime();
var t = deadline-now;
var test;
/*----------------------------------
        COUNTDOWN MATH END
------------------------------------*/

const styles = StyleSheet.create({
   circle:{
    height: diameter,
    width: diameter,
    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: diameter,
    justifyContent: 'center',
    alignItems: 'center'
   },
   innerText:{
       fontSize:55,
       textAlign:'center'
   },
   outerText:{
       fontSize:30,
       textAlign:'center'
   },
});

class CountDown extends Component {
    constructor(props){
        super(props);
    }

    getDays(){
        //var d= Math.floor(t / (1000 * 60 * 60 * 24));
        let d= moment.duration({from: moment() ,to:this.props.deadline});
        d = parseInt(d.asDays());
        
            return d;
        
        
    }
    getHours(){
        var h = Math.floor((t%(1000*60*60*24))/(1000*60*60))
        h = moment.duration({from: moment(), to:this.props.deadline});
        h = parseInt(h.hours());
        if(h>=0){
            return h;
        }
        return 1;
    };
    getMinutes(){
        var m= Math.floor((t % (1000*60*60)) / (1000*60));
        m = moment.duration({from: moment(), to:this.props.deadline});
        m = parseInt(m.minutes());
        if (m>=0){
            return m;
        }
        return 1;
    }
    getSeconds(){
        var s= Math.floor((t % (1000 * 60)) / 1000);
        s = moment.duration({from: moment(), to:this.props.deadline});
        s = parseInt(s.seconds());
        if (s>=0){
            return s;
        }
        return 1;
    }

    setDeadline(date){
        this.setState({deadline: new Date(date).getTime()});
        AsyncStorage.setItem('deadline', JSON.stringify(this.state.deadline));
    }
    getDeadline = async()=>{
        try{
            let unparsedDeadline = await AsyncStorage.getItem('deadline');
            let parsedDeadline = JSON.parse(unparsedDeadline);
            this.setState({deadline: parsedDeadline});
        }
        catch{
            console.log('error getting deadline');
        }
    }
    componentDidMount(){
        this.getDeadline();
        setInterval(()=>{
            now = new Date().getTime();
            
            t = this.props.deadline - now;
            this.setState({
                days: this.getDays(),
            });
            this.setState({
                hours: this.getHours()});
            this.setState({ 
                minutes: this.getMinutes()});
            this.setState({ seconds: this.getSeconds()});
        },1000);
    }

    state = { 
        days: 1,
        hours: 1,
        minutes: 1,
        seconds: 1,
        isError: false,
        deadline: (new Date().getTime() + 100000)
    }
    render() {
        return (
            <View style={[spacing.column, spacing.center, {justifyContent:"center",alignItems:"center"}]}>
                <View style={{alignItems:"center", justifyContent:"center", flex:1, paddingVert:20}} >
                    <AnimatedCircularProgress 
                        size={diameter} 
                        width={progressWidth} 
                        rotation={0} 
                        tintColor={this.props.progressColor} 
                        backgroundColor = {this.props.backColor} 
                        backgroundWidth={backWidth} 
                        fill={(this.state.days/365)*100} 
                    >
                        {fill=><Text style={[styles.innerText, {color: this.props.textColor}]} numberOfLines={1} ellipsizeMode={"clip"}>{this.state.days}</Text>}
                    </AnimatedCircularProgress>
                    <Text style={[styles.outerText, {color: this.props.textColor}]}>Days</Text>
                </View>
                <View style={{alignItems:"center", justifyContent:"center", flex:1, paddingVert:20}}>
                    <AnimatedCircularProgress 
                        size={diameter} 
                        width={progressWidth} 
                        rotation={0} 
                        tintColor={this.props.progressColor} 
                        backgroundColor = {this.props.backColor} 
                        backgroundWidth={backWidth} 
                        fill={(this.state.hours/24)*100}
                    >
                    {fill=><Text style={[styles.innerText, {color: this.props.textColor}]}>{this.state.hours}</Text>}
                    </AnimatedCircularProgress>
                    <Text style={[styles.outerText, {color: this.props.textColor}]}>Hours</Text>
                </View>
                <View style={{alignItems:"center", justifyContent:"center", flex:1, paddingVert:20}}>
                    <AnimatedCircularProgress 
                    size={diameter}
                        width={progressWidth} 
                        rotation={0} 
                        tintColor={this.props.progressColor} 
                        backgroundColor = {this.props.backColor} 
                        backgroundWidth={backWidth} 
                        fill={(this.state.minutes/60)*100}
                    >
                        {fill=><Text style={[styles.innerText, {color: this.props.textColor}]}>{this.state.minutes}</Text>}
                    </AnimatedCircularProgress>
                    <Text style={[styles.outerText, {color: this.props.textColor}]}>Minutes</Text>
                </View>
                <View style={{alignItems:"center", justifyContent:"center", flex:1, paddingVert:20}}>
                    <AnimatedCircularProgress 
                        size={diameter} 
                        width={progressWidth} 
                        rotation={360} 
                        tintColor={this.props.progressColor} 
                        backgroundColor = {this.props.backColor} 
                        backgroundWidth={backWidth} 
                        fill={(this.state.seconds/60)*100}
                    >
                        {fill=><Text style={[styles.innerText, {color: this.props.textColor}]}>{this.state.seconds}</Text>}
                    </AnimatedCircularProgress>
                    <Text style={[styles.outerText, {color: this.props.textColor}]}>Seconds</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    deadline: state.deadline,
    progressColor: state.progressColor,
    backColor: state.backColor,
    background: state.background,
    countdownName: state.countdownName,
    textColor: state.textColor
});

export default connect(mapStateToProps, { changeDeadline })(CountDown);