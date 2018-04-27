import {getAbility, searchAbilities}  from "./Abilities";
import getItem from "./Items";

export default class Player {

    //TODO: WORK ON GETTING ABILITIES ... SHOULD BE A LOOK UP
    constructor() {
        this.name = 'Erick';
        this.maxHealth = 200;
        this.health = this.maxHealth;
        this.availableAbilities = [getAbility('punch')];
        this.activeAbilities = [];
        this.exp = 0;
        this.unarmedEXP = 0;
        this.wepEXP = 0;
        this.inventory = [getItem('gold')];
        this.equipment = [];
        this.armor = 20;
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

    getHealth(amount){
        return this.health;
    }

    addExp(amount){
        this.exp += amount;
    }

    getArmor(){
        return this.armor;
    }

    getEquipment(){
        return this.equipment;
    }
    //ADD ABILITIES TO THE AVAILABLE ABILITIES
    addAbilities(){
        //look through unarmed
        this.availableAbilities = [];
        let abilities = searchAbilities();
        for(let i = 0; i < abilities.length; i++){
            if(getAbility(abilities[i]).type === 'UNARMED'){
                if(this.unarmedEXP >= getAbility(abilities[i]).exp){
                    this.availableAbilities.push(getAbility(abilities[i]))
                }
            }
        }
        //look through weapons
        for(let i = 0; i < this.equipment.length; i++){
            if(this.equipment[i].type === 'WEAPON'){
                for(let j = 0; j < this.equipment[i].abilities; j++){
                    this.availableAbilities.push(getAbility(this.equipment[i].abilities[j]))
                }
            }
        }

        console.log(this.availableAbilities);
    }

    equipAbilities(){
        this.availableAbilities = [];
        this.availableAbilities.forEach(function(element){
            if(element.active){
                this.activeAbilities.push(element);
            }
        })

        console.log(this.availableAbilities);
    }

    //TODO: REDO BECAUSE ABILITIES CAN BE ACTIVE ...
   /* addAbilities(){
        let abilities = searchAbilities();
        for(let i = 0; i < abilities.length; i++){
            let addIt = true;
            if(this.exp > getAbility(abilities[i]).exp){
                for(let j = 0; j < this.abilities.length; j++){
                    if(this.abilities[j].name === getAbility(abilities[i]).name){
                        addIt = false;
                    }
                }
            }
            if(addIt){
                this.abilities.push(getAbility(abilities[i]));
            }
        }
    }
    //TODO: IS THIS NEEDED???
    equipAbilities(){
        for(let i = 0 ; i < this.abilities.length; i ++){
            if(this.exp >= this.abilities[i].exp ){
                this.abilities[i].active = true;
            }else
                this.abilities[i].active = false;
        }
    }*/

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

        this.buildEquipment();
        this.calculateArmor();
    }

    buildEquipment(){
        this.equipment = [];

        for(let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i].equipped === true) {
                if (this.inventory[i].type === 'ARMOR') {
                    this.equipment.push(this.inventory[i]);
                } else if (this.inventory[i].type === 'WEAPON') {
                    this.abilities.push(this.inventory[i].abilities)
                }
            }
        }
    }

    calculateArmor(){
        this.armor = 0;
        for(let i = 0; i < this.equipment.length; i++){
            if(this.inventory[i].type === 'ARMOR'){
                this.armor = this.armor + this.inventory[i].effect;
            }
        }
    }

}