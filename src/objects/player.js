import getAbility from "./Abilities";
import getItem from "./Items";

export default class Player {

    //TODO: WORK ON GETTING ABILITIES ... SHOULD BE A LOOK UP
    constructor() {
        this.name = 'Erick';
        this.maxHealth = 200;
        this.health = this.maxHealth;
        this.abilities = [getAbility('punch'), getAbility('kick')];
        this.exp = 0;
        this.inventory = [getItem('gold')];
        this.equipment = [];
        this.abilities = [getAbility('punch'), getAbility('kick')];
    }

    addGold(amount){
        this.inventory[0].quantity += amount;
    }

    getGold(){
        return this.inventory[0].quantity;
    }

    takeDamage(amount){
        this.health -= amount;
    }

    addHealth(amount){
        this.health += amount;
    }

    addAbilities(){
        for(let i = 0 ; i < this.abilities.length; i ++){
            if(this.exp >= this.abilities[i].playerExp ){
                this.abilities[i].active = true;
            }else
                this.abilities[i].active = false;
        }
    }

    addToInventory(itemToAdd){

        for(let i = 0; i < this.inventory.length; i++){
            if(this.inventory[i].name === itemToAdd.name){
                this.inventory[i].quantity++;
            }else
                this.inventory.push(itemToAdd);
            break;
        }
    }
    equipItem(itemToEquip){
        for(let i = 0; i < this.inventory.length; i++){

            if(this.inventory[i].slot === itemToEquip.slot){
                this.inventory[i].equipped = false
            }
            if(this.inventory[i].name === itemToEquip.name){
                this.inventory[i].equipped = true;
            }
        }
        //this.buildEquipped(this, layers);
    }

}