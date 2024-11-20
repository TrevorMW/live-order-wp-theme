/**
 * 
 */
function updateIsForMerchant(webhook, type, merchantID, locationID){
    console.log('INCOMING WEBHOOK: ', webhook);
    let allowed = true;

    allowed = webhook?.merchant_id === merchantID;

    console.log('WEBHOOK LOCATION: ', webhook.data.object[type].location_id, 'CURRENT DASHBOARD LOCATION: ', locationID)
    allowed = webhook?.data?.object[type]?.location_id === locationID;

    return allowed;
}

export {
    updateIsForMerchant
}