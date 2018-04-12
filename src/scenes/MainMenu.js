export default class MainMenu extends Phaser.Scene {

    constructor(config){
        super({key: 'MainMenu'});
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
    preload (){
        this.sys.game.events.on('resize', this.resize, this);
        this.resize();

    }

    create (){

        var title = this.add.image(this.width/2, (this.height/2)-125, 'title').setAngle(-20);
        var button = this.add.image(this.width/2, this.height/2 + 100, 'button').setInteractive();
        var startText = this.add.text(0,0,'START', {fontSize: '24px', fontFamily: 'UnifrakturCook', fill: '#000'});
        Phaser.Display.Align.In.Center(startText, button);

        this.tweens.add({
            targets: title,
            angle: 20,
            duration: 5000,
            yoyo: true,
            repeat: -1,

        });

        this.cameras.main.startFollow(title);

        button.on('pointerdown', function(pointer){
            this.setTexture('buttonPressed');

        } )
        button.on('pointerout', function(pointer){
            this.setTexture('button');
        } )
        button.on('pointerup', this.callLevel, this);
    }

    update(){

    }

    resize(){

        let cam = this.cameras.main;
        cam.setViewport(0, 0, window.innerWidth, window.innerHeight);
        cam.zoom = Math.min(window.innerWidth/800, window.innerHeight/600);
    }

    callLevel(){
        this.scene.start('game');
    }
}