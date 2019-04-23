import { combineReducers } from 'redux';

import { orderedTrack } from './orderedtrack';
import { websiteAssets } from './websiteAssets';
import { storeOrderInfo } from './storeOrder';

export default combineReducers({
    orderedTrack,
    websiteAssets,
    storeOrderInfo,
});
