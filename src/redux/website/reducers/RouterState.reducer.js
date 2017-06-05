/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/5/2017.
 * (C) BIT TECHNOLOGIES
 */

import {Forum} from 'modules/forums/forums/models/Forum.model';

export const defaultRouterState = {

    forum : {
        forum: null,
        forumNotFound : false,
    },

};

export function RouterStatusReducer  ( state = defaultRouterState, action)  {

    let newState = state;

    switch (action.type) {

        case 'NEW_ROUTER_FORUM_ARGUMENT':

            newState.forum = action.status.forum;
            break;

        case 'NEW_ROUTER_TOPIC_ARGUMENT':

            newState.topic = action.status.topic;
            break;
    }

    return newState;
};

