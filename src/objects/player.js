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
        this.unarmedEXP = 50;
        this.swordEXP = 0;
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

    addUnarmedExp(amount){
        this.unarmedEXP += amount;
    }
    getUnarmedExp(){
        return this.unarmedEXP;
    }


    getArmor(){
        return this.armor;
    }

    getEquipment(){
        return this.equipment;
    }

    getActiveAbilities(){
        return this.activeAbilities;
    }

    toggleActiveAbility(ability){
        for(let i = 0; i < this.availableAbilities.length; i++){
            if(ability.name === this.availableAbilities[i].name ){
                 if(this.availableAbilities[i].active === true){
                    this.availableAbilities[i].active = false
                }else
                    this.availableAbilities[i].active = true
            }
        }
    }


    getAvailableAbilities(){
        return this.availableAbilities;
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
                    if(this.swordEXP >= getAbility(abilities[i]).exp && getAbility(abilities[i]).group === 'SWORD')
                        this.availableAbilities.push(getAbility(this.equipment[i].abilities[j]))
                }
            }
        }

        //console.log(this.availableAbilities);
    }

    equipAbilities(){
        let player = this;
        this.activeAbilities = [];
        this.availableAbilities.forEach(function(element){
            //console.log(element);
            //console.log(element.active);
            //console.log(player.activeAbilities);
            if(element.active){
                player.activeAbilities.push(element);
            }
        });

        //console.log(this.activeAbilities);
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
        this.addAbilities();
        this.buildEquipment();
        this.calculateArmor();
    }

    buildEquipment(){
        this.equipment = [];

        for(let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i].equipped === true) {
                if (this.inventory[i].type === 'ARMOR') {
                    this.equipment.push(this.inventory[i]);
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