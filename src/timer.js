class Timer {

    constructor({seconds, minutes, timerSeconds, timerMinutes, interval, counter}) {
       this.seconds = seconds;
       this.minutes = minutes;
       this.timerSeconds = timerSeconds;
       this.timerMinutes = timerMinutes;
       this.interval = interval;
       this.counter = counter;
    }
   
    runTimer(){ 
        this.seconds++; 
        if (this.seconds / 60 === 1) {
            this.seconds = 0;
            this.minutes++;
        }
        
        if (this.seconds < 10) {
            this.timerSeconds = `0${this.seconds}`;
        } else {
            this.timerSeconds = this.seconds;
        }

        if (this.minutes < 10) {
            this.timerMinutes = `${this.minutes}`;
        } else {
            this.timerMinutes = this.minutes;
        }

        document.querySelector('.timer').innerHTML = `${this.timerMinutes} : ${this.timerSeconds}`;
    }

    startTimer(seconds,minutes){
        document.querySelector('.timer').innerHTML = `00 : 00`;
        this.seconds = (seconds)? seconds: '00';
        this.minutes = (minutes)? minutes: '00';
        this.timerSeconds = 0;
        this.timerMinutes = 0;
        window.clearInterval(this.interval);
        this.interval = window.setInterval(() => this.runTimer(),1000);  
        document.getElementById('Pause').innerHTML = "Pause";
        
    }

    pauseTimer(){
        // console.log(this.counter)
        window.clearInterval(this.interval);
        if (this.counter === false) {
            
            document.getElementById("Pause").innerHTML = "Continue";
            this.counter = true; 
        } else {
            this.interval = window.setInterval(() => this.runTimer(),1000);
            document.getElementById('Pause').innerHTML = "Pause";
             this.counter = false; 
        }
    }
    stopTimer(){
        window.clearInterval(this.interval);
        document.querySelector('.timer').innerHTML = `00 : 00`;
    }
}

export default Timer;