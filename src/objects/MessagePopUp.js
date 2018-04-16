export default class MessagePopUp extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.messageBox = this;
    }

    createText(text){
        var textBox = this.scene.add.text(this.x, this.y, text);
        Phaser.Display.Align.In.Center(textBox, this.messageBox);
        console.log("message box created");
    }
}