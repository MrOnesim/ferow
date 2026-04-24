import AccessControl "mo:caffeineai-authorization/access-control";
import AdminAccessLib "../lib/admin-access";

mixin (
  accessControlState : AccessControl.AccessControlState,
  presidentPrincipal : { var value : ?Principal },
) {

  /// Returns the list of all current admins with their role labels.
  public shared query func getAdminList() : async [(Principal, Text)] {
    AdminAccessLib.getAdminList(accessControlState)
  };

  /// Assigns the assistant-admin role to the given principal.
  /// Only the president may call this; max 2 admins total enforced.
  public shared ({ caller }) func addAssistantAdmin(target : Principal) : async () {
    AdminAccessLib.addAssistantAdmin(
      accessControlState,
      presidentPrincipal.value,
      caller,
      target,
    );
  };

  /// Revokes the admin role from the given principal.
  /// Only the president may call this; the president cannot remove themselves.
  public shared ({ caller }) func removeAssistantAdmin(target : Principal) : async () {
    AdminAccessLib.removeAssistantAdmin(
      accessControlState,
      presidentPrincipal.value,
      caller,
      target,
    );
  };

  /// Returns the original president's principal ID.
  public shared query func getPresidentPrincipal() : async ?Principal {
    AdminAccessLib.getPresidentPrincipal(presidentPrincipal.value)
  };

  /// Registers the caller as president. Only works when caller is admin and no president is set yet.
  public shared ({ caller }) func _registerAsPresident() : async () {
    AdminAccessLib.registerAsPresident(accessControlState, presidentPrincipal, caller);
  };
};
