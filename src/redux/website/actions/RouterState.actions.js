/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/5/2017.
 * (C) BIT TECHNOLOGIES
 */

import { ContentService } from 'modules/services/REST/forums/content/content.service';

export function newRouterForumArgumentAction(newRouterObject, objectNotFound ) {

    return {
        type: "NEW_ROUTER_OBJECT_ARGUMENT",
        status: {

            object : {
                type: ContentService.extractObjectType(newRouterObject),
                object: newRouterObject,
                notFound : objectNotFound || (newRouterForum === null)

            },


        }
    }
}
