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
        this.lastLevel = data.scene;
        this.player.equipAbilities();
        this.abilities = this.player.getActiveAbilities();

        this.buttonGroup = [];
        this.attackGroup = [];
        this.textGroup = [];
        this.enemyGroup = [];
        this.enemies = [];
        this.enemiesHealth = [];
        this.enemyX = 0;
        this.enemyY = 0;
        this.deathCount = 0;
        for(let i = 0; i < this.goons.length; i++){
            this.enemyGroup.push(new Enemy(getEnemy(this.goons[i])));
        }
    }
    //CREATE GRAPHICS
    create(){
        let graphics = this.add.graphics();
        graphics.fillStyle(0x203040, .7);
        graphics.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);

        this.background = this.add.image(0, 0, 'battleGUI').setOrigin(0);

        for(let i = 0; i< this.abilities.length; i++){
            let posX = 0;
            if(i%2 === 0){
                posX = 20;
            }else
                posX = 260;

            let button = this.add.image(posX, (i * 60) + 365, 'battleButUp').setInteractive().setOrigin(0).setName(this.abilities[i].name).setDisplaySize(190,49);
            this.buttonGroup.push(button);
            let text = this.add.text(0 , 0, this.abilities[i].name, {fontSize: 20});
            //let text = this.add.bitmapText(0, 0,'livingstone', 'SWEEPING CRANE'/*this.abilities[i].name*/, 24);
            this.textGroup.push(text);
            Phaser.Display.Align.In.Center(this.textGroup[i], this.buttonGroup[i], -22, -5);


        }
        /*let attack1Super = this.add.image(260, 365, 'button').setOrigin(0);
        let attack2 = this.add.image(20, 425, 'button').setOrigin(0);
        let attack2Super = this.add.image(260, 425, 'button').setOrigin(0);
        let attack3 = this.add.image(20, 485, 'button').setOrigin(0);
        let attack3Super = this.add.image(260, 485, 'button').setOrigin(0);
        let attack4 = this.add.image(20, 545, 'button').setOrigin(0);
        let attack4Super = this.add.image(260, 545, 'button').setOrigin(0);
        let item = this.add.image(500, 485, 'button').setOrigin(0);
        let retreat = this.add.image(500, 545, 'button').setOrigin(0);
        let attack1Text = this.add.text(0 , 0, 'PUNCH');
        /*let attack2Text = this.add.text(0 , 0, 'KICK');
        let attack3Text = this.add.text(0 , 0, 'SLASH');
        let attack4Text = this.add.text(0 , 0, 'STAB');
        let attack5Text = this.add.text(0 , 0, 'SUPER PUNCH');
        let attack6Text = this.add.text(0 , 0, 'JUMPING SLASH');
        let attack7Text = this.add.text(0 , 0, 'AGILE CRANE');
        let attack8Text = this.add.text(0 , 0, 'HYPER CHASM');
        let itemText = this.add.text(0 , 0, 'ITEM');
        let retreatText = this.add.text(0 , 0, 'RUN AWAY');*/

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

            let enemy = this.add.sprite( (this.enemyX)+400, (this.enemyY)+150, this.enemyGroup[i].image).setInteractive().setScale(1.5).setName('ENEMY').setData("ID", i).setData('alive', true);


            this.enemies.push(enemy);
        }
        for(let i = 0; i < this.enemies.length; i++){
            //this.enemies[i].anims.play('goblinAttack', true);
            this.enemiesHealth.push(this.add.text(0 , 0, this.enemyGroup[i].health));
            Phaser.Display.Align.To.BottomCenter(this.enemiesHealth[i], this.enemies[i]);
        }
        //TODO ENEMY AND PLAYER'S HEALTH BARS
        this.currentEnemy = this.enemies[0];
        this.selector = this.add.image(100, 100, 'arrow').setAngle(-90).setVisible(false).setOrigin(0,0);
        this.add.text(200 ,325, 'HIT \'A\' WHEN CIRCLES ARE ON EACH OTHER TO ATTACK');
        this.status = this.add.text(0, 0, '');
        this.circle = this.add.image(100, 100,'attackCircle').setVisible(false);
        this.circleTarget = this.add.image(100, 100,'attackCircle').setScale(1).setVisible(false);
        this.add.text(490, 370, "Player's Health: ", {color:"black"});
        this.playerHealth = this.add.text(490, 400, this.player.health, {color:"black"});
        Phaser.Display.Align.In.Center(this.circle, this.currentEnemy);
        Phaser.Display.Align.In.Center(this.circleTarget, this.currentEnemy);
        Phaser.Display.Align.To.TopCenter(this.status, this.currentEnemy);
        Phaser.Display.Align.To.TopCenter(this.selector, this.currentEnemy);
        this.selector.setVisible(true);

        this.tweens.add({
            targets: this.selector,
            y: 75,
            duration: 750,
            repeat: -1,
            yoyo: true
        });

        this.startRound();
    }

    startRound(){
        this.buttonGroup.forEach(function(element){
           element.setTexture('battleButUp');
        });
        this.playerDamage = 0;
        this.hitCount = 0;
        this.enemyCount = 0;
        let dontAttack = false;
        let validTarget = true;
        this.selector.setVisible(true);

        this.input.on('gameobjectdown', function(pointer, gameObject){
                let now = this.scene;
                now.clearText();
                if(now.attackGroup.length > 0) {
                    for (let i = 0; i < now.attackGroup.length; i++) {
                        if (now.attackGroup[i].isPlaying()) {
                            dontAttack = true;
                        }
                    }
                }
                if(!dontAttack){
                    if(!(gameObject.name === 'ENEMY') && validTarget === true){
                        now.setupAttack(pointer, gameObject);
                        now.selector.setVisible(false);
                    }else{
                        now.currentEnemy = gameObject;
                        if(gameObject.getData('alive')){
                            Phaser.Display.Align.In.Center(now.circle, now.currentEnemy);
                            Phaser.Display.Align.In.Center(now.circleTarget, now.currentEnemy);
                            Phaser.Display.Align.To.TopCenter(now.status, now.currentEnemy);
                            Phaser.Display.Align.To.TopCenter(now.selector, now.currentEnemy);
                            validTarget = true;
                        }else{
                            Phaser.Display.Align.To.TopCenter(now.status, now.currentEnemy);
                            now.status.setText("Not a Valid Target    ");
                            validTarget = false;
                        }
                    }
                }
            }
        );

    }
    setupAttack(pointer, gameobject){
        gameobject.setTexture('battleButDown');
        this.circleTarget.setVisible(true);
        this.circle.setVisible(true);
        //let attacks = [];
        this.input.off('gameobjectdown');

        for(let i = 0; i < this.abilities.length; i++){
            if(gameobject.name === this.abilities[i].name){
                this.currentAtk = this.abilities[i];
            }
        }
        for(let i = this.currentAtk.numAtk-1; i >= 0; i--){
            if(i === this.currentAtk.numAtk-1){
                this.attackGroup[i] =
                    this.tweens.add({
                        targets: this.circle,
                        scaleX: 0,
                        scaleY: 0,
                        duration: this.currentAtk.durations[i],
                        paused: true,
                        onComplete: this.waitAFew,
                        onCompleteParams: [gameobject, this]
                    })
            }else{
                this.attackGroup[i] =this.tweens.add({
                    targets: this.circle,
                    scaleX: 0,
                    scaleY: 0,
                    duration: this.currentAtk.durations[i],
                    paused: true,
                    onComplete: this.playAttack,
                    onCompleteParams: [this.attackGroup[i+1], this.circle, this.scene]
                })
            }
        }
        this.playAttack1(gameobject);
    }
    playAttack1(button){
        this.input.keyboard.on('keydown_A', this.registerHit, this);
        this.clearText();
        //Phaser.Display.Align.To.TopCenter(this.status, this.enemies[0]);

        this.circle.setScale(6);
        this.attackGroup[0].restart();
        this.buttonGroup.forEach(function(element){
            button.scene.sys.input.disable(element);
        });
    }

    playAttack(tween, targets, next, circle, scene){
        scene.scene.input.keyboard.on('keydown_A', scene.scene.registerHit, scene.scene);
        circle.setScale(6);
        next.restart();
    }


    //PLAYER HITS
    registerHit(){
        if(Math.abs(this.circle.scaleX - this.circleTarget.scaleX)< .2){
            for(let i = 0; i < this.attackGroup.length; i++){
                if(this.attackGroup[i].isPlaying()){
                    this.playerDamage = this.playerDamage + this.currentAtk.damage[this.hitCount];
                    this.status.setText(this.playerDamage);
                    Phaser.Display.Align.To.TopCenter(this.status, this.currentEnemy);
                    this.currentAtk.increaseCount();
                }
            }
            this.hitCount++;
            if(this.hitCount === this.currentAtk.numAtk){
                this.playerDamage = this.playerDamage + this.currentAtk.damage[this.currentAtk.numAtk];
                this.currentAtk.increaseCount();
                this.time.delayedCall(250, this.bonusHit, [], this);
            }
        }

        this.input.keyboard.off('keydown_A');
    }

    //ENEMIES ATTACK
    waitAFew(tween,target,button,scene){
        if(scene.playerDamage > 0){
            let enemy = scene.enemyGroup[scene.currentEnemy.getData('ID')];
            enemy.setHealth(enemy.getHealth() - scene.playerDamage);
            scene.enemiesHealth[scene.currentEnemy.getData('ID')].setText(enemy.health);
            if(enemy.health <= 0 && scene.currentEnemy.getData('alive')){
                scene.currentEnemy.anims.play('deadGoblin', true);
                scene.currentEnemy.setData('alive', false);
                scene.enemiesHealth[scene.currentEnemy.getData('ID')].setVisible(false);
                scene.status.setText(' ');
                scene.deathCount++;
                while(scene.currentEnemy.getData('alive') === false && (scene.deathCount < scene.enemyGroup.length)){
                    if(scene.currentEnemy.getData('ID')+1 >= scene.enemies.length){
                        scene.currentEnemy = scene.enemies[0];
                        Phaser.Display.Align.To.TopCenter(scene.status, scene.currentEnemy);
                        Phaser.Display.Align.In.Center(scene.circle, scene.currentEnemy);
                        Phaser.Display.Align.In.Center(scene.circleTarget, scene.currentEnemy);
                    }else{
                        scene.currentEnemy = scene.enemies[scene.currentEnemy.getData('ID')+1];
                        Phaser.Display.Align.To.TopCenter(scene.status, scene.currentEnemy);
                        Phaser.Display.Align.In.Center(scene.circle, scene.currentEnemy);
                        Phaser.Display.Align.In.Center(scene.circleTarget, scene.currentEnemy);
                        Phaser.Display.Align.To.TopCenter(scene.selector, scene.currentEnemy);
                    }
                }

            }
        }
        if(scene.deathCount === scene.enemyGroup.length){
            scene.circleTarget.setVisible(false);
            scene.circle.setVisible(false);
            scene.time.delayedCall(1500, scene.endBattle, [], scene);
        }else{
            scene.time.delayedCall(1000, scene.enemiesTurn, [], scene)
        }
    }

    enemiesTurn() {
        let curEnemy = this.enemyGroup[this.enemyCount];
        if(curEnemy.health > 0){
            let ability = curEnemy.abilities[Phaser.Math.Between(0,curEnemy.getAbilities().length-1)];
            let damage = 0;

            for(let j = 0; j < ability.numAtk; j++){
                let hit = Phaser.Math.Between(0, 100);
                if(hit < curEnemy.chance){
                    this.cameras.main.shake(100);
                    damage += ability.damage[j];
                }
            }
            if(damage > 0){
                let adjustedDamage = (this.adjustDamage(damage));
                //bump
                //let adjustedDamage = Math.round(damage*(1 - (this.player.getArmor()/100)));
                this.status.setText(curEnemy.name + " used " + ability.name + " and did " + adjustedDamage + " pts of damage." );
                Phaser.Display.Align.To.TopCenter(this.status, this.enemies[this.enemyCount]);

                //RECONCILE PLAYER HEALTH
                this.player.takeDamage(adjustedDamage);
                this.playerHealth.setText(this.player.getHealth());
                if(this.player.health <= 0){
                    this.scene.start('gameOver');
                    this.scene.stop('battle');
                    this.scene.stop(this.lastLevel);
                }
            }else{
                this.status.setText(curEnemy.name + " used " + ability.name + " and missed." );
                Phaser.Display.Align.To.TopCenter(this.status, this.enemies[this.enemyCount]);
            }

            this.enemyCount++;

            if(this.enemyCount < this.enemyGroup.length){
                this.time.delayedCall(1000, this.enemiesTurn, [], this);
            }else{
                this.activate(this);
            }

        }else{
            this.enemyCount++;
            if(this.enemyCount < this.enemyGroup.length){
                this.enemiesTurn();
            }else{
                this.activate(this);
            }
        }
    }

    adjustDamage(damage){

        let equipment = this.player.equipment;
        let adjustedDamage = 0;

        for(let i = 0; i < equipment.length; i++){

            adjustedDamage += (Math.min((damage*((equipment[i].effect/100))), equipment[i].maxEffect));
        }
        adjustedDamage = Math.round(damage - adjustedDamage);

        return adjustedDamage;
    }
    //END BATTLE
    activate(scene) {
        this.buttonGroup.forEach(function (element) {
            scene.sys.input.enable(element);
        });
        this.circleTarget.setVisible(false);
        this.circle.setVisible(false);
        this.startRound();

    }

    bonusHit(){
        this.status.setText("BONUS HIT: " + this.playerDamage);
        Phaser.Display.Align.To.TopCenter(this.status, this.currentEnemy);
    }


    clearText(){
        this.status.setText(' ');
    }

    endBattle(){
        this.scene.stop('battle');
        this.scene.launch('battleWin', {scene: this.lastLevel, goons: this.enemyGroup, player: this.player});
    }



}
