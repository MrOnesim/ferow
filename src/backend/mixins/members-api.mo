import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/members";
import MembersLib "../lib/members";

mixin (
  accessControlState : AccessControl.AccessControlState,
  members : List.List<Types.Member>,
) {
  // ── Public query ─────────────────────────────────────────────────────────────

  public query func getMembers() : async [Types.Member] {
    MembersLib.getMembers(members);
  };

  // ── Admin-only updates ────────────────────────────────────────────────────────

  public shared ({ caller }) func createMember(
    name : Text,
    title : Text,
    bio : Text,
    photo : Storage.ExternalBlob,
    display_order : Nat,
  ) : async Types.Member {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create members");
    };
    MembersLib.createMember(members, name, title, bio, photo, display_order);
  };

  public shared ({ caller }) func updateMember(
    id : Text,
    name : Text,
    title : Text,
    bio : Text,
    photo : Storage.ExternalBlob,
    display_order : Nat,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update members");
    };
    MembersLib.updateMember(members, id, name, title, bio, photo, display_order);
  };

  public shared ({ caller }) func deleteMember(id : Text) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete members");
    };
    MembersLib.deleteMember(members, id);
  };
};
