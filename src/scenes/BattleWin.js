export default class BattleWin extends Phaser.Scene {

    constructor() {
        super({key: 'battleWin'});
    }

    init(data){
        this.last = data.scene;
        this.enemies = data.goons;
        this.player = data.player;
        this.reward = data.reward;
        this.sprite = data.sprite;
    }

    create(){
        let cWidth = this.sys.game.config.width;
        let cHeight = this.sys.game.config.height;
        let winToast = false;
        let text = ['ITEM(S) ACQUIRED'];
        let group = [];
        let oldLevel = this.player.getLevel();
        this.combatButton = [];

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
        let oldCombatLevels = [];

        this.player.getCombatLevels().forEach(function(element){
            oldCombatLevels.push(element);
        });

        let expTypeCount = [0, 0, 0, 0, 0, 0];
        let abilities = this.player.getCurrentAvailableAbilities();
        let numAbilities = abilities.length;

        this.enemies.forEach(function(element){
            gold = gold + element.getGold();
        });

        this.enemies.forEach(function(element){
            exp = exp + element.getExp();
        });

        for(let i = 0; i < numAbilities; i++) {
            totalCount += abilities[i].getCount();
            group = this.player.getCombatGroups();
            for (let j = 0; j < group.length; j++) {
                if (abilities[i].getType() === group[j]) {
                    expTypeCount[j] = expTypeCount[j] + abilities[i].getCount();
                }
            }
        }

        for(let i = 0; i < this.player.getCombatGroups().length; i++){
            let combatExp = this.player.getCombatExp();
            combatExp[i] += (expTypeCount[i]/totalCount)*exp;
        }

        for(let i = 0; i < abilities.length; i++){
            let expShare = Math.round((abilities[i].getCount()/totalCount)*exp);
            this.player.currentAvailableAbilities[i].setExp(expShare);
        }

        this.player.addExp(exp);
        this.player.addGold(gold);
        this.player.levelUp();

        let newLevel = this.player.getLevel();

        let newCombatLevels = this.player.getCombatLevels();

        let newAbilities = this.player.getCurrentAvailableAbilities().length;

        this.background = this.add.image(cWidth/2, cHeight/2, 'battleResultGUI');

        this.title = this.add.bitmapText(cWidth/2, 83, 'livingstone',"VICTORY", 34).setOrigin(.5);

        this.add.text(cWidth/2 - 90, cHeight*(1/5)+20, "GOLD EARNED: ", this.style);
        this.add.text(cWidth/2 + 87, cHeight*(1/5)+20, gold, this.style2);
        this.add.text(cWidth/2 - 90, cHeight*(1/5)+55, "EXP: EARNED: ", this.style);
        this.add.text(cWidth/2 + 87, cHeight*(1/5)+55, exp, this.style2);

        this.add.text(cWidth/2 - 90, cHeight*(1/5)+115, "LEVEL: ", this.style);
        this.add.text(cWidth/2 + 87, cHeight*(1/5)+115, this.player.getLevel(), this.style2);
        if(newLevel > oldLevel){
            this.combatButton.push(this.add.image(cWidth/2, cHeight*(1/5)+150, 'battleButDown').setDisplaySize(128, 32).setVisible(false));
            this.combatText = this.add.bitmapText(cWidth/2, 800, 'livingstone',"LEVEL UP", 24).setOrigin(.5).setScale(7);
            this.tweens.add({
                targets: this.combatText,
                y: cHeight*(1/5)+150,
                scaleX: 1,
                scaleY: 1,
                duration: 750,
                onComplete: this.showCombatButton,
                onCompleteParams: [this]
            });
        }
        if(expTypeCount[0] > 0){
            this.add.text(cWidth/2 - 90, cHeight*(1/5)+175, group[0] + " LVL: ", this.style);
            this.add.text(cWidth/2 + 87, cHeight*(1/5)+175, this.player.getCombatLevels()[0], this.style2);
        }
        if(newCombatLevels[0] > oldCombatLevels[0]){
            this.combatButton.push(this.add.image(cWidth/2, cHeight*(1/5)+210, 'battleButDown').setDisplaySize(128, 32).setVisible(false));
            this.combatText = this.add.bitmapText(cWidth/2, 800, 'livingstone',"LEVEL UP", 24).setOrigin(.5).setScale(7);
            this.tweens.add({
                targets: this.combatText,
                y: cHeight*(1/5)+210,
                scaleX: 1,
                scaleY: 1,
                duration: 750,
                onComplete: this.showCombatButton,
                onCompleteParams: [this]
            });
        }

        for(let i = 1; i < newCombatLevels.length; i++){
            let group = this.player.getCombatGroups();
            if(expTypeCount[i] > 0){
                this.add.text(cWidth/2 - 90, cHeight*(1/5)+235, group[i] + " LVL: ", this.style);
                this.add.text(cWidth/2 + 87, cHeight*(1/5)+235, this.player.getCombatLevels()[i], this.style2);
            }
            if(newCombatLevels[i] > oldCombatLevels[i]){
                this.combatButton.push(this.add.image(cWidth/2, cHeight*(1/5)+270, 'battleButDown').setDisplaySize(128, 32).setVisible(false));
                this.combatText = this.add.bitmapText(cWidth/2, 800, 'livingstone',"LEVEL UP", 24).setOrigin(.5).setScale(7);
                this.tweens.add({
                    targets: this.combatText,
                    y: cHeight*(1/5)+270,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 750,
                    onComplete: this.showCombatButton,
                    onCompleteParams: [this]
                });
            }
        }

        if(newAbilities > numAbilities){
            let learnedAbilities = newAbilities - numAbilities;
            this.add.text(cWidth/2 - 90, cHeight*(1/5)+310, "NEW ABILITIES EARNED: ", this.style);
            /*let learntText = this.add.text(cWidth/2 - 90, cHeight*(1/5)+345, ' ', this.style);
            let learnt = '';
            for(let i = 0; i < learnedAbilities; i++){
                learnt += this.player.currentAvailableAbilities[newAbilities - (i+1)].name;
                if(i > 0){
                    learnt += ', ';
                }
            }

            learntText.setText(learnt);*/

            this.add.text(cWidth/2 - 90, cHeight*(1/5)+350, "PRESS \'P\' TO EQUIP", this.style);
        }
        this.add.text(cWidth/2 - 90, cHeight*(1/5)+420, "click to continue...", this.style3);
        for(let i = 0; i < this.reward.length; i++){
            this.player.addToInventory(this.reward[i]);
            winToast = true;
        }

        if(winToast){
            this.scene.launch('message', {player:this.player, text: text});
        }
        this.input.on('pointerdown', this.resumeScene, this);
        this.abilKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.invKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.abilKey)) {
            this.scene.launch('abilityMan', {player: this.player, scene: this.last, sprite: this.last.sprite});
            this.scene.stop('battleWin');
        }
        if(Phaser.Input.Keyboard.JustDown(this.invKey)) {
            this.scene.launch('inventory', {player: this.player, scene: this.last, sprite: this.last.sprite});
            this.scene.stop('battleWin');
        }
    }

    showCombatButton(tween, target, scene){
        scene.combatButton.forEach(function(element){
            element.setVisible(true);
        })
    }


    resumeScene(){
        this.scene.stop(this);
        this.scene.resume(this.last);

    }
}