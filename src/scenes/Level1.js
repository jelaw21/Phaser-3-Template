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
        this.player.body.setSize(16,16);
        this.player.body.setOffset(24, 47);

        //TRYING TO RESIZE MAP TO FIT WINDOW, I DON'T THINK ITS WORKING.
        this.physics.world.setBounds(0, 24, this.map.widthInPixels-10, this.map.heightInPixels-34);


        //CAMERA CRAP THAT I'M NOT SURE HOW IT WORKS
        var cam = this.cameras.main;
        cam.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        cam.zoom = 2;
        cam.startFollow(this.player);
        cam.scrollX = 2;


        //COLLISIONS
        this.blocked.setCollisionBetween(0, 800);
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

       // var graphicsMap = this.add.graphics();
        //this.blocked.renderDebug(graphicsMap);
       // this.player.body.drawDebug(graphicsMap);
       }

    update(){
        //bump


       // var graphicsMap = this.add.graphics();
        //this.player.body.drawDebug(graphicsMap);

        if((this.cursors.up.isDown || this.cursors.down.isDown) && this.cursors.left.isDown){

            //this.playAnim(this.player, 'left');
            //this.resumeAnim(this.animLeft);
            if(this.cursors.up.isDown)
                this.player.body.setVelocity(-100, -100);
            else
                this.player.body.setVelocity(-100, 100);
        }else if((this.cursors.up.isDown || this.cursors.down.isDown) && this.cursors.right.isDown){
            //this.playAnim(this.player, 'right');
            //this.resumeAnim(this.animRight);
            if(this.cursors.up.isDown)
                this.player.body.setVelocity(100, -100);

            else
                this.player.body.setVelocity(100, 100);
        }else if(this.cursors.right.isDown){
            this.player.body.setVelocity(100, 0);
            this.playAnim(this.player, 'right');
            //this.resumeAnim(this.animRight);
        }else if(this.cursors.left.isDown){
            this.player.body.setVelocity(-100, 0);
            //this.playAnim(this.player, 'left');
            //this.resumeAnim(this.animLeft)
        }else if(this.cursors.up.isDown){
           this.player.body.setVelocity(0, -100);
            //this.playAnim(this.player, 'up');
            //this.resumeAnim(this.animUp)
        }else if(this.cursors.down.isDown){
            this.player.body.setVelocity(0, 100);
            //this.playAnim(this.player, 'down');
            //this.resumeAnim(this.animDown)
        }else{
            this.player.body.setVelocity(0,0);
        }
    }

    playAnim(sprite, key){
        sprite.anims.play(key, true);
    }

}