// These two help you declare synchronizations
import { actions, Sync } from "@engine";
// Choose whatever concepts you have. Assuming PostingConcept and CommentingConcept
// are available and have the necessary actions/queries based on the spec and examples.
import { Requesting, Shelving } from "@concepts";


export const AddBookRequest: Sync = (
  { request, user, status, book },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Shelving/addBook", user, status, book },
    { request },
  ]),
  then: actions([Shelving.addBook, {
    user,
    status,
    book
  }]),
});

export const AddBookSuccessResponse: Sync = (
  { request, shelf },
) => ({
  when: actions([Requesting.request, { path: "/Shelving/addBook", }, { request }, ],
    [Shelving.addBook, {}, {shelf}]
  ),
  then: actions([Requesting.respond, {
    request,
    shelf,
  }]),
});

export const AddBookFailureResponse: Sync = (
  { request, error },
) => ({
  when: actions([Requesting.request, { path: "/Shelving/addBook", }, { request }, ],
    [Shelving.addBook, {}, {error}]
  ),
  then: actions([Requesting.respond, {
    request,
    error,
  }]),
});

export const RemoveBookRequest: Sync = (
  { request, shelf },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Shelving/removeBook", shelf },
    { request },
  ]),
  then: actions([Shelving.removeBook, {
    shelf
  }]),
});

export const RemoveBookSuccessResponse: Sync = (
  { request, },
) => ({
  when: actions([Requesting.request, { path: "/Shelving/removeBook", }, { request }, ],
    [Shelving.removeBook, {}, {}]
  ),
  then: actions([Requesting.respond, {
    request,
    status: "Book successfully removed from shelf",
  }]),
});

export const RemoveBookFailureResponse: Sync = (
  { request, error },
) => ({
  when: actions([Requesting.request, { path: "/Shelving/removeBook", }, { request }, ],
    [Shelving.removeBook, {}, {error}]
  ),
  then: actions([Requesting.respond, {
    request,
    error,
  }]),
});

export const ChangeStatusRequest: Sync = (
  { request, shelf, newStatus },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Shelving/changeStatus", shelf, newStatus },
    { request },
  ]),
  then: actions([Shelving.changeStatus, {
    shelf, newStatus
  }]),
});

export const ChangeStatusSuccessResponse: Sync = (
  { request },
) => ({
  when: actions([Requesting.request, { path: "/Shelving/changeStatus", }, { request }, ],
    [Shelving.changeStatus, {}, {}]
  ),
  then: actions([Requesting.respond, {
    request,
    status: "Successfully changed book's shelf",
  }]),
});

export const ChangeStatusFailureResponse: Sync = (
  { request, error },
) => ({
  when: actions([Requesting.request, { path: "/Shelving/changeStatus", }, { request }, ],
    [Shelving.changeStatus, {}, {error}]
  ),
  then: actions([Requesting.respond, {
    request,
    error,
  }]),
});
