import { CreateActionCreator } from 'helpers';
import { ORDEREDTRACK,PUBLIC_API_KEY } from 'configs/types';

export const orderTrack = (data) => CreateActionCreator.create({
    path: `api/v2/dispatch/track?key=${PUBLIC_API_KEY}`,
    type: ORDEREDTRACK,
    data,
});
