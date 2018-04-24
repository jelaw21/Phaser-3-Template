export default class Battle extends Phaser.Scene {

    constructor(config) {
        super({key: 'battle'});

    }

    create(){

        let graphics = this.add.graphics();

        graphics.fillStyle(0x0000ff, .7);
        graphics.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        graphics.fillStyle(0xff00ff, .7);
        graphics.fillRect(0,this.sys.game.config.height*(3/5), this.sys.game.config.width *(3/5), this.sys.game.config.height );
        graphics.fillStyle(0x00ffff, .7);
        graphics.fillRect(this.sys.game.config.width *(3/5),this.sys.game.config.height*(3/5), this.sys.game.config.width *(3/5), this.sys.game.config.height );
        console.log(this.sys.game.config.height*(3/5) + ' ' + this.sys.game.config.width *(3/5) + ' ' + this.sys.game.config.height);
        let attack1 = this.add.image(20, 365, 'button').setOrigin(0);
        let attack1Super = this.add.image(260, 365, 'button').setOrigin(0);
        let attack2 = this.add.image(20, 425, 'button').setOrigin(0);
        let attack2Super = this.add.image(260, 425, 'button').setOrigin(0);
        let attack3 = this.add.image(20, 485, 'button').setOrigin(0);
        let attack3Super = this.add.image(260, 485, 'button').setOrigin(0);
        let attack4 = this.add.image(20, 545, 'button').setOrigin(0);
        let attack4Super = this.add.image(260, 545, 'button').setOrigin(0);
        let item = this.add.image(500, 485, 'button').setOrigin(0);
        let retreat = this.add.image(500, 545, 'button').setOrigin(0);
        let attack1Text = this.add.text(0 , 0, 'PUNCH');
        let attack2Text = this.add.text(0 , 0, 'KICK');
        let attack3Text = this.add.text(0 , 0, 'SLASH');
        let attack4Text = this.add.text(0 , 0, 'STAB');
        let attack5Text = this.add.text(0 , 0, 'SUPER PUNCH');
        let attack6Text = this.add.text(0 , 0, 'JUMPING SLASH');
        let attack7Text = this.add.text(0 , 0, 'AGILE CRANE');
        let attack8Text = this.add.text(0 , 0, 'HYPER CHASM');
        let itemText = this.add.text(0 , 0, 'ITEM');
        let retreatText = this.add.text(0 , 0, 'RUN AWAY');
        Phaser.Display.Align.In.Center(attack1Text, attack1);
        Phaser.Display.Align.In.Center(attack2Text, attack2);
        Phaser.Display.Align.In.Center(attack3Text, attack3);
        Phaser.Display.Align.In.Center(attack4Text, attack4);
        Phaser.Display.Align.In.Center(attack5Text, attack1Super);
        Phaser.Display.Align.In.Center(attack6Text, attack2Super);
        Phaser.Display.Align.In.Center(attack7Text, attack3Super);
        Phaser.Display.Align.In.Center(attack8Text, attack4Super);
        Phaser.Display.Align.In.Center(itemText, item);
        Phaser.Display.Align.In.Center(retreatText, retreat);

        let circle = this.add.image(100, 100,'exitBackground').setScale(4);
        let circleTarget = graphics.strokeCircle(100, 100, 20);


        this.tweens.add({
            targets: circle,
            scaleX: 0,
            scaleY: 0,
            duration: 1000,
            onComplete: this.doNext,
            onCompleteParams: [ ]
        })
    }

    doNext(tween, targets){
        console.log(this);
        console.log("tween updated");
        tween.updateTo('duration', 2000);
        tween.restart();
    }
}
