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

        this.startText2 = this.add.bitmapText(this.cWidth/2, this.cHeight/2+200,'livingstone', 'Title will chance as \'Arcania\' is from \'Gothic\' series', 20).setOrigin(.5).setVisible(false);
        this.startText3 = this.add.bitmapText(this.cWidth/2, this.cHeight/2+250,'livingstone', 'I am bummed.', 20).setOrigin(.5).setVisible(false);


        //this.startText = this.add.text(0,0,'START', {fontSize: '24px', fontFamily: 'Berkshire Swash', fill: '#000'}).setVisible(false);
        this.title = this.add.image(this.cWidth/2, (this.cHeight/2)-100, 'title').setScale(10);
        //Phaser.Display.Align.In.Center(this.startText, this.button);

        this.tweens.add({
            targets: this.title,
            scaleX: .7,
            scaleY: .7,
            duration: 1000,
            onComplete: this.showButton,
            onCompleteParams: [ this.button, this.startText, this.startText2, this.startText3]
        });
        this.button.on('pointerdown', function(pointer){
            this.setTexture('buttonDown');

        } );
        this.button.on('pointerout', function(pointer){
            this.setTexture('buttonUp');
        } );
        this.button.on('pointerup', this.callLevel, this);
    }

    showButton(tween, targets, button, start, start2, start3){
        button.setVisible(true);
        start.setVisible(true);
        start2.setVisible(true);
        start3.setVisible(true);
    }

    update(){

    }

    callLevel(){
        this.scene.start('level1');
    }
}