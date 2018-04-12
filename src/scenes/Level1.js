export default class Level1 extends Phaser.Scene {

    constructor(config) {
        super({key: 'level1'});
        console.log("Level1 Called");
    }

    create(){

        var map = this.make.tilemap({key: 'forest'});
        var tiles = map.addTilesetImage('backgroundTiles1', 'backgroundTiles1');
        var tiles2 = map.addTilesetImage('backgroundTiles2', 'backgroundTiles2');
        var tiles3 = map.addTilesetImage('ProjectUtumno_full', 'itemTiles');
        var tiles4 = map.addTilesetImage('townTiles1', 'townTiles1');
        map.createStaticLayer('grassLayer', tiles, 0, 0);
        map.createStaticLayer('grassLayer', tiles2, 0, 0);
        map.createStaticLayer('groundCover', tiles, 0, 0);
        map.createStaticLayer('groundCover', tiles2, 0, 0);
        map.createStaticLayer('blockedLayer', tiles, 0,0);
        map.createStaticLayer('blockedLayer', tiles2, 0,0);
        map.createStaticLayer('foregroundLayer', tiles, 0, 0);
        map.createStaticLayer('foregroundLayer', tiles2, 0,0);

        var cam = this.cameras.main
        cam.setBounds(0, 0, 2880, 1960);
        //cam.zoom = 2;


        var cursors = this.input.keyboard.createCursorKeys();

        var controlConfig = {
            camera: this.cameras.main,
            left:cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        }

        this.controls = new Phaser.Cameras.Controls.Fixed(controlConfig);
    }

    update(time, delta){
        this.controls.update(delta);
    }
}