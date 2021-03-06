import Player from '../objects/player'
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
        this.startText = this.add.bitmapText(this.cWidth/2, this.cHeight/2,'gothic', 'START', 20).setVisible(false);
        this.title = this.add.bitmapText(this.cWidth/2, this.cHeight/2-50,'gothic', 'Tymeria: Plaguelands', 72).setOrigin(.5).setScale(10);

        Phaser.Display.Align.In.Center(this.startText, this.button);


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
    }

    update(){

    }

    callLevel(){
        //this.player = new Player();
        //this.player.addToInventory('health_10');
        //this.player.addToInventory('health_25');
        //this.player.addAbilities();
        //this.player.equipAbilities();
        //this.scene.start('battle', {player: this.player, scene: this, goons: ['goblin', 'goblin'], reward: []});
        this.scene.start('level1');
    }
}