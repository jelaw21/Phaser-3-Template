export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.inventory = [{'gold': 0}];
        this.container = this.scene.add.container(x-this.displayWidth/2, y-this.displayHeight/2);
        this.scene.physics.world.enable(this.container);
        this.container.body.setSize(32,64);
    }

    //bump
    //bump

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
            this.container.body.setVelocity(100, 0);
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
    addToInventory(itemToAdd){

        for(let i = 0; i < this.inventory.length; i++){
            if(this.inventory[i].name === itemToAdd.name){
                this.inventory[i].quantity++;
            }else
                this.inventory.push(itemToAdd);
        }
    }

    equipItem(itemToEquip){
        for(let i = 0; i < this.inventory.length; i++){
            if(this.inventory[i].name === itemToEquip.name){
                this.inventory[i].equipped = true;
            }
        }
        this.buildEquipped();
    }

    buildEquipped(){
        for(let i = 0; i < this.inventory.length; i++){
            if(this.inventory[i].equipped === true){
               let item = this.scene.add.sprite(this.x, this.y, this.inventory[i].image)
                this.container.add(item);
            }
        }
        console.log(this.container);

    }

}
