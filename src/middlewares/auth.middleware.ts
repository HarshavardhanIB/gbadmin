import { AuthorizationContext, AuthorizationDecision, AuthorizationMetadata } from '@loopback/authorization';
import { securityId, UserProfile } from '@loopback/security';

import _ from 'lodash';

// Instance level authorizer
// Can be also registered as an authorizer, depends on users' need.
export async function basicAuthorization(
  authorizationCtx: AuthorizationContext,
  metadata: AuthorizationMetadata,
): Promise<AuthorizationDecision> {
  console.log("entere>>> basic authorization");
  // No access if authorization details are missing
  let currentUser: UserProfile;
  if (authorizationCtx.principals.length > 0) {
    const user = _.pick(authorizationCtx.principals[0], [
      'id',
      'name',
      'role',
    ]);
    console.log(user);
    currentUser = { [securityId]: user.id, name: user.name, role: user.role };
    console.log(currentUser);
  } else {
    return AuthorizationDecision.DENY;
  }
  console.log(">> metadata")
  console.log(metadata.allowedRoles);
  console.log(">> current")
  console.log(currentUser.role)
  if (!currentUser.role) {
    return AuthorizationDecision.DENY;
  }

  // Authorize everything that does not have a allowedRoles property
  if (!metadata.allowedRoles) {
    return AuthorizationDecision.ALLOW;
  }
  console.log(">> metadata")
  console.log(metadata.allowedRoles);
  console.log(">> current")
  console.log(currentUser.role)
  let roleIsAllowed = false;
  if (metadata.allowedRoles!.includes(currentUser.role)) {
    roleIsAllowed = true;
  }

  if (!roleIsAllowed) {
    return AuthorizationDecision.DENY;
  }
  return AuthorizationDecision.ALLOW;
}
