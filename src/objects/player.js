export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.inventory = {'gold': 0};

        /*this.body = new Phaser.Physics.body;
        this.setCollideWorldBounds(true);
        this.body.setSize(16,16);
        this.body.setOffset(24, 47);
        this.inventory = {'gold': 0};*/
    }

    init(){
        this.scene.physics.add.existing(this);
        //this.setCollideWorldBounds(true);
        this.body.setSize(16,16);
        this.body.setOffset(24, 47);

    }

    move(cursors){

        if((cursors.up.isDown || cursors.down.isDown) && cursors.left.isDown){
            this.anims.play('left', true);
            if(cursors.up.isDown)
                this.body.setVelocity(-100, -100);
            else
                this.body.setVelocity(-100, 100);
        }else if((cursors.up.isDown || cursors.down.isDown) && cursors.right.isDown){
            this.anims.play('right', true);
            if(cursors.up.isDown)
                this.body.setVelocity(100, -100);
            else
                this.body.setVelocity(100, 100);
        }else if(cursors.right.isDown){
            this.body.setVelocity(100, 0);
            this.anims.play('right', true);
        }else if(cursors.left.isDown){
            this.body.setVelocity(-100, 0);
            this.anims.play('left', true);
        }else if(cursors.up.isDown){
            this.body.setVelocity(0, -100);
            this.anims.play('up', true);
        }else if(cursors.down.isDown){
            this.body.setVelocity(0, 100);
            this.anims.play('down', true);
        }else{
            this.body.setVelocity(0,0);
            this.anims.play('stopped', true);
        }
    }

}
