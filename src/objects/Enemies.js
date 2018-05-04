import {getAbility, searchAbilities}  from "./AbilitiesList";

export default function getEnemy(enemy){

    return enemies[enemy];
}

let enemies = {

    'goblin':{
        'name': 'GOBLIN',
        'image': 'goblin',
        'health': 20,
        'maxHealth': 20,
        'abilities': [getAbility('punch'), getAbility('kick')],
        'exp': 500,
        'chance': 50,
        'gold': 0
    }
};