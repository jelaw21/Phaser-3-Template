import Player from '../objects/player'
import enemies from '../objects/Enemies'
export default class Battle extends Phaser.Scene {

    constructor(config) {
        super({key: 'battle'});

    }

    create(){
        this.player = new Player(this, 0,0, ' ', 0);
        this.player.addAbilities();
        this.abilities = this.player.abilities;
        this.countHits = 0;

        this.buttonGroup = [];
        this.attackGroup = [];
        this.textGroup = [];
        this.enemyGroup = [];

        this.enemyGroup.push(enemies['goblin']);
        console.log(this.enemyGroup);


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

        this.enemy = this.add.sprite(400, 150, 'playerS').setScale(2);
        this.add.text(200 ,325, 'HIT \'A\' WHEN CIRCLES ARE ON EACH OTHER TO ATTACK');
        this.status = this.add.text(0, 0, '           ');
        this.circle = this.add.image(100, 100,'attackCircle');
        Phaser.Display.Align.In.Center(this.circle, this.enemy);
        this.circleTarget = this.add.image(100, 100,'attackCircle').setScale(1);
        Phaser.Display.Align.In.Center(this.circleTarget, this.enemy);
        Phaser.Display.Align.To.TopCenter(this.status, this.enemy);



        /*this.input.on('gameobjectup', function(pointer, gameObject){
            gameObject.setTexture('button');
        } );*/

        this.input.on('gameobjectdown', this.setupAttack, this);

        this.input.keyboard.on('keydown_A', this.registerHit, this);
    }

    setupAttack(pointer, gameobject){
        gameobject.setTexture('buttonPressed');
        //let attacks = [];
        let currentAtk;

        for(let i = 0; i < this.abilities.length; i++){
            if(gameobject.name === this.abilities[i].name){
                currentAtk = this.abilities[i]
            }
        }
        console.log(currentAtk);
        for(let i = currentAtk.numAtk-1; i >= 0; i--){
            if(i === currentAtk.numAtk-1){
                console.log("adding last tween");
                this.attackGroup[i] =
                    this.tweens.add({
                        targets: this.circle,
                        scaleX: 0,
                        scaleY: 0,
                        duration: currentAtk.durations[i],
                        paused: true,
                        onComplete: this.activate,
                        onCompleteParams: [gameobject, this.sys]
                })
            }else{
                console.log("adding first tween");
                console.log(this.attackGroup[i+1]);
                this.attackGroup[i] =this.tweens.add({
                    targets: this.circle,
                    scaleX: 0,
                    scaleY: 0,
                    duration: currentAtk.durations[i],
                    paused: true,
                    onComplete: this.playAttack,
                    onCompleteParams: [this.attackGroup[i+1], this.circle]
                })
            }
        }
        /*this.combo1 = this.tweens.add({
            targets: this.circle,
            scaleX: 0,
            scaleY: 0,
            duration: this.setup1[0],
            paused: true,
            onComplete: this.playAttack,
            onCompleteParams: [this.combo2, this.circle]
        });*/
        this.playAttack1(gameobject);
    }

    playAttack1(button){
        this.countHits = 0;
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
    activate(tween, target, button, scene){
        scene.scene.buttonGroup.forEach(function(element){
            scene.scene.sys.input.enable(element);
        });
    }

    enemiesTurn(tween, target, button, scene){

    }

    registerHit(){
        if(Math.abs(this.circle.scaleX - this.circleTarget.scaleX)< .2){
            //console.log('HIT');
            this.status.setText("GREAT HIT");
            this.time.delayedCall(750, this.clearText, [], this);
            this.countHits++;
        }
        if(this.countHits >= 2){
            this.status.setText("YOU DEFEATED HIM!!!!");
            this.enemy.anims.play('deadMale', true);
            this.time.delayedCall(2000, this.endBattle, [], this);
        }
    }

    clearText(){
        this.status.setText(' ');
    }

    endBattle(){
        this.scene.stop('battle');
        this.scene.resume('level1');
    }



}
