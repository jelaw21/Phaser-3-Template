export default class Town extends Phaser.Scene {

    constructor(config) {
        super({key: 'townMap'});

    }

    init(data){
        this.player = data.player;
        this.player.x = 400;
        this.player.y = 600;
        console.log(this.player);
        console.log("town created");
        console.log(this.player.inventory.gold);
    }

    create(){
        this.map = this.make.tilemap({key: 'town'});
        this.tiles = this.map.addTilesetImage('backgroundTiles1', 'backgroundTiles1');
        this.tiles2 = this.map.addTilesetImage('backgroundTiles2', 'backgroundTiles2');
        this.tiles3 = this.map.addTilesetImage('townTiles1', 'townTiles1');
        this.map.createDynamicLayer('grassLayer', this.tiles, 0,0);
        this.map.createDynamicLayer('groundCover', this.tiles, 0, 0);
        this.map.createDynamicLayer('groundCover2', this.tiles2, 0,0);
        this.map.createDynamicLayer('houseBase', this.tiles3,0,0);
        this.map.createDynamicLayer('houseDecor', this.tiles3,0,0);
        this.map.createDynamicLayer('blockedLayer', this.tiles2,0,0);
        this.map.createDynamicLayer('blockedLayer2', this.tiles3,0,0);
        this.add.existing(this.player);
        this.map.createDynamicLayer('houseRoof', this.tiles3, 0, 0);
        this.map.createDynamicLayer('houseRoof2', this.tiles2, 0, 0);

        this.cursors = this.input.keyboard.createCursorKeys();

        var cam = this.cameras.main;
        cam.zoom = 1.5;
        cam.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        cam.startFollow(this.player);
        cam.scrollX = 2;

    }
    update(){
        this.player.move(this.cursors);
    }
}