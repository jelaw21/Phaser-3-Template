export default class Town extends Phaser.Scene {

    constructor(config) {
        super({key: 'townMap'});

    }

    init(data){
        this.player = data.player;
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
        this.map.createDynamicLayer('houseRoof', this.tiles3, 0, 0);
        this.map.createDynamicLayer('houseRoof2', this.tiles2, 0, 0);
    }
}