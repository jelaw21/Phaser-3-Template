export default class MessagePopUp extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.messageBox = this;
    }

    createText(text){
        var config = {
            x: this.x,
            y: this.y,
            text: text,
            style:{
                font: 'bold 16px Arial',
                fill: 'white',
                wordWrap:{
                    width: this.displayWidth,
                    useAdvancedWrap: true
                }
            }
        }
        var textBox = this.scene.make.text(config);
        var closeButton = this.scene.add.sprite(this.x, this.y, 'coin').setInteractive().setOrigin(0);

        Phaser.Display.Align.In.Center(textBox, this.messageBox);
        Phaser.Display.Align.In.TopRight(closeButton, this.messageBox);

        closeButton.on('pointerdown', this.closeMessageBox, this);

    }
    closeMessageBox(){
        console.log("clicked")
        this.scene.sys.displayList.remove(this);
    }
}