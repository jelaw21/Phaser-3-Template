export default class Level1 extends Phaser.Scene {

    constructor(config) {
        super({key: 'level1'});
        this.cursors;
        this.player;
    }

    create(){

        this.map = this.make.tilemap({key: 'forest'});
        var tiles = this.map.addTilesetImage('backgroundTiles1', 'backgroundTiles1');
        var tiles2 = this.map.addTilesetImage('backgroundTiles2', 'backgroundTiles2');
        var tiles3 = this.map.addTilesetImage('ProjectUtumno_full', 'itemTiles');
        var tiles4 = this.map.addTilesetImage('townTiles1', 'townTiles1');
        this.map.createStaticLayer('grassLayer', tiles, 0, 0);
        this.map.createDynamicLayer('grassLayer', tiles2, 0,0);
        this.map.createStaticLayer('groundCover', tiles, 0, 0);
        this.map.createDynamicLayer('groundCover', tiles2, 0, 0);
        this.map.createStaticLayer('blockedLayer', tiles, 0,0);
        this.map.createDynamicLayer('blockedLayer', tiles2, 0,0);
        this.player = this.physics.add.sprite(450, 600, 'playerE')
        this.player.setCollideWorldBounds(true);
        this.map.createStaticLayer('foregroundLayer', tiles, 0, 0);
        this.map.createDynamicLayer('foregroundLayer', tiles2, 0,0);

        this.player.setScrollFactor(1.3);


        var cam = this.cameras.main;
        cam.setBounds(0, 0, this.map.widthInPixels/2, this.map.heightInPixels/2);
        cam.zoom = 2;
        cam.startFollow(this.player);
        cam.scrollX = 2;



        this.cursors = this.input.keyboard.createCursorKeys();



       }

    update(){


        if(this.cursors.left.isDown){
            this.player.body.setVelocityX(-100);
        }else if(this.cursors.right.isDown){
            this.player.body.setVelocityX(100);
        }

        if(this.cursors.left.isUp && this.cursors.right.isUp){
            this.player.body.setVelocityX(0);
        }

        if(this.cursors.up.isDown){
            this.player.body.setVelocityY(-100);
        }else if(this.cursors.down.isDown){
            this.player.body.setVelocityY(100);
        }

        if(this.cursors.up.isUp && this.cursors.down.isUp){
            this.player.body.setVelocityY(0);
        }

    }
}