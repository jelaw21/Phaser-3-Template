export default class BattleWin extends Phaser.Scene {

    constructor() {
        super({key: 'battleWin'});
    }

    init(data){
        this.lastScene = data.scene;
        this.enemies = data.goons;
        this.player = data.player;
    }

    create(){
        let gold = 0;
        let exp = 0;
        let numAbilities = this.player.getAvailableAbilities().length;

        this.enemies.forEach(function(element){
            gold = gold + element.getGold();
        });

        this.enemies.forEach(function(element){
            exp = exp + element.getExp();
        });

        this.player.addGold(gold);
        this.player.addUnarmedExp(exp);
        this.player.addAbilities();
        let newAbilities = this.player.getAvailableAbilities().length;

        let graphics = this.add.graphics();
        graphics.fillStyle(0x2f4f4f, .7);
        graphics.fillRect(this.sys.game.config.width*(2/5), 50, 300, 500);

        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(1/5), "GOLD EARNED: ");
        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(1/5)+20, gold);
        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(2/5), "EXP: EARNED: ");
        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(2/5)+20, exp);
        if(newAbilities > numAbilities){
            this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(3/5), "ABILITY EARNED: ");
            this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(3/5)+20, this.player.availableAbilities[newAbilities -1].name);
            this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(3/5)+50, "PRESS \'P\' TO EQUIP");
        }
        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(4/5), "click to continue...");
        this.input.on('pointerdown', this.resumeScene, this);
    }

    resumeScene(){
        this.scene.stop(this);
        this.scene.resume(this.lastScene);

    }
}