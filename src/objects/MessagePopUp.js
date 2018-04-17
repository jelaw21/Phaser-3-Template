export default class MessagePopUp extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.messageBox = this;
    }


    createText(text){
        console.log("created")
        var config = {
            x: this.x,
            y: this.y,
            text: text,
            style:{
                font: 'bold 12px Arial',
                fill: 'white',
                wordWrap:{
                    width: this.displayWidth,
                    useAdvancedWrap: true
                }
            }
        }
        this.textBox = this.scene.make.text(config);
        this.exitBackground = this.scene.add.sprite(this.x, this.y, 'exitBackground').setScale(.8);

        Phaser.Display.Align.In.Center(this.textBox, this.messageBox);
        Phaser.Display.Align.In.TopRight(this.exitBackground, this.messageBox);
        this.closeButton = this.scene.add.sprite(this.exitBackground.x, this.exitBackground.y, 'exitButton').setInteractive();
        Phaser.Display.Align.In.Center(this.closeButton, this.exitBackground);

        this.closeButton.on('pointerdown', this.closeMessageBox, this);

    }
    closeMessageBox(){
        console.log("clicked")
        this.destroy();
        this.textBox.destroy();
        this.closeButton.destroy();
        this.exitBackground.destroy();
    }
}