import Int "mo:core/Int";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/members";

module {
  public func getMembers(members : List.List<Types.Member>) : [Types.Member] {
    let sorted = members.sort(func(a, b) {
      if (a.display_order < b.display_order) { #less }
      else if (a.display_order > b.display_order) { #greater }
      else { #equal }
    });
    sorted.toArray();
  };

  public func createMember(
    members : List.List<Types.Member>,
    name : Text,
    title : Text,
    bio : Text,
    photo : Storage.ExternalBlob,
    display_order : Nat,
  ) : Types.Member {
    if (name.size() == 0) { Runtime.trap("name is required") };
    if (title.size() == 0) { Runtime.trap("title is required") };
    if (bio.size() > 500) { Runtime.trap("bio must be at most 500 characters") };
    let now = Time.now();
    let id : Text = Int.toText(now);
    let member : Types.Member = {
      id;
      name;
      title;
      bio;
      photo;
      display_order;
      created_at = now;
    };
    members.add(member);
    member;
  };

  public func updateMember(
    members : List.List<Types.Member>,
    id : Text,
    name : Text,
    title : Text,
    bio : Text,
    photo : Storage.ExternalBlob,
    display_order : Nat,
  ) : Bool {
    if (name.size() == 0) { Runtime.trap("name is required") };
    if (title.size() == 0) { Runtime.trap("title is required") };
    if (bio.size() > 500) { Runtime.trap("bio must be at most 500 characters") };
    var found = false;
    members.mapInPlace(func(m) {
      if (m.id == id) {
        found := true;
        { m with name; title; bio; photo; display_order }
      } else { m }
    });
    found;
  };

  public func deleteMember(members : List.List<Types.Member>, id : Text) : Bool {
    let before = members.size();
    let filtered = members.filter(func(m) { m.id != id });
    members.clear();
    members.append(filtered);
    members.size() < before;
  };
};
