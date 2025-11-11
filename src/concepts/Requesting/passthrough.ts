/**
 * The Requesting concept exposes passthrough routes by default,
 * which allow POSTs to the route:
 *
 * /{REQUESTING_BASE_URL}/{Concept name}/{action or query}
 *
 * to passthrough directly to the concept action or query.
 * This is a convenient and natural way to expose concepts to
 * the world, but should only be done intentionally for public
 * actions and queries.
 *
 * This file allows you to explicitly set inclusions and exclusions
 * for passthrough routes:
 * - inclusions: those that you can justify their inclusion
 * - exclusions: those to exclude, using Requesting routes instead
 */

/**
 * INCLUSIONS
 *
 * Each inclusion must include a justification for why you think
 * the passthrough is appropriate (e.g. public query).
 *
 * inclusions = {"route": "justification"}
 */

export const inclusions: Record<string, string> = {
  // Feel free to delete these example inclusions
  "/api/Sessioning/create": "",
  "/api/Sessioning/delete": "",
  "/api/Sessioning/_getUser": "",

  "/api/Authentication/_getAllUsers":"",
  "/api/Authentication/_getUsername":"",

  "/api/Commenting/_getCommentsByAuthor": "",
  "/api/Commenting/_getCommentsByParent": "",
  "/api/Commenting/_getAllComments": "",
  "/api/Commenting/_getParent": "",
  "/api/Commenting/_getAuthor": "",

  "/api/Notifying/_getNotificationsByUser": "",
  "/api/Notifying/_getReadNotificationsByUser": "",
  "/api/Notifying/_getUnreadNotificationsByUser": "",
  "/api/Notifying/_getAllNotifications": "",

  "/api/Posting/_getPostsByAuthor":"",
  "/api/Posting/_getAllPosts":"",
  "/api/Posting/_getAuthor":"",
  "/api/Posting/_isSameID":"",

  "/api/Shelving/_getUserShelfByBook":"",
  "/api/Shelving/_getShelvesByBook":"",
  "/api/Shelving/_getBooksByUser":"",
  "/api/Shelving/_getAllShelves":"",
  "/api/Shelving/_getShelfByBookAndOwner":"",

  "/api/Tagging/_getAllPublicTags": "public query",
  "/api/Tagging/_getTagsByBook":"",
  "/api/Tagging/_getLabelsByBook":"",
  "/api/Tagging/_getBooksByLabel":"",
  "/api/Tagging/_getTagsByUser":"",
  "/api/Tagging/_getLabelsByUser":"",
  "/api/Tagging/_getAllTags":"",

  "/api/Upvoting/_getUpvotessByUser":"",
  "/api/Upvoting/_getUpvotesByItem":"",
  "/api/Upvoting/_getAllUpvotes":""
};

/**
 * EXCLUSIONS
 *
 * Excluded routes fall back to the Requesting concept, and will
 * instead trigger the normal Requesting.request action. As this
 * is the intended behavior, no justification is necessary.
 *
 * exclusions = ["route"]
 */

export const exclusions: Array<string> = [
  // Feel free to delete these example exclusions

  "/api/Authentication/register",
  "/api/Authentication/authenticate",
  "/api/Authentication/changePassword",
  "/api/Authentication/deleteUser",

  "/api/Commenting/createComment",
  "/api/Commenting/deleteComment",
  "/api/Commenting/editComment",

  "/api/Notifying/notify",
  "/api/Notifying/read",

  "/api/Posting/createPost",
  "/api/Posting/deletePost",
  "/api/Posting/editPost",

  "/api/Shelving/addBook",
  "/api/Shelving/removeBook",
  "/api/Shelving/changeStatus",

  "/api/Tagging/addTag",
  "/api/Tagging/removeTag",
  "/api/Tagging/markPrivate",
  "/api/Tagging/markPublic",

  "/api/Upvoting/upvote",
  "/api/Upvoting/unvote",

];
