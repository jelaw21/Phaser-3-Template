
export default function getItem(item){

    return items[item];
}

//SLOTS: TORSO, LEGS, HEAD

let items = {
    'leather_armor': {
        'type': 'ARMOR',
        'name': 'LEATHER ARMOR',
        'slot': 'TORSO',
        'image': ['LeatherB'],
        'effect': 3,
        'maxEffect': 10,
        'quantity': 1,
        'icon': 'armorLeatherIcon',
        'equipped': false,
        'desc': 'The typical wannabe armor for starting adventurers.'
    },
    'gold': {
        'type': 'gold',
        'name': 'GOLD',
        'image': ['coin'],
        'effect': 0,
        'quantity': 0,
        'equipped': false
    },
    'common_chest':{
        'type': 'ARMOR',
        'slot': 'SHIRT',
        'name': 'WHITE SHIRT',
        'image': ['LeatherA'],
        'effect': 0,
        'maxEffect': 0,
        'quantity': 1,
        'icon': 'shirtIcon',
        'equipped': false,
        'desc': 'A common shirt, slightly tattered.'
    },
    'common_legs':{
        'type': 'ARMOR',
        'slot': 'LEGS',
        'name': 'WORN PANTS',
        'image': ['CommonC'],
        'effect': 0,
        'maxEffect': 0,
        'quantity': 1,
        'icon': 'pantsIcon',
        'equipped': false,
        'desc': 'Greenish common pants with a few stylish rips and tears.'
    },
    'common_head':{
        'type': 'ARMOR',
        'name': 'HAIR',
        'slot': 'HEAD',
        'image': ['CommonB'],
        'effect': 0,
        'maxEffect': 0,
        'quantity': 0,
        'equipped': false
    },
    'common_shoes':{
        'type': 'ARMOR',
        'name': 'SHOES',
        'slot': 'FEET',
        'image': ['CommonA'],
        'effect': 1,
        'maxEffect': 5,
        'quantity': 1,
        'icon': 'shoesIcon',
        'equipped': false,
        'desc': 'Common shoes that protect feet. Be wary, they smell.'
    },
    'leather_bracers':{
        'type': 'ARMOR',
        'name': 'LEATHER BRACERS',
        'slot': 'WRIST',
        'image': ['LeatherD'],
        'effect': 2,
        'maxEffect': 5,
        'quantity': 1,
        'icon': 'bracersLeatherIcon',
        'equipped': false,
        'desc': 'Fashionable leather wrist guards. Helps prevent loss of hands.'
    },
    'leather_shoulders':{
        'type': 'ARMOR',
        'name': 'LEATHER SHOULDERS',
        'slot': 'SHOULDERS',
        'image': ['LeatherC'],
        'effect': 2,
        'maxEffect': 7,
        'quantity': 1,
        'icon': 'shouldersLeatherIcon',
        'equipped': false,
        'desc': 'Protects the shoulders from harm and adds that \'beffy\' look.'
    },
    'short_sword':{
        'type': 'WEAPON',
        'group': 'SWORD',
        'name': 'SHORT SWORD',
        'slot': 'WEAPON',
        'image': [' '],
        'abilities': ['slash', 'stab'],
        'icon': '',
        'equipped': false
    }
};


