export default class MainMenu extends Phaser.Scene {

    constructor(config){
        super({key: 'MainMenu'});
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
    preload (){

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

        })
    }

    update(){

    }
}