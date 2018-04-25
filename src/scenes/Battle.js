import Player from '../objects/player'
import getEnemy from '../objects/Enemies'
export default class Battle extends Phaser.Scene {

    constructor(config) {
        super({key: 'battle'});

    }
    update(){
        
    }

    create(){
        this.player = new Player(this, 0,0, ' ', 0);
        this.player.addAbilities();
        this.abilities = this.player.abilities;

        this.buttonGroup = [];
        this.attackGroup = [];
        this.textGroup = [];
        this.enemyGroup = [];
        this.enemies = [];

        this.enemyGroup.push(getEnemy('goblin'));

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

        //TODO: IMPORT ENEMIES PER MAP
        for(let i = 0; i < this.enemyGroup.length; i++){
            let enemy = this.add.sprite(400, 150, this.enemyGroup[i].image).setScale(2);
            this.enemies.push(enemy);
        }

        this.add.text(200 ,325, 'HIT \'A\' WHEN CIRCLES ARE ON EACH OTHER TO ATTACK');
        this.status = this.add.text(0, 0, '           ');
        this.circle = this.add.image(100, 100,'attackCircle').setVisible(false);
        Phaser.Display.Align.In.Center(this.circle, this.enemies[0]);
        this.circleTarget = this.add.image(100, 100,'attackCircle').setScale(1).setVisible(false);
        Phaser.Display.Align.In.Center(this.circleTarget, this.enemies[0]);
        Phaser.Display.Align.To.TopCenter(this.status, this.enemies[0]);



        /*this.input.on('gameobjectup', function(pointer, gameObject){
            gameObject.setTexture('button');
        } );*/

        this.input.on('gameobjectdown', this.setupAttack, this);

        this.input.keyboard.on('keydown_A', this.registerHit, this);
    }

    setupAttack(pointer, gameobject){
        gameobject.setTexture('buttonPressed');
        this.circleTarget.setVisible(true);
        this.circle.setVisible(true);
        //let attacks = [];
        this.currentAtk;

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
                        onCompleteParams: [gameobject, this.sys]
                })
            }else{
                this.attackGroup[i] =this.tweens.add({
                    targets: this.circle,
                    scaleX: 0,
                    scaleY: 0,
                    duration: this.currentAtk.durations[i],
                    paused: true,
                    onComplete: this.playAttack,
                    onCompleteParams: [this.attackGroup[i+1], this.circle]
                })
            }
        }
        this.playAttack1(gameobject);
    }

    playAttack1(button){
        this.clearText();
        Phaser.Display.Align.To.TopCenter(this.status, this.enemies[0]);
        this.playerDamage = 0;
        button.setTexture('button');
        this.circle.setScale(6);
        this.attackGroup[0].restart();
        this.buttonGroup.forEach(function(element){
            button.scene.sys.input.disable(element);
        });

    }

    playAttack(tween, targets, next, circle){
        circle.setScale(6);
        next.restart();
    }
    activate(scene){
        scene.scene.buttonGroup.forEach(function(element){
            scene.scene.sys.input.enable(element);
        });
        scene.scene.circleTarget.setVisible(false);
        scene.scene.circle.setVisible(false);
    }
    waitAFew(tween,target,button,scene){
        scene.scene.time.delayedCall(1000, scene.scene.enemiesTurn, [tween,target,button,scene], this)
    }

    enemiesTurn(tween, target, button, scene){
        for(let i = 0; i < scene.scene.enemyGroup.length; i++){
            let curEnemy = scene.scene.enemyGroup[i];
            let ability = curEnemy.abilities[Phaser.Math.Between(0,curEnemy.abilities.length-1)];
            let damage = 0;
            for(let j = 0; j < ability.numAtk; j++){
                let hit = Phaser.Math.Between(0, 100);
                if(hit < curEnemy.chance){
                    scene.scene.cameras.main.shake(100);
                    damage += ability.damage[j];
                }
            }
            if(damage > 0){
                scene.scene.status.setText(curEnemy.name + " used " + ability.name + " and did " + damage + " pts of damage." )
                scene.scene.status.setPosition(200, 75);
                scene.scene.player.takeDamage(damage);
            }else{
                scene.scene.status.setText(curEnemy.name + " used " + ability.name + " and missed." );
                scene.scene.status.setPosition(200, 75);
            }
        }
        scene.scene.activate(scene);
    }

    registerHit(){

        if(Math.abs(this.circle.scaleX - this.circleTarget.scaleX)< .2){
            //console.log('HIT');
            this.status.setText("GREAT HIT");
            this.time.delayedCall(750, this.clearText, [], this);
            for(let i = 0; i < this.attackGroup.length; i++){
                if(this.attackGroup[i].isPlaying()){

                    this.playerDamage = this.playerDamage + this.currentAtk.damage[i];
                    this.status.setText(this.playerDamage);
                }
            }
            this.enemyGroup[0].health -= this.playerDamage;
            this.playerDamage = 0;
        }
        console.log(this.player.health);
        console.log(this.enemyGroup[0].health);
        /*if(this.countHits >= 2){
            this.status.setText("YOU DEFEATED HIM!!!!");
            this.enemies[0].anims.play('deadMale', true);
            this.time.delayedCall(500, this.endBattle, [], this);
        }*/
    }


    clearText(){
        this.status.setText(' ');
    }

    endBattle(){
        this.scene.stop('battle');
        this.scene.resume('level1');
    }



}
