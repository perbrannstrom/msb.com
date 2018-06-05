/* 
* This script was originaly been created by microservicebus.com
*/
var me;
var timerEvent;
var celciusOrFahrenhet;
var iterationsBeforeShift = 0;
var direction = Math.floor(Math.random() * 2) === 0?-1:1;
var lastTemperature = 20;

var exports = module.exports = {
    
    // The Start method is called from the Host. This is where you 
    // implement your code to fetch the data and submit the message
    // back to the host.
    Start : function () {
        me = this;
        celciusOrFahrenhet = this.GetPropertyValue('static', 'celciusOrFahrenhet');
        var interval = this.GetPropertyValue('static', 'interval');
        
        timerEvent = setInterval(function () {
            me.Run();
            
        }, interval * 1000);
        
        setTimeout(function() {
            me.Run();    
        }, 3000);   
        
    },
    
    // The Stop method is called from the Host when the Host is 
    // either stopped or has updated integrations. 
    Stop : function () {
        clearInterval(timerEvent);
        this.Debug('Simulator stopped');
    },    
    
    Process : function (message, context) { },   
    Run : function (){
        
        if(iterationsBeforeShift===0){
            iterationsBeforeShift = Math.floor((Math.random() * 10) + 1);
            direction = direction = Math.floor(Math.random() * 2) === 0?-1:1;
            iterationsBeforeShift = 10;
        }
        
        iterationsBeforeShift--;
        var increase = (Math.random() * 5) * direction;
        lastTemperature += increase;
        var dummy = me.GetPropertyValue('static', 'dummy');
        var temp = celciusOrFahrenhet.toUpperCase() === "C"? lastTemperature: (lastTemperature -32) * 5 / 9;
        var varaiables = [];
            var msg = {
                source: me.Name,
                temp: temp.toFixed(2)/1,
                dateTime : new Date(),
                _dateTime : Date.parse(new Date()),
                unit: celciusOrFahrenhet,
                dummy : dummy
            };
        me.Debug("Submitting message..." + msg.temp + " C"); 
        me.SubmitMessage(msg, 'application/json', varaiables);
    },
    
};

