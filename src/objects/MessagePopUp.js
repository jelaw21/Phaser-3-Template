export default class MessagePopUp extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        //this.messageBox = this;
        this.setDisplaySize(128,64);
        this.setSize(128, 64);
    }

    createText(text){
        var config = {
            x: this.x,
            y: this.y,
            text: text,
            style:{
                fontSize: 12,
                fill: 'white',
                wordWrap:{
                    width: this.displayWidth,
                    useAdvancedWrap: true
                }
            }
        };
        this.setDepth(2);
        this.textBox = this.scene.make.text(config).setDepth(2);
        //this.exitBackground = this.scene.add.sprite(this.x, this.y, 'exitBackground').setDepth(2);

        Phaser.Display.Align.In.Center(this.textBox, this);
        //Phaser.Display.Align.In.TopRight(this.exitBackground, this.messageBox);
        this.closeButton = this.scene.add.sprite(this.x, this.y, 'exitButton').setInteractive().setDepth(2);
        Phaser.Display.Align.In.TopRight(this.closeButton, this);

        this.closeButton.on('pointerdown', this.closeMessageBox, this);

        this.scene.time.delayedCall(4000, this.closeMessageBox, [], this);

    }
    closeMessageBox(){
        this.destroy();
        this.textBox.destroy();
        this.closeButton.destroy();
        //this.exitBackground.destroy();
    }
}