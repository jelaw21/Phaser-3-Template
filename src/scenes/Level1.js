import MessagePopUp from '../objects/MessagePopUp'
import Player from '../objects/player'

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
        this.blocked2 = this.map.createDynamicLayer('blockedLayer2', this.tiles2);

        //OBJECT LAYER  PLEASE UPDATE
        this.coins = this.physics.add.group().addMultiple((this.map.createFromObjects('objectLayer', 3370, { key: 'coin' })), true);
        this.coins.children.iterate(function(child){
            child.body.setSize(8,8);
        });
        this.sign = this.physics.add.staticGroup().addMultiple(this.map.createFromObjects('objectLayer', 2988, {key: 'sign'}), true);
        this.gate = this.physics.add.staticGroup().addMultiple(this.map.createFromObjects('objectLayer', 7058, {key: 'gate'}));

        //HAD TO CREATE THE PLAYER TO PUT FOREGROUND ON TOP
        this.player = this.physics.add.sprite(450, 600, 'playerE');

        //PART OF MAP PLAYER WALKS BEHIND
        this.map.createDynamicLayer('foregroundLayer', this.tiles, 0, 0);
        this.map.createDynamicLayer('foregroundLayer2', this.tiles2, 0,0);

        //PLAYER OPTIONS - NOT SURE HOW I NEED TO DO THIS PART
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(16,16);
        this.player.body.setOffset(24, 47);
        this.player.inventory = {'gold': 0};

        //TRYING TO RESIZE MAP TO FIT WINDOW, I DON'T THINK ITS WORKING.
        this.physics.world.setBounds(0, 24, this.map.widthInPixels-10, this.map.heightInPixels-34);


        //CAMERA CRAP THAT I'M NOT SURE HOW IT WORKS
        var cam = this.cameras.main;
        cam.zoom = 1.5;
        cam.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        cam.startFollow(this.player);
        cam.scrollX = 2;


        //COLLISIONS

        this.blocked.setCollisionBetween(0, 800);
        this.physics.add.collider(this.player, this.blocked);
        this.physics.add.overlap(this.player, this.coins, this.collectCoins, null, this);
        this.physics.add.collider(this.player, this.sign, this.hitSign, null, this);
        this.physics.add.collider(this.player, this.gate, this.hitGate, null, this);

        //GETTING KEYBOARD ENTRIES
        this.cursors = this.input.keyboard.createCursorKeys();

        //ANIMATIONS
        this.anims.create({
            key:'right',
            frames: this.anims.generateFrameNumbers('playerE'),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers('playerW'),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'up',
            frames: this.anims.generateFrameNumbers('playerN'),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'down',
            frames: this.anims.generateFrameNumbers('playerS'),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'stopped',
            frames: [{key: 'playerS', frame: 0}],
            frameRate: 10
        });

        //LISTENERS
        this.events.once('signMessage', this.signMessage, this);
        this.events.once('gateMessage', this.gateMessage, this)

        //var graphicsMap = this.add.graphics();
        //this.map.renderDebug(graphicsMap);
        //this.coins.drawDebug(graphicsMap);
        //this.player.body.drawDebug(graphicsMap);
       }

    update(){
        //bump

        // var graphicsMap = this.add.graphics();
        //this.player.body.drawDebug(graphicsMap);
        if((this.cursors.up.isDown || this.cursors.down.isDown) && this.cursors.left.isDown){
            this.playAnim(this.player, 'left');
            if(this.cursors.up.isDown)
                this.player.body.setVelocity(-100, -100);
            else
                this.player.body.setVelocity(-100, 100);
        }else if((this.cursors.up.isDown || this.cursors.down.isDown) && this.cursors.right.isDown){
            this.playAnim(this.player, 'right');
            if(this.cursors.up.isDown)
                this.player.body.setVelocity(100, -100);
            else
                this.player.body.setVelocity(100, 100);
        }else if(this.cursors.right.isDown){
            this.player.body.setVelocity(100, 0);
            this.playAnim(this.player, 'right');
        }else if(this.cursors.left.isDown){
            this.player.body.setVelocity(-100, 0);
            this.playAnim(this.player, 'left');
        }else if(this.cursors.up.isDown){
           this.player.body.setVelocity(0, -100);
            this.playAnim(this.player, 'up');
        }else if(this.cursors.down.isDown){
            this.player.body.setVelocity(0, 100);
            this.playAnim(this.player, 'down');
        }else{
            this.player.body.setVelocity(0,0);
            this.playAnim(this.player, 'stopped');
        }
    }

    playAnim(sprite, key){
        sprite.anims.play(key, true);
    }
    collectCoins(player, coin){
        coin.destroy();
        this.player.inventory.gold = this.player.inventory.gold + 1;
        console.log(this.player.inventory.gold);
    }
    hitSign(){
        //bump
        this.events.emit('signMessage');

        //this.add.image(player.x, player.y, 'gui');
    }
    hitGate(player, gate){
        if(this.player.inventory.gold >= 8){
            gate.destroy();
        }else{
            this.events.emit('gateMessage');
        }
    }

    signMessage(){
        var message = new MessagePopUp(this, this.player.x, this.player.y, 'gui');
        this.add.existing(message);
        message.createText('Hello, find your way to town.');
    }
    gateMessage(){
        var message = new MessagePopUp(this, this.player.x, this.player.y, 'gui').setOrigin(0);
        this.add.existing(message);
        message.createText('You need to find all 8 coins to pass.');
    }
}