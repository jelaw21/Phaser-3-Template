
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
        'quantity': 1,
        'icon': 'armorLeatherIcon',
        'equipped': false
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
        'effect': 10,
        'quantity': 1,
        'icon': 'shirtIcon',
        'equipped': false
    },
    'common_legs':{
        'type': 'ARMOR',
        'slot': 'LEGS',
        'name': 'WORN PANTS',
        'image': ['CommonC'],
        'effect': 10,
        'quantity': 1,
        'icon': 'pantsIcon',
        'equipped': false
    },
    'common_head':{
        'type': 'ARMOR',
        'name': 'HAIR',
        'slot': 'HEAD',
        'image': ['CommonB'],
        'effect': 10,
        'quantity': 0,
        'equipped': false
    },
    'common_shoes':{
        'type': 'ARMOR',
        'name': 'SHOES',
        'slot': 'FEET',
        'image': ['CommonA'],
        'effect': 10,
        'quantity': 1,
        'icon': 'shoesIcon',
        'equipped': false
    },
    'leather_bracers':{
        'type': 'ARMOR',
        'name': 'LEATHER BRACERS',
        'slot': 'WRIST',
        'image': ['LeatherD'],
        'effect': 10,
        'quantity': 1,
        'icon': 'bracersLeatherIcon',
        'equipped': false
    },
    'leather_shoulders':{
        'type': 'ARMOR',
        'name': 'LEATHER SHOULDERS',
        'slot': 'SHOULDERS',
        'image': ['LeatherC'],
        'effect': 10,
        'quantity': 1,
        'icon': 'shouldersLeatherIcon',
        'equipped': false
    }
};

