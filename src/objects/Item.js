export default class Item {

    constructor(config) {
        this.type = config.type;
        this.name = config.name;
        this.slot = config.slot;
        this.image = config.image;
        this.effect = config.effect;
        this.maxEffect = config.maxEffect;
        this.quantity = config.quantity;
        this.icon = config.icon;
        this.equipped = config.equipped;
        this.desc = config.desc;
        this.group = config.group;
        this.abilities = config.abilities;
    }

    //GETTERS AND SETTERS
    getType(){
        return this.type;
    }

    getName(){
        return this.name;
    }

    getSlot(){
        return this.slot;
    }

    getImage(){
        return this.image;
    }

    getEffect(){
        return this.effect;
    }

    getMaxEffect(){
        return this.maxEffect;
    }

    getQuantity(){
        return this.quantity;
    }
    getIcon(){
        return this.icon;
    }

    getEquipped(){
        return this.equipped;
    }

    getDesc(){
        return this.desc;
    }

    getGroup(){
        return this.group;
    }

    loadAbilities(){
        return this.abilities;
    }

    increaseQuantity(amount){
        this.quantity += amount;
    }

    decreaseQuantity(amount){
        this.quantity -= amount;
    }

    setEquipped(amount){
        this.equipped = amount;
    }

}