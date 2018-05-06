    export function getAbility(ability){

        return abilities[ability];
    }

    export function getAbilityList(){

        return abilityList;
    }

    //SLOTS: TORSO, LEGS, HEAD
    let abilityList = ['punch','kick','stab','slash','thrust','spin_jab'];

let abilities = {
    'punch':{
        'type': "UNARMED",
        'name': "PUNCH",
        'numAtk': 2,
        'durations': [1500, 1000],
        'damage': [2, 2, 4],
        'maxDam': 8,
        'unlockLvl': 1,
        'experience': 0,
        'level': 1,
        'active': true,
        'icon': 'punch',
        'desc': 'A basic attack. Does not cut down trees.',
        'count': 0
    },
    'kick': {
        'type':"UNARMED",
        'name': "KICK",
        'numAtk': 3,
        'durations': [1500, 1000, 500],
        'damage': [3, 3, 4, 4],
        'maxDam': 14,
        'unlockLvl': 2,
        'experience': 0,
        'level': 1,
        'active': false,
        'icon': 'kick',
        'desc': 'Like Bruce Lee, only slower.',
        'count': 0
    },
    'slash':{
        'type':"SWORD",
        'name': "SLASH",
        'numAtk': 2,
        'durations': [1000, 1000],
        'damage': [4, 6, 5],
        'maxDam': 15,
        'unlockLvl': 2,
        'experience': 0,
        'level': 1,
        'active': false,
        'icon': 'slash',
        'desc': 'Swish and flick. Or just keep swishing.',
        'count': 0
    },
    'stab':{
        'type':"SWORD",
        'name': "STAB",
        'numAtk': 1,
        'durations': [750],
        'damage': [5, 5],
        'maxDam': 10,
        'unlockLvl': 0,
        'experience': 0,
        'level': 1,
        'active': false,
        'icon': 'stab',
        'desc': 'Stick em with the pointy end.',
        'count': 0
    },
    'thrust':{
        'type':"SPEAR",
        'name': "THRUST",
        'numAtk': 3,
        'durations': [750, 750, 950],
        'damage': [4, 4, 4, 8],
        'maxDam': 20,
        'unlockLvl': 1,
        'experience': 0,
        'level': 1,
        'active': false,
        'icon': 'thrust',
        'desc': 'Keep poking til it stops moving',
        'count': 0
    },
    'spin_jab':{
        'type':"SPEAR",
        'name': "SPINNING JAB",
        'numAtk': 4,
        'durations': [1200, 950, 650, 400],
        'damage': [5, 4, 3, 2, 10],
        'maxDam': 24,
        'unlockLvl': 2,
        'experience': 0,
        'level': 1,
        'active': false,
        'icon': 'spinJab',
        'desc': 'The ceiling fan of spear moves.',
        'count': 0
    }

};

