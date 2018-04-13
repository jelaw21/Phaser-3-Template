export default class Level1 extends Phaser.Scene {

    constructor(config) {
        super({key: 'level1'});

    }

    create(){
        //CREATE THE MAP
        this.map = this.make.tilemap({key: 'forest'});
       this.tiles = this.map.addTilesetImage('backgroundTiles1', 'backgroundTiles1');
        var tiles2 = this.map.addTilesetImage('backgroundTiles2', 'backgroundTiles2');
        var tiles3 = this.map.addTilesetImage('ProjectUtumno_full', 'itemTiles');
        var tiles4 = this.map.addTilesetImage('townTiles1', 'townTiles1');
        this.layer1 = this.map.createDynamicLayer('grassLayer', this.tiles, 0, 0);
        this.map.createDynamicLayer('grassLayer', tiles2, 0,0);
        //this.map.createStaticLayer('groundCover', tiles, 0, 0);
        this.map.createDynamicLayer('groundCover', tiles2, 0, 0);
        this.blocked = this.map.createDynamicLayer('blockedLayer', this.tiles, 0,0);
        //this.blocked2 = this.map.createStaticLayer('blockedLayer', tiles2, 0,0);


        //HAD TO CREATE THE PLAYER TO PUT FOREGROUND ON TOP
        this.player = this.physics.add.sprite(450, 600, 'playerE');

        //PART OF MAP PLAYER WALKS BEHIND
        this.map.createStaticLayer('foregroundLayer', this.tiles, 0, 0);
        this.map.createDynamicLayer('foregroundLayer', tiles2, 0,0);

        //PLAYER OPTIONS - NOT SURE HOW I NEED TO DO THIS PART
        this.player.setCollideWorldBounds(true);
        //this.player.setScrollFactor(1.3);
        this.player.body.setSize(16,16);
        this.player.body.setOffset(24, 46);

        //TRYING TO RESIZE MAP TO FIT WINDOW, I DON'T THINK ITS WORKING.
        //this.layer1.setScale(2);
        //this.map.setScale(2);
        console.log(this.layer1);
        //this.layer1.setSize(this.sys.game.config.width, this.sys.game.config.height);

        //CAMERA CRAP THAT I'M NOT SURE HOW IT WORKS
        var cam = this.cameras.main;
        cam.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        cam.zoom = 2;
        cam.startFollow(this.player);
        cam.scrollX = 2;


        //COLLISIONS
        this.blocked.setCollisionBetween(0, 800);
        //this.blocked2.setCollisionBetween(0, 256);
        //this.physics.add.colli
        //this.makeGroups(this.blocked);
        var tiles = this.blocked.getTilesWithin(0, 0, 40, 20);
        console.log(tiles);
        var collisionGroup = this.physics.add.staticGroup(tiles);
        console.log(collisionGroup);
        this.physics.add.collider(this.player, this.blocked);


        //GETTING KEYBOARD ENTRIES
        this.cursors = this.input.keyboard.createCursorKeys();

        //ANIMATIONS
        this.animRight = this.anims.create({
            key:'right',
            frames: this.anims.generateFrameNumbers('playerE'),
            frameRate: 10,
            repeat: -1
        });

        this.animLeft = this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers('playerW'),
            frameRate: 10,
            repeat: -1
        });

        this.animUp = this.anims.create({
            key:'up',
            frames: this.anims.generateFrameNumbers('playerN'),
            frameRate: 10,
            repeat: -1
        });

        this.animDown = this.anims.create({
            key:'down',
            frames: this.anims.generateFrameNumbers('playerS'),
            frameRate: 10,
            repeat: -1
        });

        //var graphicsMap = this.add.graphics();
        //this.blocked.renderDebug(graphicsMap);
        //this.player.body.drawDebug(graphicsMap);
       }

    update(){
        //var graphicsMap = this.add.graphics();
        //this.player.body.drawDebug(graphicsMap);

        if((this.cursors.up.isDown || this.cursors.down.isDown) && this.cursors.left.isDown){
            this.playAnim(this.player, 'left');
            this.resumeAnim(this.animLeft);
            if(this.cursors.up.isDown)
                this.player.body.setVelocity(-100, -100);
            else
                this.player.body.setVelocity(-100, 100);
        }if((this.cursors.up.isDown || this.cursors.down.isDown) && this.cursors.right.isDown){
            this.playAnim(this.player, 'right');
            this.resumeAnim(this.animRight);
            if(this.cursors.up.isDown)
                this.player.body.setVelocity(100, -100);
            else
                this.player.body.setVelocity(100, 100);
        }else if(this.cursors.right.isDown){
            this.player.body.setVelocityX(100);
            this.playAnim(this.player, 'right');
            this.resumeAnim(this.animRight);
        }else  if(this.cursors.left.isDown){
            this.player.body.setVelocityX(-100);
            this.playAnim(this.player, 'left');
            this.resumeAnim(this.animLeft)
        }else if(this.cursors.up.isDown){
            this.player.body.setVelocityY(-100);
            this.playAnim(this.player, 'up');
            this.resumeAnim(this.animUp)
        }else if(this.cursors.down.isDown){
            this.player.body.setVelocityY(100);
            this.playAnim(this.player, 'down');
            this.resumeAnim(this.animDown)
        }
        if(this.cursors.left.isUp && this.cursors.right.isUp){
            this.player.body.setVelocityX(0);
            this.animRight.pause(this.animDown.frames);
            this.animLeft.pause();
        }
        if(this.cursors.up.isUp && this.cursors.down.isUp){
            this.player.body.setVelocityY(0);
            this.animUp.pause();
            this.animDown.pause();
        }
    }

    playAnim(sprite, key){
        sprite.anims.play(key, true);
    }
    resumeAnim(direction){
        direction.resume(0);
    }
    /*makeGroups(layer){
        {
            layer.forEachTile(function(tile){
                var collisionGroup = this.tiles.getTileCollisionGroup(tile.index);
                console.log(collisionGroup);
            })
        }
    }*/



}