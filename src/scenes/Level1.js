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
        this.playerData = new Player();
        this.playerData.generateAllAbilities();
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
        this.player = new PlayerSprite(this, 450, 600, 'playerE', 0);
        this.add.existing(this.player);
        this.player.init(this.playerData);
        this.player.initialEquipment(this.blockedObjects);

        //PART OF MAP PLAYER WALKS BEHIND
        var layer = this.map.createDynamicLayer('foregroundLayer', this.tiles, 0, 0);
        layer.setDepth(1);
        var layer2 = this.map.createDynamicLayer('foregroundLayer2', this.tiles2, 0,0);
        layer2.setDepth(1);
        cam.startFollow(this.player);

        //TRYING TO RESIZE MAP TO FIT WINDOW, I DON'T THINK ITS WORKING.
        this.physics.world.setBounds(0, 24, this.map.widthInPixels-10, this.map.heightInPixels-34);



        //COLLISIONS
        this.blocked.setCollisionBetween(0, 800);
        this.physics.add.collider(this.player, this.blocked);
        this.physics.add.overlap(this.player, this.coins, this.collectCoins, null, this);
        this.physics.add.collider(this.player, this.sign, this.hitSign, null, this);
        this.physics.add.collider(this.player, this.gate, this.hitGate, null, this);

        //GETTING KEYBOARD ENTRIES
        this.cursors = this.input.keyboard.createCursorKeys();

        //LISTENERS
        this.events.once('signMessage', this.signMessage, this);
        this.events.once('gateMessage', this.gateMessage, this);

        //var graphicsMap = this.add.graphics();
        //this.map.renderDebug(graphicsMap);
        //this.coins.drawDebug(graphicsMap);
        //this.player.body.drawDebug(graphicsMap);

        this.scene.launch('dialog', {content: getConversation('act1scene1'), scene:this});
        //ithis.scene.pause(this);

       }

    update(){

        this.player.move();
    }

    collectCoins(player, coin){
        coin.destroy();
        this.playerData.addGold(1);

        if(this.playerData.getGold() === 1){
            //this.playerData.addToInventory('short_sword');
            this.cameras.main.shake(250);
            let goons = ['goblin'];
            let rewards = [];
            this.time.delayedCall(250, this.startBattle, [goons, rewards], this);
        }

        if(this.playerData.getGold() === 3){
            //this.playerData.addToInventory('short_sword');
            this.cameras.main.shake(250);
            this.time.delayedCall(250, this.startBattle, [['goblin'], ['short_sword']], this);
        }

        if(this.playerData.getGold() === 5){
            this.playerData.addToInventory('leather_armor');
            this.playerData.addToInventory('common_shoes');
            this.playerData.addToInventory('leather_bracers');
            this.playerData.addToInventory('leather_shoulders');
            this.scene.launch('message', {player:this.player, text: 'You\'ve Earned Leather Armor. Press \'I\' to equip'});
            /*let message = new MessagePopUp(this, this.player.x, this.player.y, 'messageGUI');
            this.add.existing(message);
            message.createText('You\'ve Earned Leather Armor. Press \'I\' to equip');*/
        }

        if(this.playerData.getGold() === 6){
            this.cameras.main.shake(250);
            this.time.delayedCall(250, this.startBattle, [['goblin', 'goblin', 'goblin'], []], this);
        }

        if(this.playerData.getGold() === 8){
            this.cameras.main.shake(250);
            this.time.delayedCall(250, this.startBattle, [['goblin', 'goblin', 'goblin','goblin', 'goblin'], []], this);
        }
    }
    startBattle(goons, reward){
        this.scene.launch('battle', {player: this.playerData, goons: goons, scene: this, reward: reward});
        this.scene.pause(this);
    }
    hitSign() {
        this.events.emit('signMessage');
    }

    hitGate(player, gate){
        if(this.playerData.getGold() >= 8){
            gate.destroy();
            this.scene.start('gameOver', {player: this.playerData});
        }else{
            this.events.emit('gateMessage');
        }
    }
    signMessage(){
        let text = ['Collect Gold pieces.', '', 'Hit \'I\' for Inventory'];
        this.scene.launch('message', {player:this.player, text: text});
    }
    gateMessage(){
        this.scene.launch('message', {player:this.player, text: 'You need to find all 8 coins to pass.'});
    }
}