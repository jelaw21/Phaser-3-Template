import MessagePopUp from '../objects/MessagePopUp'
import Player from '../objects/player'
import getItem from '../objects/Items.js'
import getConversation from '../objects/Conversations.js'

export default class Level1 extends Phaser.Scene {

    constructor(config) {
        super({key: 'level1'});

    }

    create(){

        //CREATE THE MAP
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
        this.player = new Player(this, 450, 600, 'playerE', 0);
        this.add.existing(this.player);
        this.player.init();
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

        /*for(let i = 0; i < this.player.equipment.length; i++){
            this.physics.add.collider(this.player.equipment[i], this.blocked);
            this.physics.add.collider(this.player.equipment[i], this.sign);
            this.physics.add.collider(this.player.equipment[i], this.gate);
        }*/

        //var graphicsMap = this.add.graphics();
        //this.map.renderDebug(graphicsMap);
        //this.coins.drawDebug(graphicsMap);
        //this.player.body.drawDebug(graphicsMap);

        this.scene.launch('dialog', {player: this.player, content: getConversation('act1scene1'), scene:this});
        this.scene.pause(this);

       }

    update(){

        this.player.move(this.cursors);
    }

    collectCoins(player, coin){
        coin.destroy();
        this.player.addGold(1);
        if(this.player.getGold() === 5){

            this.player.addToInventory(getItem('leather_armor'));
            this.player.addToInventory(getItem('common_shoes'));
            this.player.addToInventory(getItem('leather_bracers'));
            this.player.addToInventory(getItem('leather_shoulders'));
            var message = new MessagePopUp(this, this.player.x, this.player.y, 'gui');
            this.add.existing(message);
            message.createText('You\'ve Earned Leather Armor. Press \'I\' to equip');
        }
        if(this.player.getGold() === 2){
            this.cameras.main.shake(250);
            let goons = ['goblin']
            this.time.delayedCall(500, this.startBattle, [goons], this);
        }
        if(this.player.getGold() === 7){
            this.cameras.main.shake(250);
            let goons = ['goblin','goblin', 'goblin'];
            this.time.delayedCall(500, this.startBattle, [goons], this);
        }
    }
    startBattle(goons){
        this.scene.launch('battle', {player: this.player, goons: goons});
        this.scene.pause(this);
    }
    hitSign() {
        //bump
        this.events.emit('signMessage');
    }

    hitGate(player, gate){
        if(this.player.getGold() >= 8){
            gate.destroy();
            this.cameras.main.fade(3000);
            this.scene.start('townMap', {inventory: this.player.inventory});
        }else{
            this.events.emit('gateMessage');
        }
    }

    signMessage(){
        var message = new MessagePopUp(this, this.player.x, this.player.y, 'gui');
        this.add.existing(message);
        message.createText('Collect Gold pieces. Hit \'I\' for Inventory');
    }
    gateMessage(){
        var message = new MessagePopUp(this, this.player.x, this.player.y, 'gui').setOrigin(0);
        this.add.existing(message);
        message.createText('You need to find all 8 coins to pass.');
    }
}