import click from './assets/media/audio.mp3';

class Sound{
    constructor(){
        this.sound = new Audio(click);
        this.isSound = true;
    }
    playSound(){
        this.sound.play();
    }
    muteSound(){
        this.sound.pause();
    }
}

export default Sound