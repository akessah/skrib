// import { actions, Sync } from "@engine";
// import { Requesting, Sessioning, Authentication } from "@concepts";

// //-- User Registration --//

// export const RegisterRequest: Sync = ({ request, username, password }) => ({
//   when: actions([
//     Requesting.request,
//     { path: "/AuthenticationConcept/register", username, password },
//     { request },
//   ]),
//   then: actions([Authentication.register, { username, password }]),
// });

// export const RegisterResponseSuccess: Sync = ({ request, user }) => ({
//   when: actions(
//     [Requesting.request, { path: "/AuthenticationConcept/register" }, { request }],
//     [Authentication.register, {}, { user }],
//   ),
//   then: actions([Requesting.respond, { request, user }]),
// });

// export const RegisterResponseError: Sync = ({ request, error }) => ({
//   when: actions(
//     [Requesting.request, { path: "/AuthenticationConcept/register" }, { request }],
//     [Authentication.register, {}, { error }],
//   ),
//   then: actions([Requesting.respond, { request, error }]),
// });

// //-- User Login & Session Creation (Composite Action) --//

// export const LoginRequest: Sync = ({ request, username, password }) => ({
//   when: actions([
//     Requesting.request,
//     { path: "/AuthenticationConcept/authenticate", username, password },
//     { request },
//   ]),
//   then: actions([Authentication.authenticate, { username, password }]),
// });

// // When a login is successful, automatically create a session for that user.
// export const LoginSuccessCreatesSession: Sync = ({ user }) => ({
//   when: actions([Authentication.authenticate, {}, { user }]),
//   then: actions([Sessioning.create, { user }]),
// });

// // Once the session is created, respond to the original login request with the session ID.
// export const LoginResponseSuccess: Sync = ({ request, user, session }) => ({
//   when: actions(
//     [Requesting.request, { path: "/AuthenticationConcept/authenticate" }, { request }],
//     [Authentication.authenticate, {}, { user }],
//     // This action was caused by the login action above.
//     [Sessioning.create, { user }, { session }],
//   ),
//   then: actions([Requesting.respond, { request, session }]),
// });

// export const LoginResponseError: Sync = ({ request, error }) => ({
//   when: actions(
//     [Requesting.request, { path: "/AuthenticationConcept/authenticate" }, { request }],
//     [Authentication.authenticate, {}, { error }],
//   ),
//   then: actions([Requesting.respond, { request, error }]),
// });

// //-- User Logout --//

// export const LogoutRequest: Sync = ({ request, session, user }) => ({
//   when: actions([
//     Requesting.request,
//     { path: "/logout", session },
//     { request },
//   ]),
//   where: (frames) => {
//     // Authorize the request: a valid session must exist.
//     // The 'user' is bound but not used in 'then', just for validation.
//     return frames.query(Sessioning._getUser, { session }, { user });
//   },
//   then: actions([Sessioning.delete, { session }]),
// });

// export const LogoutResponse: Sync = ({ request }) => ({
//   when: actions(
//     [Requesting.request, { path: "/logout" }, { request }],
//     [Sessioning.delete, {}, {}],
//   ),
//   then: actions([Requesting.respond, { request, status: "logged_out" }]),
// });
