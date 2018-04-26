export default class BattleWin extends Phaser.Scene {

    constructor(config) {
        super({key: 'battleWin'});

    }

    init(data){
        this.lastScene = data.scene;
        this.enemies = data.goons;
    }

    create(){

        //calculate Player Gold
        //calculate Player Exp
        //calculate Combat Exp
        //lookup new abilities
        //assign values to player
        

        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(1/5), "GAME OVER").setOrigin(.5);
        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(3/5), "ALL YOUR STUFF ARE BELONGS TO US").setOrigin(.5);
        //bump
        this.dead = this.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*(2/5), 'deadMale');
        this.dead.anims.play('deadMale', true);
        this.input.on('pointerdown', this.startOver, this);

    }

    startOver(){
        this.scene.start('MainMenu');
    }
}