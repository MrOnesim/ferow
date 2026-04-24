import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";

module {
  public type AcState = AccessControl.AccessControlState;

  /// Returns (Principal, roleText) tuples for every admin in the state.
  public func getAdminList(state : AcState) : [(Principal, Text)] {
    state.userRoles.entries()
      .filter(func((_, role)) { role == #admin })
      .map<(Principal, AccessControl.UserRole), (Principal, Text)>(
        func((p, _)) { (p, "admin") }
      )
      .toArray()
  };

  /// Returns the count of principals currently holding the admin role.
  public func adminCount(state : AcState) : Nat {
    state.userRoles.entries()
      .filter(func((_, role)) { role == #admin })
      .size()
  };

  /// Assigns the assistant admin role to `target`.
  /// Traps if: caller is not the president, total admin count would exceed 2,
  /// or target is already an admin.
  public func addAssistantAdmin(
    state : AcState,
    presidentPrincipal : ?Principal,
    caller : Principal,
    target : Principal,
  ) : () {
    let president = switch (presidentPrincipal) {
      case (?p) p;
      case (null) Runtime.trap("No president set — call _initializeAccessControl first");
    };
    if (not Principal.equal(caller, president)) {
      Runtime.trap("Unauthorized: only the president can add an assistant admin");
    };
    if (adminCount(state) >= 2) {
      Runtime.trap("Max admins reached: only 2 admin accounts are allowed");
    };
    if (AccessControl.isAdmin(state, target)) {
      Runtime.trap("Target is already an admin");
    };
    state.userRoles.add(target, #admin);
  };

  /// Revokes the admin role from `target`.
  /// Traps if: caller is not the president, or target is the president.
  public func removeAssistantAdmin(
    state : AcState,
    presidentPrincipal : ?Principal,
    caller : Principal,
    target : Principal,
  ) : () {
    let president = switch (presidentPrincipal) {
      case (?p) p;
      case (null) Runtime.trap("No president set — call _initializeAccessControl first");
    };
    if (not Principal.equal(caller, president)) {
      Runtime.trap("Unauthorized: only the president can remove an assistant admin");
    };
    if (Principal.equal(target, president)) {
      Runtime.trap("Cannot remove the president's admin role");
    };
    state.userRoles.add(target, #user);
  };

  /// Returns the principal of the first admin (the president).
  public func getPresidentPrincipal(presidentPrincipal : ?Principal) : ?Principal {
    presidentPrincipal
  };

  /// Registers caller as president. Traps if already set, or caller is not admin.
  public func registerAsPresident(
    state : AcState,
    presidentHolder : { var value : ?Principal },
    caller : Principal,
  ) : () {
    switch (presidentHolder.value) {
      case (?_) Runtime.trap("President already registered");
      case (null) {};
    };
    if (not AccessControl.isAdmin(state, caller)) {
      Runtime.trap("Unauthorized: only an admin can register as president");
    };
    presidentHolder.value := ?caller;
  };
};
