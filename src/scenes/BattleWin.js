export default class BattleWin extends Phaser.Scene {

    constructor() {
        super({key: 'battleWin'});

    }

    init(data){
        this.lastScene = data.scene;
        this.enemies = data.goons;
    }

    create(){
        let gold = 0;
        let exp = 0;

        //calculate Player Gold
        this.enemies.forEach(function(element){
            console.log(element.getGold());
            gold = gold + element.getGold();
        });
        //calculate Player Exp
        this.enemies.forEach(function(element){
            exp = exp + element.getExp();
        });
        //calculate Combat Exp
        //lookup new abilities
        //assign values to player
        

        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(1/5), "GOLD EARNED: ");
        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(1/5)+20, gold);
        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(2/5), "EXP: EARNED: ");
        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(2/5)+20, exp);
        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(3/5), "ABILITY EARNED: ");
        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(3/5)+20, "KICK");
        //bump
        //this.dead = this.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height*(2/5), 'deadMale');
        //this.dead.anims.play('deadMale', true);
        this.input.on('pointerdown', this.resumeScene, this);

    }

    resumeScene(){
        this.scene.stop(this);
        this.scene.resume(this.lastScene);
    }
}