export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        console.log(this);
        this.scene = scene;

        /*this.body = new Phaser.Physics.body;
        this.setCollideWorldBounds(true);
        this.body.setSize(16,16);
        this.body.setOffset(24, 47);
        this.inventory = {'gold': 0};*/


    }

    init(){
        this.scene.physics.add.sprite(this);
        //this.setCollideWorldBounds(true);
        this.body.setSize(16,16);
        this.body.setOffset(24, 47);
        this.inventory = {'gold': 0};
    }



}
