// These two help you declare synchronizations
import { actions, Sync } from "@engine";
// Choose whatever concepts you have. Assuming PostingConcept and CommentingConcept
// are available and have the necessary actions/queries based on the spec and examples.
import { Requesting, Tagging } from "@concepts";


export const AddTagRequest: Sync = (
  { request, user, label, book },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Tagging/addTag", user, label, book },
    { request },
  ]),
  then: actions([Tagging.addTag, {
    user,
    label,
    book
  }]),
});

export const AddTagSuccessResponse: Sync = (
  { request, tag },
) => ({
  when: actions([Requesting.request, { path: "/Tagging/addTag", }, { request }, ],
    [Tagging.addTag, {}, {tag}]
  ),
  then: actions([Requesting.respond, {
    request,
    tag,
  }]),
});

export const AddTagFailureResponse: Sync = (
  { request, error },
) => ({
  when: actions([Requesting.request, { path: "/Tagging/addTag", }, { request }, ],
    [Tagging.addTag, {}, {error}]
  ),
  then: actions([Requesting.respond, {
    request,
    error,
  }]),
});

export const RemoveTag: Sync = (
  { request, tag },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Tagging/removeTag", tag },
    { request },
  ]),
  then: actions([Tagging.removeTag, {
    tag
  }]),
});

export const RemoveTagSuccessResponse: Sync = (
  { request },
) => ({
  when: actions([Requesting.request, { path: "/Tagging/removeTag", }, { request }, ],
    [Tagging.removeTag, {}, {}]
  ),
  then: actions([Requesting.respond, {
    request,
    status: "Successfully removed tag",
  }]),
});

export const RemoveTagFailureResponse: Sync = (
  { request, error },
) => ({
  when: actions([Requesting.request, { path: "/Tagging/removeTag", }, { request }, ],
    [Tagging.removeTag, {}, {error}]
  ),
  then: actions([Requesting.respond, {
    request,
    error,
  }]),
});

export const MarkPrivateRequest: Sync = (
  { request, tag },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Tagging/markPrivate", tag },
    { request },
  ]),
  then: actions([Tagging.markPrivate, {
    tag
  }]),
});

export const MarkPrivateSuccessResponse: Sync = (
  { request },
) => ({
  when: actions([Requesting.request, { path: "/Tagging/markPrivate", }, { request }, ],
    [Tagging.markPrivate, {}, {}]
  ),
  then: actions([Requesting.respond, {
    request,
    status: "Successfully marked tag private",
  }]),
});

export const MarkPrivateFailureResponse: Sync = (
  { request, error },
) => ({
  when: actions([Requesting.request, { path: "/Tagging/markPrivate", }, { request }, ],
    [Tagging.markPrivate, {}, {error}]
  ),
  then: actions([Requesting.respond, {
    request,
    error,
  }]),
});

export const MarkPublicRequest: Sync = (
  { request, tag },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Tagging/markPublic", tag },
    { request },
  ]),
  then: actions([Tagging.markPublic, {
    tag
  }]),
});

export const MarkPublicSuccessResponse: Sync = (
  { request },
) => ({
  when: actions([Requesting.request, { path: "/Tagging/markPublic", }, { request }, ],
    [Tagging.markPublic, {}, {}]
  ),
  then: actions([Requesting.respond, {
    request,
    status: "Successfully marked tag public",
  }]),
});

export const MarkPublicFailureResponse: Sync = (
  { request, error },
) => ({
  when: actions([Requesting.request, { path: "/Tagging/markPublic", }, { request }, ],
    [Tagging.markPublic, {}, {error}]
  ),
  then: actions([Requesting.respond, {
    request,
    error,
  }]),
});
