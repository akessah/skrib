import { actions, Sync } from "@engine";
import { Posting, Requesting, Commenting } from "@concepts";

//Creating posts
export const CreatePostRequest: Sync = (
  { request, user, body, },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Posting/createPost", user, body },
    { request },
  ]),
  // where: (frames) => {
  //   return frames.query(Sessioning._getUser, { session }, { user });
  // },
  then: actions([Posting.createPost, {
    user,
    body,
  }]),
});

export const CreatePostResponse: Sync = (
  { request, post },
) => ({
  when: actions([Requesting.request, { path: "/Posting/createPost"}, { request },],
    [Posting.createPost, {}, {post}]
  ),
  then: actions([Requesting.respond, {
    request,
    post,
  }]),
});


//Deleting Posts
export const DeletePostRequest: Sync = (
  { request, post },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Posting/deletePost", post },
    { request },
  ]),
  then: actions([Posting.deletePost, {
    post
  }]),
});

export const DeletePostSuccessResponse: Sync = (
  { request },
) => ({
  when: actions([Requesting.request, { path: "/Posting/deletePost"}, { request },],
    [Posting.deletePost, {}, {}]
  ),
  then: actions([Requesting.respond, {
    request,
    status: "Post successfully deleted"
  }]),
});

export const DeletePostFailureResponse: Sync = (
  { request, error },
) => ({
  when: actions([Requesting.request, { path: "/Posting/deletePost"}, { request },],
    [Posting.deletePost, {}, {error}]
  ),
  then: actions([Requesting.respond, {
    request,
    error
  }]),
});


//Editing Posts
export const EditPostRequest: Sync = (
  { request, post, newBody },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Posting/editPost", post, newBody },
    { request },
  ]),
  then: actions([Posting.editPost, {
    post, newBody
  }]),
});

export const EditPostSuccessResponse: Sync = (
  { request },
) => ({
  when: actions([Requesting.request, { path: "/Posting/editPost"}, { request },],
    [Posting.editPost, {}, {}]
  ),
  then: actions([Requesting.respond, {
    request,
    status: "Comment successfully edited"
  }]),
});

export const EditPostFailureResponse: Sync = (
  { request, error },
) => ({
  when: actions([Requesting.request, { path: "/Posting/editPost"}, { request },],
    [Posting.editPost, {}, {error}]
  ),
  then: actions([Requesting.respond, {
    request,
    error
  }]),
});


export const DeleteCommentsOnPostDeletion: Sync = ({ post, comment }) => ({
    when: actions(
        [Posting.deletePost, { post }, {}],
    ),
    where: async (frames) => {
        frames = await frames.query( Commenting._getCommentsByParent, { parent: post }, { _id: comment });
        return frames;
    },
    then: actions(
        // For each frame that made it through the 'where' clause (i.e., for each comment found),
        // delete that specific comment.
        [Commenting.deleteComment, { comment }],
    ),
});
