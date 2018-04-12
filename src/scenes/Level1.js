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
        this.map.createStaticLayer('foregroundLayer', tiles, 0, 0);
        this.map.createDynamicLayer('foregroundLayer', tiles2, 0,0);
        this.player = this.add.sprite(450, 600, 'playerE');

        var cam = this.cameras.main;
        //cam.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        cam.zoom = 2;
        cam.startFollow(this.player);



        this.cursors = this.input.keyboard.createCursorKeys();

        /*var controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        }*/

       // this.controls = new Phaser.Cameras.Controls.Fixed(controlConfig);
    }

    update(time, delta){
        //this.controls.update(delta);

        if(this.cursors.left.isDown){
            this.player.setVelocityX(-5);
        }else if(this.cursors.right.isDown){
            this.player.setVelocityX(5);
        }

        if(this.cursors.up.isDown){
            this.player.setVelocityY(-5);
        }else if(this.cursors.down.isDown){
            this.player.setVelocityY(-5);
        }

    }
}