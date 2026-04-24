import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/gallery";
import GalleryLib "../lib/gallery";

mixin (
  accessControlState : AccessControl.AccessControlState,
  photos : List.List<Types.GalleryPhoto>,
) {
  // ── Public query ────────────────────────────────────────────────────────────

  public query func getPhotos(category : ?Text) : async [Types.GalleryPhoto] {
    GalleryLib.getPhotos(photos, category);
  };

  // ── Admin-only updates ──────────────────────────────────────────────────────

  public shared ({ caller }) func createPhoto(
    image : Storage.ExternalBlob,
    category : Text,
    caption : Text,
    display_order : Nat,
  ) : async Types.GalleryPhoto {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create photos");
    };
    GalleryLib.createPhoto(photos, image, category, caption, display_order);
  };

  public shared ({ caller }) func updatePhoto(
    id : Text,
    image : Storage.ExternalBlob,
    category : Text,
    caption : Text,
    display_order : Nat,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update photos");
    };
    GalleryLib.updatePhoto(photos, id, image, category, caption, display_order);
  };

  public shared ({ caller }) func deletePhoto(id : Text) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete photos");
    };
    GalleryLib.deletePhoto(photos, id);
  };
};
