interface MediaPlayer{
    play(audioType: string, fileName: string): void;
}

class AdvancedMediaPlayer{
    playVlc(fileName: string): void{
        console.log("Playing VLC file: " + fileName);
    }
    playMp4(fileName:string): void{ 
        console.log("Playing Mp4 file :", fileName);
    }
}

class MediaAdapter implements MediaPlayer{

    private advancedMediaPlayer: AdvancedMediaPlayer;
    constructor(audioType: string){
        this.advancedMediaPlayer = new AdvancedMediaPlayer;
    }
    play(audioType: string, fileName: string){
        switch(audioType){
            case "VLC" :
                this.advancedMediaPlayer.playVlc(fileName);
                break;
            case "MP4" :
                this.advancedMediaPlayer.playMp4(fileName);
                break;
            default :
                console.log("Invalid Media Type" ,audioType);
                break;
        }
    }
}

class AudioPlayer implements MediaPlayer{
    private mediaAdaptor: MediaAdapter;
    constructor(){
        
    }
    play(audioType: string, fileName: string){
        if(audioType === "VLC" || audioType === "MP4"){
            this.mediaAdaptor = new MediaAdapter(audioType);
            this.mediaAdaptor.play(audioType, fileName);
        }else{
            console.log("Invalid Media Type", audioType);
        }
    }
}

const player = new AudioPlayer();
player.play("mp3", "song1.mp3");
player.play("MP4", "movie.mp4");
player.play("vlc", "video.vlc");
