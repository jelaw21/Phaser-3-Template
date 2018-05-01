import Enemy from '../objects/enemy'
import getEnemy from '../objects/Enemies'
import Player from '../objects/player'

export default class BattleWin extends Phaser.Scene {

    constructor() {
        super({key: 'battleWin'});
    }

    init(data){
        this.lastLevel = data.scene;
        this.enemies = data.goons;
        this.player = data.player;

        //this.player = new Player();
        //this.enemies = [new Enemy(getEnemy('goblin'))];
    }

    create(){
        let cWidth = this.sys.game.config.width;
        let cHeight = this.sys.game.config.height;

        this.style = {
            fontSize: 16,
            fontFamily: 'Sanchez',
            fill: 'white',
            stroke: '#222',
            strokeThickness: 2,

        };

        this.style2 = {
            fontSize: 16,
            fontFamily: 'Sanchez',
            fill: 'white',
            rtl: true,
            stroke: '#222',
            strokeThickness: 2,

        };

        this.style3 = {
            fontSize: 24,
            fontFamily: 'Cute Font',
            stroke: '#222',
            strokeThickness: 2,

        };

        let gold = 0;
        let exp = 0;
        let totalCount = 0;
        let oldUnarmLevel = this.player.getUnarmedLevel();
        let oldSwordLevel = this.player.getSwordLevel();
        //[UNARMED,SWORD, ... ]
        let expTypeCount = [0, 0];
        let abilities = this.player.getCurrentAvailableAbilities();
        let numAbilities = abilities.length;

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

        let newUnarmedLevel = this.player.getUnarmedLevel();
        let newSwordLevel = this.player.getSwordLevel();


        let newAbilities = this.player.getCurrentAvailableAbilities().length;

        this.background = this.add.image(cWidth/2, cHeight/2, 'battleResultGUI');

        this.title = this.add.bitmapText(cWidth/2, 83, 'livingstone',"VICTORY", 34).setOrigin(.5);

        this.add.text(cWidth/2 - 90, cHeight*(1/5)+20, "GOLD EARNED: ", this.style);
        this.add.text(cWidth/2 + 87, cHeight*(1/5)+20, gold, this.style2);
        this.add.text(cWidth/2 - 90, cHeight*(1/5)+55, "EXP: EARNED: ", this.style);
        this.add.text(cWidth/2 + 87, cHeight*(1/5)+55, exp, this.style2);

        this.add.text(cWidth/2 - 90, cHeight*(1/5)+115, "UNARMED EXP: ", this.style);
        this.add.text(cWidth/2 + 87, cHeight*(1/5)+115, this.player.getUnarmedExp(), this.style2);

        if(newUnarmedLevel > oldUnarmLevel){
            this.unarmedButton = this.add.image(cWidth/2, cHeight*(1/5)+150, 'battleButDown').setDisplaySize(128, 32).setVisible(false);
            this.unarmedText = this.add.bitmapText(cWidth/2, 800, 'livingstone',"LEVEL UP", 24).setOrigin(.5).setScale(7);
            this.tweens.add({
                targets: this.unarmedText,
                y: cHeight*(1/5)+150,
                scaleX: 1,
                scaleY: 1,
                duration: 750,
                onComplete: this.showUnarmedButton,
                onCompleteParams: [this]
            });
        }

        this.add.text(cWidth/2 - 90, cHeight*(1/5)+175, "SWORD EXP: ", this.style);
        this.add.text(cWidth/2 + 87, cHeight*(1/5)+175, this.player.getSwordExp(), this.style2);

        if(newSwordLevel > oldSwordLevel){
            this.swordButton = this.add.image(cWidth/2, cHeight*(1/5)+210, 'battleButDown').setDisplaySize(128, 32).setVisible(false);
            this.swordText = this.add.bitmapText(cWidth/2, 800, 'livingstone',"LEVEL UP", 24).setOrigin(.5).setScale(7);

            this.tweens.add({
                targets: this.swordText,
                y: cHeight*(1/5)+210,
                scaleX: 1,
                scaleY: 1,
                duration: 750,
                onComplete: this.showSwordButton,
                onCompleteParams: [this]
            });
        }

        /*this.add.text(cWidth/2 - 90, cHeight*(1/5)+235, "SWORD EXP: ");
        this.add.text(cWidth/2 + 87, cHeight*(1/5)+235, this.player.getSwordExp(), {rtl: true});
        this.add.text(cWidth/2 - 90, cHeight*(1/5)+265, "EXP: EARNED: ");
        this.add.text(cWidth/2 + 87, cHeight*(1/5)+265, exp, {rtl: true});*/

        if(newAbilities > numAbilities){
            let learnedAbilities = newAbilities - numAbilities;
            this.add.text(cWidth/2 - 90, cHeight*(1/5)+310, "ABILITIES EARNED: ", this.style);
            let learntText = this.add.text(cWidth/2 - 90, cHeight*(1/5)+345, ' ', this.style);
            let learnt = '';
            for(let i = 0; i < learnedAbilities; i++){
                learnt += this.player.currentAvailableAbilities[newAbilities - (i+1)].name;
                if(i > 0){
                    learnt += ', ';
                }
            }

            learntText.setText(learnt);

            this.add.text(cWidth/2 - 90, cHeight*(1/5)+380, "PRESS \'P\' TO EQUIP", this.style);
        }
        this.add.text(cWidth/2 - 90, cHeight*(1/5)+420, "click to continue...", this.style3);
        this.input.on('pointerdown', this.resumeScene, this);
    }

    showSwordButton(tween, target, scene){
        scene.swordButton.setVisible(true);
    }

    showUnarmedButton(tween, target, scene){
        scene.unarmedButton.setVisible(true);
    }


    resumeScene(){
        this.scene.stop(this);
        this.scene.resume(this.lastLevel);

    }
}