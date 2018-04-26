import Player from '../objects/player'
import getEnemy from '../objects/Enemies'
export default class Battle extends Phaser.Scene {

    constructor(config) {
        super({key: 'battle'});

    }
    init(data){

        this.player = data.player;
        this.goons = data.goons;

    }

    create(){
        //this.player = new Player(this, 0,0, ' ', 0);
        this.player.addAbilities();
        this.abilities = this.player.abilities;

        this.buttonGroup = [];
        this.attackGroup = [];
        this.textGroup = [];
        this.enemyGroup = [];
        this.enemies = [];
        this.enemyX = 0;
        this.enemyY = 0;

        for(let i = 0; i < this.goons.length; i++){
            this.enemyGroup.push(getEnemy(this.goons[i]));
        }

        let graphics = this.add.graphics();
        graphics.fillStyle(0x708090, .7);
        graphics.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        graphics.fillStyle(0x2f4f4f, .7);
        graphics.fillRect(0,this.sys.game.config.height*(3/5), this.sys.game.config.width *(3/5), this.sys.game.config.height );
        graphics.fillStyle(0x808080, .7);
        graphics.fillRect(this.sys.game.config.width *(3/5),this.sys.game.config.height*(3/5), this.sys.game.config.width *(3/5), this.sys.game.config.height );

        for(let i = 0; i< this.abilities.length; i++){
            if(this.abilities[i].active === true){
                let button = this.add.image(20, (i * 60) + 365, 'button').setInteractive().setOrigin(0).setName(this.abilities[i].name);
                this.buttonGroup.push(button);
                let text = this.add.text(0 , 0, this.abilities[i].name);
                this.textGroup.push(text);
                Phaser.Display.Align.In.Center(this.textGroup[i], this.buttonGroup[i]);
            }
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

            let enemy = this.add.sprite( (this.enemyX)+400, (this.enemyY)+150, this.enemyGroup[i].image).setInteractive().setScale(1.5).setName('ENEMY').setData("ID", i);

            this.enemies.push(enemy);
        }
        for(let i = 0; i < this.enemies.length; i++){
            this.enemies[i].anims.play('goblinAttack', true);
        }

        this.currentEnemy = this.enemies[0];
        this.add.text(200 ,325, 'HIT \'A\' WHEN CIRCLES ARE ON EACH OTHER TO ATTACK');
        this.status = this.add.text(0, 0, '');
        this.circle = this.add.image(100, 100,'attackCircle').setVisible(false);
        this.circleTarget = this.add.image(100, 100,'attackCircle').setScale(1).setVisible(false);
        Phaser.Display.Align.In.Center(this.circle, this.currentEnemy);
        Phaser.Display.Align.In.Center(this.circleTarget, this.currentEnemy);
        Phaser.Display.Align.To.TopCenter(this.status, this.currentEnemy);

        this.startRound();
    }

    startRound(){
        if(this.playerDamage > 0){
            this.enemyGroup[this.currentEnemy.getData('ID')].health -= this.playerDamage;
        }
        this.playerDamage = 0;
        this.hitCount = 0;
        this.dontAttack = false;
        this.input.on('gameobjectdown', function(pointer, gameObject){
            let now = this.scene;
            now.clearText();
            if(now.attackGroup.length > 0) {
                for (let i = 0; i < now.attackGroup.length; i++) {
                    if (now.attackGroup[i].isPlaying()) {
                        this.dontAttack = true;
                    }
                }
            }
            if(!this.dontAttack){
                if(gameObject.name === "ENEMY"){
                    now.currentEnemy = gameObject;
                    Phaser.Display.Align.In.Center(now.circle, now.currentEnemy);
                    Phaser.Display.Align.In.Center(now.circleTarget, now.currentEnemy);
                    Phaser.Display.Align.To.TopCenter(now.status, now.currentEnemy);
                }else
                    now.setupAttack(pointer, gameObject);
            }

            }
         );

    }

    setupAttack(pointer, gameobject){
        gameobject.setTexture('buttonPressed');
        this.circleTarget.setVisible(true);
        this.circle.setVisible(true);
        //let attacks = [];
        this.input.off('gameobjectdown');

        for(let i = 0; i < this.abilities.length; i++){
            if(gameobject.name === this.abilities[i].name){
                this.currentAtk = this.abilities[i]
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

        button.setTexture('button');
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
    activate(scene){
        this.buttonGroup.forEach(function(element){
            scene.sys.input.enable(element);
        });
        this.circleTarget.setVisible(false);
        this.circle.setVisible(false);
        this.startRound();
    }
    waitAFew(tween,target,button,scene){
        let deathCount = 0;
        for(let i = 0; i < scene.enemyGroup.length; i++){
            if((scene.enemyGroup[i].health) <= 0) {
                scene.status.setText("YOU WON!!");
                Phaser.Display.Align.To.TopCenter(scene.status, scene.currentEnemy);
                scene.circleTarget.setVisible(false);
                scene.circle.setVisible(false);
                scene.enemies[i].anims.play('deadGoblin', true);
                deathCount++
            }
        }
        if(deathCount === scene.enemyGroup.length){
            scene.time.delayedCall(1500, scene.endBattle, [], scene);
        }else{
            scene.time.delayedCall(1000, scene.enemiesTurn, [], scene)
        }
    }

    enemiesTurn(){
        for(let i = 0; i < this.enemyGroup.length; i++){
            let curEnemy = this.enemyGroup[i];
             let ability = curEnemy.abilities[Phaser.Math.Between(0,curEnemy.abilities.length-1)];
            let damage = 0;
            for(let j = 0; j < ability.numAtk; j++){
                console.log(curEnemy.name + i + " is Attacking");
                let hit = Phaser.Math.Between(0, 100);
                if(hit < curEnemy.chance){
                    this.cameras.main.shake(100);
                    damage += ability.damage[j];
                }
            }
            if(damage > 0){
                this.status.setText(curEnemy.name + " used " + ability.name + " and did " + damage + " pts of damage." );
                Phaser.Display.Align.To.TopCenter(this.status, this.currentEnemy);
                this.player.takeDamage(damage);
            }else{
                this.status.setText(curEnemy.name + " used " + ability.name + " and missed." );
                Phaser.Display.Align.To.TopCenter(this.status, this.currentEnemy);
            }
        }

        this.activate(this);
    }

    registerHit(){

        if(Math.abs(this.circle.scaleX - this.circleTarget.scaleX)< .2){
            for(let i = 0; i < this.attackGroup.length; i++){
                if(this.attackGroup[i].isPlaying()){
                    this.playerDamage = this.playerDamage + this.currentAtk.damage[this.hitCount];
                    this.status.setText(this.playerDamage);
                    Phaser.Display.Align.To.TopCenter(this.status, this.currentEnemy);
                }
            }
            this.hitCount++;
            if(this.hitCount === this.currentAtk.numAtk){
                this.playerDamage = this.playerDamage + this.currentAtk.damage[this.currentAtk.numAtk];
                this.time.delayedCall(250, this.bonusHit, [], this);
            }
        }
        this.input.keyboard.off('keydown_A');
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
        this.scene.resume('level1');
    }



}
