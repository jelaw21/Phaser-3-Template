export default class BattleWin extends Phaser.Scene {

    constructor() {
        super({key: 'battleWin'});
    }

    init(data){
        this.lastLevel = data.scene;
        this.enemies = data.goons;
        this.player = data.player;
    }

    create(){
        let gold = 0;
        let exp = 0;
        let totalCount = 0;
        //[UNARMED,SWORD, ... ]
        let expTypeCount = [0, 0];
        let abilities = this.player.getCurrentAvailableAbilities();
        let numAbilities = abilities.length;

        console.log(numAbilities);

        this.enemies.forEach(function(element){
            gold = gold + element.getGold();
        });

        this.enemies.forEach(function(element){
            exp = exp + element.getExp();
        });

        for(let i = 0; i < numAbilities; i++){
            totalCount += this.player.getAbility(i).getCount();
            if(abilities[i].getType() === "UNARMED"){
                expTypeCount[0] = expTypeCount[0] + this.player.getAbility(i).getCount();
            }else if(abilities[i].getType() === "SWORD"){
                expTypeCount[1] = expTypeCount[1] + this.player.getAbility(i).getCount();
            }
        }

        this.player.addUnarmedExp(Math.round((expTypeCount[0]/totalCount)*exp));
        this.player.addSwordExp(Math.round((expTypeCount[1]/totalCount)*exp));


        for(let i = 0; i < numAbilities; i++){
            let expShare = Math.round((this.player.getAbility(i).getCount()/totalCount)*exp);
            this.player.getAbility(i).setExp(expShare);
        }

        this.player.addExp(exp);
        this.player.addGold(gold);
        this.player.levelUp();


        let newAbilities = this.player.getCurrentAvailableAbilities().length;
        console.log(newAbilities);

        let graphics = this.add.graphics();
        graphics.fillStyle(0x2f4f4f, .7);
        graphics.fillRect(this.sys.game.config.width*(2/5), 50, 300, 500);

        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(1/5), "GOLD EARNED: ");
        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(1/5)+20, gold);
        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(2/5), "EXP: EARNED: ");
        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(2/5)+20, exp);
        if(newAbilities > numAbilities){
            this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(3/5), "ABILITY EARNED: ");
            this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(3/5)+20, this.player.currentAvailableAbilities[newAbilities -1].name);
            this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(3/5)+50, "PRESS \'P\' TO EQUIP");
        }
        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height*(4/5), "click to continue...");
        this.input.on('pointerdown', this.resumeScene, this);
    }

    resumeScene(){
        this.scene.stop(this);
        this.scene.resume(this.lastLevel);

    }
}