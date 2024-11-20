const capitalize = (s) => s && s.length > 0 && s[0].toUpperCase() + s.slice(1).toLowerCase()

/**
 * 
 * @param {*} order 
 * @returns 
 */
const getFulfillmentDetails = function(order){
    const ful = order.fulfillments[0];
    const key = this.pickupOrDeliveryKey(order);

    let deets = null;

    if(order){
        deets = ful[key + '_details'];
    }

    return deets;
}  

/**
 * 
 * @param {*} order 
 * @returns 
 */
const pickupOrDeliveryKey = function(order){
    const ful = order.fulfillments[0];

    let key = 'pickup';

    if(ful.type == 'DELIVERY'){
        key = 'delivery';
    }

    return key;
}

/**
 * When we have a long
 * @param {*} name 
 * @param {*} refID 
 */
const getCleanName = function(name, refID){
    let cleanName = name;

    // Try and remove the refID from name string to get clean persons name
    if(refID !== null){
        cleanName = name.replace(refID, '');
    }

    // if we remove the refid, and there isnt anything left, then just use the original string. For phone numbers, etc. 
    if(cleanName === ''){
        cleanName = name;
    }

    return cleanName
}

const sanitizeTitle = function(str, delimiter = '-') {
    str = str.replace(/[^a-zA-Z0-9]+/g, delimiter);
    str = str.replace(/-+/g, delimiter);

    var line_start = '/^\\' + delimiter + '/';
    var line_end = '/\\' + delimiter + '$/';

    str = str.replace(line_start, '').replace(line_end, '');

    str = str.toLowerCase();
    return str;
}

const formatPhoneNumber = function (phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        const intlCode = (match[1] ? '+1 ' : '');
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }

    return null;
}

const formatMoney = function(money){
    const priceStr = new Number(money/100);
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
    return formatter.format(priceStr)
}

const isUpcoming = function(order){
    let isUpcoming = false;

    if(!order.hasOwnProperty('state')){
        isUpcoming = true;
    }

    return isUpcoming;
}

const isCompleted = function(order){
    let isCompleted = false;

    if(order.hasOwnProperty('state') && order.state === 'COMPLETED'){
        isCompleted = true;
    }

    return isCompleted;
}

const isOpen = function(order){
    let isOpen = false;

    if(order.hasOwnProperty('state') && order.state === 'OPEN'){
        isOpen = true;
    }

    return isOpen;
}

const isNew = function(order){
    let isNew = false;

    if(order.hasOwnProperty('state') && order.state === 'OPEN'){
        const ful = order.fulfillments[0];
        
        if(ful.state === 'PROPOSED'){
            isNew = true;
        }
    }

    return isNew;
}

const isInProgress = function(order){
    let isInProgress = false;

    if(order.hasOwnProperty('state') && order.state === 'OPEN'){
        const ful = order.fulfillments[0];
        
        if(ful.state === 'RESERVED'){
            isInProgress = true;
        }
    }

    return isInProgress;
}

const isReady = function(order){
    let isReady = false;

    if(order.hasOwnProperty('state') && order.state === 'OPEN'){
        const ful = order.fulfillments[0];
        
        if(ful.state === 'PREPARED'){
            isReady = true;
        }
    }

    return isReady;
}

const isPickup = function(order){
    let isPickup = false;

    if(order.hasOwnProperty('fulfillments')){
        const ful = order.fulfillments[0];

        if(ful.type === 'PICKUP'){
            isPickup = true;
        }
    }   

    return isPickup;
}

const isDelivery = function(order){
    let isDelivery = false;

    if(order.hasOwnProperty('fulfillments')){
        const ful = order.fulfillments[0];

        if(ful.type === 'DELIVERY'){
            isDelivery = true;
        }
    }   

    return isDelivery;
}

export {
    isUpcoming,
    isCompleted,
    isOpen,
    isNew,
    isInProgress,
    isReady,
    isPickup,
    isDelivery,
    sanitizeTitle,
    capitalize,
    formatPhoneNumber,
    pickupOrDeliveryKey,
    getCleanName,
    getFulfillmentDetails,
    formatMoney
}