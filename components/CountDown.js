import React, { Component } from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DatePicker from 'react-native-datepicker'
import { connect} from 'react-redux'
import { changeDeadline } from '../actions/index.js'
import { typography } from '../styles/typography.js';
import { spacing } from '../styles/spacing'

var backWidth=1;
var progressWidth=5;
var progressColor='#FC9F5B';
var backColor='#010400';
var diameter = 95;
/*----------------------------------
        COUNTDOWN MATH
------------------------------------*/
var deadline = new Date("jul 1, 2019 15:37:25").getTime();
var now = new Date().getTime();
var t = deadline-now;
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
        var d= Math.floor(t / (1000 * 60 * 60 * 24));
        if(d>=0){
            return d;
        }
        return 1;
    }
    getHours(){
        var h = Math.floor((t%(1000*60*60*24))/(1000*60*60))
        if(h>=0){
            return h;
        }
        return 1;
    };
    getMinutes(){
        var m= Math.floor((t % (1000*60*60)) / (1000*60));
        if (m>=0){
            return m;
        }
        return 1;
    }
    getSeconds(){
        var s= Math.floor((t % (1000 * 60)) / 1000);
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
            t = this.props.deadline -now;
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
                        tintColor={progressColor} 
                        backgroundColor = {backColor} 
                        backgroundWidth={backWidth} 
                        fill={(this.state.days/365)*100} 
                    >
                        {fill=><Text style={styles.innerText}>{this.state.days}</Text>}
                    </AnimatedCircularProgress>
                    <Text style={styles.outerText}>Days</Text>
                </View>
                <View style={{alignItems:"center", justifyContent:"center", flex:1, paddingVert:20}}>
                    <AnimatedCircularProgress 
                        size={diameter} 
                        width={progressWidth} 
                        rotation={0} 
                        tintColor={progressColor} 
                        backgroundColor = {backColor} 
                        backgroundWidth={backWidth} 
                        fill={(this.state.hours/24)*100}
                    >
                    {fill=><Text style={styles.innerText}>{this.state.hours}</Text>}
                    </AnimatedCircularProgress>
                    <Text style={styles.outerText}>Hours</Text>
                </View>
                <View style={{alignItems:"center", justifyContent:"center", flex:1, paddingVert:20}}>
                    <AnimatedCircularProgress 
                    size={diameter}
                        width={progressWidth} 
                        rotation={0} 
                        tintColor={progressColor} 
                        backgroundColor = {backColor} 
                        backgroundWidth={backWidth} 
                        fill={(this.state.minutes/60)*100}
                    >
                        {fill=><Text style={styles.innerText}>{this.state.minutes}</Text>}
                    </AnimatedCircularProgress>
                    <Text style={styles.outerText}>Minutes</Text>
                </View>
                <View style={{alignItems:"center", justifyContent:"center", flex:1, paddingVert:20}}>
                    <AnimatedCircularProgress 
                        size={diameter} 
                        width={progressWidth} 
                        rotation={360} 
                        tintColor={progressColor} 
                        backgroundColor = {backColor} 
                        backgroundWidth={backWidth} 
                        fill={(this.state.seconds/60)*100}
                    >
                        {fill=><Text style={styles.innerText}>{this.state.seconds}</Text>}
                    </AnimatedCircularProgress>
                    <Text style={styles.outerText}>Seconds</Text>
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