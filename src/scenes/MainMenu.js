import getConversation from "../objects/Conversations";
import Player from '../objects/playerSprite';

export default class MainMenu extends Phaser.Scene {

    constructor(config){
        super({key: 'MainMenu'});
    }
    preload (){
        //this.sys.game.events.on('resize', this.resize, this);
        //LOAD ANIMATIONS

        //this.resize();

    }

    create (){


        this.cWidth = this.sys.game.config.width;
        this.cHeight = this.sys.game.config.height;
        this.title = this.add.image(this.cWidth/2, (this.cHeight/2)-100, 'title').setAngle(-20).setScale(.7);
        this.button = this.add.image(this.cWidth/2, this.cHeight/2+50, 'button').setInteractive();
        this.startText = this.add.text(0,0,'START', {fontSize: '24px', fontFamily: 'UnifrakturCook', fill: '#000'});
        Phaser.Display.Align.In.Center(this.startText, this.button);

        this.tweens.add({
            targets: this.title,
            angle: 20,
            duration: 5000,
            yoyo: true,
            repeat: -1,
        });

        this.button.on('pointerdown', function(pointer){
            this.setTexture('buttonPressed');

        } )
        this.button.on('pointerout', function(pointer){
            this.setTexture('button');
        } )
        this.button.on('pointerup', this.callLevel, this);
    }

    update(){

    }

    /*resize(){

        this.title.setPosition(window.innerWidth/2, (window.innerHeight/2)-100);
        this.button.setPosition(window.innerWidth/2, window.innerHeight/2+50);
        Phaser.Display.Align.In.Center(this.startText, this.button);

        let cam = this.cameras.main;
        cam.setViewport(0, 0, window.innerWidth, window.innerHeight);
        cam.zoom = Math.min(window.innerWidth/800, window.innerHeight/600);
    }*/

    callLevel(){
        this.scene.start('level1');
    }
}