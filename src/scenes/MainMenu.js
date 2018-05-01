export default class MainMenu extends Phaser.Scene {

    constructor(config){
        super({key: 'MainMenu'});
    }
    preload (){

    }

    create (){

        this.cWidth = this.sys.game.config.width;
        this.cHeight = this.sys.game.config.height;
        this.button = this.add.image(this.cWidth/2, this.cHeight/2+50, 'buttonUp').setInteractive().setVisible(false);
        this.startText = this.add.bitmapText(this.cWidth/2-42, this.cHeight/2+35,'livingstone', 'START', 32).setVisible(false);


        //this.startText = this.add.text(0,0,'START', {fontSize: '24px', fontFamily: 'Berkshire Swash', fill: '#000'}).setVisible(false);
        this.title = this.add.image(this.cWidth/2, (this.cHeight/2)-100, 'title').setScale(10);
        //Phaser.Display.Align.In.Center(this.startText, this.button);

        this.tweens.add({
            targets: this.title,
            scaleX: .7,
            scaleY: .7,
            duration: 1000,
            onComplete: this.showButton,
            onCompleteParams: [ this.button, this.startText]
        });
        this.button.on('pointerdown', function(pointer){
            this.setTexture('buttonDown');

        } );
        this.button.on('pointerout', function(pointer){
            this.setTexture('buttonUp');
        } );
        this.button.on('pointerup', this.callLevel, this);
    }

    showButton(tween, targets, button, start){
        button.setVisible(true);
        start.setVisible(true);
    }

    update(){

    }

    callLevel(){
        this.scene.start('level1');
    }
}