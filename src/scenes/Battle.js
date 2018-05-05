import Enemy from '../objects/enemy'
import getEnemy from '../objects/Enemies'
export default class Battle extends Phaser.Scene {

    constructor() {
        super({key: 'battle'});

    }
    //INITIALIZE BATTLE

    init(data){
        this.player = data.player;
        this.goons = data.goons;
        this.last = data.scene;
        this.reward = data.reward;
        this.player.equipAbilities();
        this.abilities = this.player.getActiveAbilities();
        this.currentAtk = this.abilities[0];
        this.buttonGroup = [];
        this.attackGroup = [];
        this.textGroup = [];
        this.enemyGroup = [];
        this.enemies = [];
        this.leftSide = [];
        this.healthBar = [];
        this.enemiesStatus = [];
        this.enemyX = 0;
        this.enemyY = 0;
        this.deathCount = 0;

        for(let i = 0; i < this.goons.length; i++){
            this.enemyGroup.push(new Enemy(getEnemy(this.goons[i])));
        }
    }

    //CREATE GRAPHICS
    create(){
        this.cWidth = this.sys.game.config.width;
        this.cHeight = this.sys.game.config.height;
        this.graphics1 = this.add.graphics();
        this.graphics1.fillStyle(0x203040, .7);
        this.graphics1.fillRect(0, 0, this.cWidth, this.cHeight);
        this.background = this.add.image(0, 0, 'battleGUI').setOrigin(0);
        let positionX = [];
        let positionY = [];

        this.statusText = {
            fontSize: 24,
            fontFamily: 'Yatra One',
            fill: '#d0a31f',
            wordWrap:{
                width: this.background.displayWidth-5,
                useAdvancedWrap: true
            }
        };

        this.desc = {
            fontSize: 24,
            fontFamily: 'Sanchez',
            fill: '#ffeff2',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap:{
                width: this.background.displayWidth-5,
                useAdvancedWrap: true
            }
        };
        this.desc2 = {
            fontSize: 16,
            fontFamily: 'Sanchez',
            fill: '#ffeff2',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap:{
                width: this.background.displayWidth-5,
                useAdvancedWrap: true
            }
        };
        //CREATE POSITIONS FOR ABILITY BUTTONS
        for(let i = 0; i < 4; i++){
            for(let j = 0; j<2 ;j++){
                if(j === 0){
                    positionX.push(20)
                }else
                    positionX.push(260);
                positionY.push((i*60) + 365)
            }
        }

        //CREATE THE ABILITY BUTTONS
        for(let i = 0; i< this.abilities.length; i++){
            let button = this.add.image(positionX[i], positionY[i], 'battleButUp').setInteractive().setOrigin(0).setName(this.abilities[i].name).setDisplaySize(190,49);
            this.buttonGroup.push(button);
            let text = this.add.text(0 , 0, this.abilities[i].name, this.desc).setStroke('#000000', 2).setShadow(3, 3, '#000000', 5, false, true);
            //let text = this.add.bitmapText(0, 0,'livingstone', 'SWEEPING CRANE'/*this.abilities[i].name*/, 24);
            this.textGroup.push(text);
            Phaser.Display.Align.In.Center(this.textGroup[i], this.buttonGroup[i], -22, -5);
        }

        //CREATE THE ENEMY SPRITES
        for(let i = 0; i < this.enemyGroup.length; i++){
            if(i === 0 && this.enemyGroup.length === 2){
                this.enemyX = -100;
                this.enemyY = 0;

            }else if(i === 1 && this.enemyGroup.length === 2){
                this.enemyX = 100;
                this.enemyY = 0;

            }else if(i === 1){
                this.enemyX = -100;
                this.enemyY = 50;

            }else if(i === 2){
                this.enemyX = 100;
                this.enemyY = 50;

            }else if(i === 3 && this.enemyGroup.length === 4){
                this.enemyX = 0;
                this.enemyY = 100;

            }else if(i === 3){
                this.enemyX = -200;
                this.enemyY = 0;
            }else if(i === 4){
                this.enemyX = 200;
                this.enemyY = 0;
            }

            let enemy = this.add.sprite( (this.enemyX)+400, (this.enemyY)+150, this.enemyGroup[i].image).setData("ID", i).setData('alive', true).setInteractive().setScale(1.5).setName('ENEMY');


            this.enemies.push(enemy);
        }

        //HEALTH ENEMIES TEXT
        for(let i = 0; i < this.enemies.length; i++){
            let emptyBar = this.add.image(0,0,'healthBar').setOrigin(0).setDisplaySize(102,20);
            this.healthBar.push(this.add.image(0,0,'maxHealth').setOrigin(0).setDisplaySize(102,20));
            this.leftSide.push(this.add.image(0,0,'highHealthLeft').setOrigin(0).setDisplaySize(102,20));
            this.enemiesStatus.push(this.add.text(0, 0, 'STATUS', this.statusText).setOrigin(.5).setStroke('#000000', 2).setShadow(3, 3, '#000000', 5, false, true));
            Phaser.Display.Align.To.BottomCenter(emptyBar, this.enemies[i], 48, 10);
            Phaser.Display.Align.To.BottomCenter(this.healthBar[i], this.enemies[i], 52, 10);
            Phaser.Display.Align.To.BottomCenter(this.leftSide[i], this.enemies[i],48,10);
            Phaser.Display.Align.To.TopCenter(this.enemiesStatus[i], this.enemies[i]);
        }

        this.currentEnemy = this.enemies[0];
        this.selector = this.add.image(100, 100, 'arrow').setAngle(-90).setVisible(false).setOrigin(0,0);
        this.add.text(this.cWidth/2 ,325, 'HIT \'A\' WHEN CIRCLES ARE ON EACH OTHER TO ATTACK', this.desc2).setOrigin(.5).setStroke('#000000', 2).setShadow(3, 3, '#000000', 5, false, true);
        this.attackCircle = this.add.image(100, 100,'attackCircle').setVisible(false);
        this.targetCircle = this.add.image(100, 100,'attackCircle').setScale(1).setVisible(false);
        this.add.text(490, 370, "Health: ", this.desc).setStroke('#000000', 2).setShadow(3, 3, '#000000', 5, false, true);
        this.add.image(493, 410, 'healthBar').setOrigin(0).setDisplaySize(209,28);
        this.playerHealthBar = this.add.image(496, 410, 'maxHealth').setOrigin(0);
        this.playerLeftSide = this.add.image(487, 410, 'highHealthLeft').setOrigin(0);
        Phaser.Display.Align.In.Center(this.attackCircle, this.currentEnemy);
        Phaser.Display.Align.In.Center(this.targetCircle, this.currentEnemy);
        Phaser.Display.Align.To.TopCenter(this.selector, this.currentEnemy);
        this.selector.setVisible(true);

        this.tweens.add({
            targets: this.selector,
            y: this.selector.y - 50,
            duration: 750,
            repeat: -1,
            yoyo: true
        });
        this.atkKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        this.startRound();
    }

    startRound(){
        //*****SET EVERYTHING BACK TO NORMAL
        this.buttonGroup.forEach(function(element){
            element.setTexture('battleButUp');
        });

        this.enemiesStatus.forEach(function(element){
            element.setVisible(false);
        });

        this.beginAtk = false;
        this.playerDamage = 0;
        this.hitCount = 0;
        this.enemyCount = 0;
        this.selector.setVisible(true);
        this.attackCircle.setVisible(false);
        this.targetCircle.setVisible(false);
        //*******************

        this.input.on('gameobjectdown', this.beginPlayersTurn, this);
    }

    beginPlayersTurn(pointer, gameObject){
        this.clearText();
        let validTarget = true;
        this.status = this.enemiesStatus[this.currentEnemy.getData('ID')];
        this.fancyTween  = this.tweens.add({
            targets: this.status,
            y: this.status.y - 50,
            scaleX: 2,
            scaleY: 2,
            duration: 300,
            yoyo: true
        });

        //BUTTONS AND ENEMIES ARE THE INTERACTIVE GAMEOBJECTS
        //IF PLAYER SELECTS AN ENEMY CHECK TO SEE IF ITS A VALID TARGET, IF SO, MOVE SELECTOR IF NOT SELECTOR STAYS ON VALID TARGET
        if(gameObject.name === 'ENEMY'){
            if(gameObject.getData('alive')){
                this.currentEnemy = gameObject;
                this.status = this.enemiesStatus[this.currentEnemy.getData('ID')];
                Phaser.Display.Align.To.TopCenter(this.selector, this.currentEnemy);
                validTarget = true;
            }else
                validTarget = false;

            console.log(validTarget);
        }
        if(gameObject.name !== 'ENEMY' && validTarget === true){
            //DISABLE BUTTONS, GET TEXT TO SHOW UP
            gameObject.setTexture('battleButDown');
            this.input.off('gameobjectdown');
            this.selector.setVisible(false);
            Phaser.Display.Align.In.Center(this.attackCircle, this.currentEnemy);
            Phaser.Display.Align.In.Center(this.targetCircle, this.currentEnemy);
            this.attackCircle.setVisible(true);
            this.status.setVisible(true);


            //GET CURRENT ATTACK INFORMATION
            for(let i = 0; i < this.abilities.length; i++){
                if(gameObject.name === this.abilities[i].name){
                    this.currentAtk = this.abilities[i];
                }
            }
            for(let i = this.currentAtk.numAtk-1; i >= 0; i--){
                if(i === this.currentAtk.numAtk-1){
                    this.attackGroup[i] =
                        this.tweens.add({
                            targets: this.attackCircle,
                            scaleX: 0,
                            scaleY: 0,
                            duration: this.currentAtk.durations[i],
                            paused: true,
                            onComplete: this.endPlayersTurn,
                            onCompleteParams: [gameObject, this]
                        })
                }else{
                    this.attackGroup[i] =this.tweens.add({
                        targets: this.attackCircle,
                        scaleX: 0,
                        scaleY: 0,
                        duration: this.currentAtk.durations[i],
                        paused: true,
                        onComplete: this.playAttack,
                        onCompleteParams: [this.attackGroup[i+1], this.attackCircle, this]
                    })
                }
            }

            this.graphics1.lineStyle(62 * (this.currentAtk.getLevel() * .20), 0xffffff, 0.5);
            this.graphics1.strokeCircle(this.targetCircle.x, this.targetCircle.y, 31);
            this.playAttack1();
        }
    }

    playAttack1(){
        this.beginAtk = true;
        this.attackCircle.setScale(6);
        this.attackGroup[0].restart();
    }

    playAttack(tween, targets, next, circle, scene){
        scene.beginAtk = true;
        //scene.clearText();
        circle.setScale(6);
        next.restart();
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.atkKey) && this.beginAtk === true){
            console.log('HIT ATTEMPTED');
            if(Math.abs(this.attackCircle.scaleX - 1)< (this.currentAtk.getLevel() * .20)) {
                this.playerDamage = this.playerDamage + this.currentAtk.damage[this.hitCount];
                this.status.setText(this.playerDamage);

                this.currentAtk.increaseCount();
                this.hitCount = this.hitCount + 1;
            }else {
                this.status.setText("MISSED");
            }

            if(this.hitCount === this.currentAtk.numAtk){
                this.playerDamage = this.playerDamage + this.currentAtk.damage[this.currentAtk.numAtk];
                this.currentAtk.increaseCount();
                this.time.delayedCall(250, this.bonusHit, [], this);
            }
            this.beginAtk = false;
        }
    }

    //ENEMIES ATTACK
    endPlayersTurn(tween,target,button,scene){
        this.beginAtk = false;
        scene.hitCount = 0;
        scene.graphics1.clear();
        scene.graphics1.fillStyle(0x203040, .7);
        scene.graphics1.fillRect(0, 0, scene.cWidth, scene.cHeight);

        if(scene.playerDamage > 0){
            let enemy = scene.enemyGroup[scene.currentEnemy.getData('ID')];

            enemy.setHealth(enemy.getHealth() - scene.playerDamage);
            scene.updateHealthBar(scene.currentEnemy.getData('ID'));

            //IF THE ENEMY JUST DIED, ITS HEALTH IS AT OR BELOW 0 BUT ITS DATA IS STILL SET TO ALIVE
            if(enemy.health <= 0 && scene.currentEnemy.getData('alive')) {
                scene.currentEnemy.anims.play('deadGoblin', true);
                scene.currentEnemy.setData('alive', false);
                scene.targetCircle.setVisible(false);
                scene.attackCircle.setVisible(false);
                scene.deathCount++;
            }

            //SINCE ENEMY IS DEAD, CHOOSE ANOTHER, PREFRABBLY THE NEXT ONE ALIVE IN THE ENEMIES ARRAY (enemyGroup)
            while(scene.currentEnemy.getData('alive') === false && (scene.deathCount < scene.enemyGroup.length)){
                if(scene.currentEnemy.getData('ID')+1 >= scene.enemies.length){
                    scene.currentEnemy = scene.enemies[0];
                    Phaser.Display.Align.To.TopCenter(scene.selector, scene.currentEnemy);
                }else{
                    scene.currentEnemy = scene.enemies[scene.currentEnemy.getData('ID')+1];
                    Phaser.Display.Align.To.TopCenter(scene.selector, scene.currentEnemy);
                }
            }
        }
        if(scene.deathCount === scene.enemyGroup.length){

            scene.time.delayedCall(1500, scene.endBattle, [], scene);
        }else{
            scene.time.delayedCall(1000, scene.enemiesTurn, [], scene)
        }
    }
    enemiesTurn() {
        this.enemiesStatus.forEach(function(element){
            element.setVisible(false);
        });

        let curEnemy = this.enemyGroup[this.enemyCount];
        this.status = this.enemiesStatus[this.enemyCount];
        this.status.setVisible(true);

        if(curEnemy.health > 0) {
            let ability = curEnemy.abilities[Phaser.Math.Between(0, curEnemy.getAbilities().length - 1)];
            let damage = 0;

            for (let j = 0; j < ability.numAtk; j++) {
                let hit = Phaser.Math.Between(0, 100);
                if (hit < curEnemy.chance) {
                    this.cameras.main.shake(100);
                    damage += ability.damage[j];
                }
            }
            if (damage > 0) {
                let adjustedDamage = (this.adjustDamage(damage));
                let text = [ability.name, adjustedDamage + " damage."];
                this.status.setText(text);

                //RECONCILE PLAYER HEALTH
                this.player.takeDamage(adjustedDamage);
                this.updatePlayerHealth();

                if (this.player.health <= 0) {
                    this.scene.start('gameOver');
                    this.scene.stop('battle');
                    this.scene.stop(this.last);
                }
            } else {
                let text = [ability.name, 'MISSED'];
                this.status.setText(text);
            }
            this.enemyCount++;
        }else {
            this.enemyCount++;
        }

        if(this.enemyCount < this.enemyGroup.length){
            this.time.delayedCall(500, this.enemiesTurn, [], this);
        }else{
            this.time.delayedCall(1000, this.startRound, [], this);
        }
    }
    adjustDamage(damage){

        let adjustedDamage = 0;
        if(this.player.getArmor()> 0){
            adjustedDamage += (Math.min(damage * (this.player.getArmor()/100), this.player.getMaxArmor()));
        }
        adjustedDamage = Math.round(damage - adjustedDamage);
        return adjustedDamage;
    }
    //END BATTLE

    bonusHit(){
        this.status.setText("BONUS HIT: " + this.playerDamage);
        this.fancyTween.restart();
    }

    clearText(){
        this.enemiesStatus.forEach(function(element){
            element.setText(' ');
        })
    }

    endBattle(){
        this.scene.stop('battle');
        this.scene.launch('battleWin', {scene: this.last, goons: this.enemyGroup, player: this.player, reward: this.reward, sprite: this.last.sprite});
    }

    updateHealthBar(index){
        let entity = this.enemyGroup[index];
        if(entity.getHealth()/entity.getMaxHealth()*100 >= 95){
        }else if(entity.getHealth()/entity.getMaxHealth()*100 >= 70){
            this.healthBar[index].setTexture('highHealth');
            this.healthBar[index].setDisplaySize(entity.getHealth()/entity.getMaxHealth()*100, 20);
        }else if(entity.getHealth()/entity.getMaxHealth()*100 >= 35){
            this.leftSide[index].setTexture('medHealthLeft');
            this.healthBar[index].setTexture('mediumHealth');
            this.healthBar[index].setDisplaySize(entity.getHealth()/entity.getMaxHealth()*100, 20);
        }else if(entity.getHealth()/entity.getMaxHealth()*100 > 0){
            this.leftSide[index].setTexture('lowHealthLeft');
            this.healthBar[index].setTexture('lowHealth');
            this.healthBar[index].setDisplaySize(entity.getHealth()/entity.getMaxHealth()*100, 20);
        }else{
            this.healthBar[index].destroy();
            this.leftSide[index].destroy();
        }
    }

    updatePlayerHealth(){

        if(this.player.getHealth()/this.player.getMaxHealth()*100 >= 95){
        }else if(this.player.getHealth()/this.player.getMaxHealth()*100 >= 70){
            this.playerHealthBar.setTexture('highHealth');
            this.playerHealthBar.setDisplaySize(this.player.getHealth()/this.player.getMaxHealth()*206, 28);
        }else if(this.player.getHealth()/this.player.getMaxHealth()*100  >= 35){
            this.playerLeftSide.setTexture('medHealthLeft');
            this.playerHealthBar.setTexture('mediumHealth');
            this.playerHealthBar.setDisplaySize(this.player.getHealth()/this.player.getMaxHealth()*206, 28);
        }else if(this.player.getHealth()/this.player.getMaxHealth()*100 > 0){
            this.playerLeftSide.setTexture('lowHealthLeft');
            this.playerHealthBar.setTexture('lowHealth');
            this.playerHealthBar.setDisplaySize(this.player.getHealth()/this.player.getMaxHealth()*206, 28);
        }else{
            this.healthBar[index].destroy();
            this.leftSide[index].destroy();
        }
    }

}
