import { CreateActionCreator } from 'helpers';
import { WEBSITEASSETS ,PUBLIC_API_KEY } from 'configs/types';

export const getWebsiteAssets = _ => CreateActionCreator.read({
    path: `api/v2/website/settings?key=${PUBLIC_API_KEY}`,
    type: WEBSITEASSETS,
});
