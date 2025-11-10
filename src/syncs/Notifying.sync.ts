// These two help you declare synchronizations
import { actions, Sync } from "@engine";
// Choose whatever concepts you have. Assuming PostingConcept and CommentingConcept
// are available and have the necessary actions/queries based on the spec and examples.
import { Requesting, Notifying } from "@concepts";


export const MarkReadRequest: Sync = (
  { request, notification },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Notifying/read", notification, },
    { request },
  ]),
  then: actions([Notifying.read, {
    notification,
  }]),
});

export const MarkReadSuccessResponse: Sync = (
  { request, notification },
) => ({
  when: actions([Requesting.request, { path: "/Notifying/read", notification, }, { request }],
    [Notifying.read, {}, {}]
  ),
  then: actions([Requesting.respond, {
    request,
    status: "Notification successfully read"
  }]),
});

export const MarkReadErrorResponse: Sync = (
  { request, notification, error },
) => ({
  when: actions([Requesting.request, { path: "/Notifying/read", notification, }, { request }],
    [Notifying.read, {}, {error}]
  ),
  then: actions([Requesting.respond, {
    request,
    error
  }]),
});
