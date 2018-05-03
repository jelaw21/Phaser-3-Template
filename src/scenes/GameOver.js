export default class GameOver extends Phaser.Scene {

    constructor(config) {
        super({key: 'gameOver'});

    }

    create() {

        this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height * (1 / 5), "THE END ... FOR NOW.").setOrigin(.5);
        this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height * (3 / 5), "ALL YOUR STUFF ARE BELONGS TO US").setOrigin(.5);
        this.dead = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height * (2 / 5), 'deadMale');
        this.dead.anims.play('deadMale', true);

    }
}