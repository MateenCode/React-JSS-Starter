import { CreateActionCreator } from 'helpers';
import { STOREORDER, PUBLIC_API_KEY } from 'configs/types';

export const storeOrder = (data) => CreateActionCreator.create({
    path: `api/v2/store/order?key=${PUBLIC_API_KEY}`,
    type: STOREORDER,
    data,
});
