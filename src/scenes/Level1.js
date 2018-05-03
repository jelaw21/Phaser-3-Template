import MessagePopUp from './MessagePopUp'
import PlayerSprite from '../objects/playerSprite'
import Player from '../objects/player'
import getConversation from '../objects/Conversations.js'

export default class Level1 extends Phaser.Scene {

    constructor(config) {
        super({key: 'level1'});

    }

    create(){
        //CREATE THE MAP
        this.player = new Player();
        this.player.generateAllAbilities();
        this.map = this.make.tilemap({key: 'forest'});
        this.tiles = this.map.addTilesetImage('backgroundTiles1', 'backgroundTiles1');
        this.tiles2 = this.map.addTilesetImage('backgroundTiles2', 'backgroundTiles2');
        this.map.createDynamicLayer('grassLayer', this.tiles, 0, 0);
        this.map.createDynamicLayer('groundCover', this.tiles, 0, 0);
        this.map.createDynamicLayer('groundCover2', this.tiles2, 0, 0);
        this.blocked = this.map.createDynamicLayer('blockedLayer', this.tiles);
        this.map.createDynamicLayer('blockedLayer2', this.tiles2);

        //OBJECT LAYER  PLEASE UPDATE
        this.coins = this.physics.add.group().addMultiple((this.map.createFromObjects('objectLayer', 3370, { key: 'coin' })), true);
        this.coins.children.iterate(function(child){
            child.body.setSize(8,8);
        });
        this.sign = this.physics.add.staticGroup().addMultiple(this.map.createFromObjects('objectLayer', 2988, {key: 'sign'}), true);
        this.gate = this.physics.add.staticGroup().addMultiple(this.map.createFromObjects('objectLayer', 7058, {key: 'gate'}));
        this.blockedObjects = [this.blocked, this.sign, this.gate];
        //CAMERA CRAP THAT I'M NOT SURE HOW IT WORKS
        var cam = this.cameras.main;
        cam.zoom = 1.5;
        cam.setBounds(0, 0, this.map.widthInPixels-155, this.map.heightInPixels);
        //cam.scrollX = 2;

        //HAD TO CREATE THE PLAYER TO PUT FOREGROUND ON TOP
        //this.player = this.physics.add.sprite(450, 600, 'playerE');
        this.sprite = new PlayerSprite(this, 450, 600, 'playerE', 0);
        this.add.existing(this.sprite);
        this.sprite.init(this.player);
        this.sprite.initialEquipment(this.blockedObjects);

        //PART OF MAP PLAYER WALKS BEHIND
        var layer = this.map.createDynamicLayer('foregroundLayer', this.tiles, 0, 0);
        layer.setDepth(1);
        var layer2 = this.map.createDynamicLayer('foregroundLayer2', this.tiles2, 0,0);
        layer2.setDepth(1);
        cam.startFollow(this.sprite);

        //TRYING TO RESIZE MAP TO FIT WINDOW, I DON'T THINK ITS WORKING.
        this.physics.world.setBounds(0, 24, this.map.widthInPixels-10, this.map.heightInPixels-34);



        //COLLISIONS
        this.blocked.setCollisionBetween(0, 800);
        this.physics.add.collider(this.sprite, this.blocked);
        this.physics.add.overlap(this.sprite, this.coins, this.collectCoins, null, this);
        this.physics.add.collider(this.sprite, this.sign, this.hitSign, null, this);
        this.physics.add.collider(this.sprite, this.gate, this.hitGate, null, this);

        //LISTENERS
        this.events.once('signMessage', this.signMessage, this);
        this.events.once('gateMessage', this.gateMessage, this);

        //var graphicsMap = this.add.graphics();
        //this.map.renderDebug(graphicsMap);
        //this.coins.drawDebug(graphicsMap);
        //this.player.body.drawDebug(graphicsMap);

        this.scene.launch('dialog', {content: getConversation('act1scene1'), scene:this});

       }

    update(){

        this.sprite.move();
    }

    collectCoins(player, coin){
        coin.destroy();
        this.player.addGold(1);

        if(this.player.getGold() === 1){
            this.cameras.main.shake(250);
            this.time.delayedCall(250, this.startBattle, [['goblin'],[]], this);
        }

        if(this.player.getGold() === 3){
            this.cameras.main.shake(250);
            this.time.delayedCall(250, this.startBattle, [['goblin'], ['short_sword']], this);
        }

        if(this.player.getGold() === 5){
            this.player.addToInventory('leather_armor');
            this.player.addToInventory('common_shoes');
            this.player.addToInventory('leather_bracers');
            this.player.addToInventory('leather_shoulders');
            this.scene.launch('message', {text: 'You\'ve Earned Leather Armor. Press \'I\' to equip'});
        }

        if(this.player.getGold() === 6){
            this.cameras.main.shake(250);
            this.time.delayedCall(250, this.startBattle, [['goblin', 'goblin', 'goblin'], []], this);
        }

        if(this.player.getGold() === 8){
            this.cameras.main.shake(250);
            this.time.delayedCall(250, this.startBattle, [['goblin', 'goblin', 'goblin','goblin', 'goblin'], []], this);
        }
    }
    startBattle(goons, reward){
        this.scene.launch('battle', {player: this.player, goons: goons, scene: this, reward: reward});
        this.scene.pause(this);
    }
    hitSign() {
        this.events.emit('signMessage');
    }

    hitGate(player, gate){
        if(this.player.getGold() >= 8){
            gate.destroy();
            this.scene.start('gameOver');
        }else{
            this.events.emit('gateMessage');
        }
    }
    signMessage(){
        let text = ['Collect Gold pieces.', '', 'Hit \'I\' for Inventory'];
        this.scene.launch('message', {text: text});
    }
    gateMessage(){
        this.scene.launch('message', {text: 'You need to find all 8 coins to pass.'});
    }
}