/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/5/2017.
 * (C) BIT TECHNOLOGIES
 */

export function newRouterForumArgumentAction(newRouterForum, forumNotFound ) {
    return {
        type: "NEW_ROUTER_FORUM_ARGUMENT",
        status: {
            forum : {
                forum: newRouterForum,
                forumNotFound : forumNotFound || (newRouterForum === null)
            },
        }
    }
}
