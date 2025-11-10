// These two help you declare synchronizations
import { actions, Sync } from "@engine";
// Choose whatever concepts you have. Assuming PostingConcept and CommentingConcept
// are available and have the necessary actions/queries based on the spec and examples.
import { Requesting, Upvoting } from "@concepts";


export const UpvoteRequest: Sync = (
  { request, user, item },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Upvoting/upvote", user, item },
    { request },
  ]),
  then: actions([Upvoting.upvote, {
    user,
    item,
  }]),
});

export const UpvoteSuccessResponse: Sync = (
  { request },
) => ({
  when: actions([Requesting.request, { path: "/Upvoting/upvote", }, { request }, ],
    [Upvoting.upvote, {}, {}]
  ),
  then: actions([Requesting.respond, {
    request,
    status: "Successfully upvoted",
  }]),
});

export const UpvoteFailureResponse: Sync = (
  { request, error },
) => ({
  when: actions([Requesting.request, { path: "/Upvoting/upvote", }, { request }, ],
    [Upvoting.upvote, {}, {error}]
  ),
  then: actions([Requesting.respond, {
    request,
    error,
  }]),
});

export const UnvoteRequest: Sync = (
  { request, user, item },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Upvoting/unvote", user, item },
    { request },
  ]),
  then: actions([Upvoting.unvote, {
    user,
    item,
  }]),
});

export const UnvoteSuccessResponse: Sync = (
  { request },
) => ({
  when: actions([Requesting.request, { path: "/Upvoting/unvote", }, { request }, ],
    [Upvoting.unvote, {}, {}]
  ),
  then: actions([Requesting.respond, {
    request,
    status: "Successfully unvoted",
  }]),
});

export const UnvoteFailureResponse: Sync = (
  { request, error },
) => ({
  when: actions([Requesting.request, { path: "/Upvoting/unvote", }, { request }, ],
    [Upvoting.unvote, {}, {error}]
  ),
  then: actions([Requesting.respond, {
    request,
    error,
  }]),
});
