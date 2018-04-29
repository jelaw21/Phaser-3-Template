    export function getAbility(ability){

        return abilities[ability];
    }

    export function searchAbilities(){

        return abilityList;
    }

    //SLOTS: TORSO, LEGS, HEAD
    let abilityList = ['punch', 'kick', 'slash', 'stab'];

let abilities = {
    'punch':{
        'type': "UNARMED",
        'name': "PUNCH",
        'numAtk': 2,
        'durations': [1500, 1000],
        'damage': [2, 2, 4],
        'maxDam': 8,
        'exp': 0,
        'active': true,
        'icon': 'punch',
        'desc': 'A basic attack. Does not cut down trees.'
    },
    'kick': {
        'type':"UNARMED",
        'name': "KICK",
        'numAtk': 3,
        'durations': [2000, 1000, 750],
        'damage': [3, 3, 4, 4],
        'maxDam': 14,
        'exp': 15,
        'active': false,
        'icon': 'kick',
        'desc': 'Like Bruce Lee, only slower.'
    },
    'slash':{
        'type':"WEAPON",
        'name': "SLASH",
        'numAtk': 2,
        'durations': [1000, 1000],
        'damage': [4, 6, 5],
        'maxDam': 15,
        'exp': 0,
        'active': false,
        'icon': 'kick'
    },
    'stab':{
        'type':"WEAPON",
        'name': "STAB",
        'numAtk': 1,
        'durations': [750],
        'damage': [5, 5],
        'maxDam': 10,
        'exp': 30,
        'active': false,
        'icon': 'kick'
    }
};

