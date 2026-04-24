import List "mo:core/List";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/gallery";

module {
  var nextId : Nat = 0;

  public func createPhoto(
    photos : List.List<Types.GalleryPhoto>,
    image : Storage.ExternalBlob,
    category : Text,
    caption : Text,
    display_order : Nat,
  ) : Types.GalleryPhoto {
    if (caption.size() > 200) {
      Runtime.trap("Caption must be 200 characters or fewer");
    };
    nextId += 1;
    let photo : Types.GalleryPhoto = {
      id = nextId.toText();
      image;
      category;
      caption;
      display_order;
      created_at = Time.now();
    };
    photos.add(photo);
    photo;
  };

  public func updatePhoto(
    photos : List.List<Types.GalleryPhoto>,
    id : Text,
    image : Storage.ExternalBlob,
    category : Text,
    caption : Text,
    display_order : Nat,
  ) : Bool {
    if (caption.size() > 200) {
      Runtime.trap("Caption must be 200 characters or fewer");
    };
    switch (photos.findIndex(func(p) { p.id == id })) {
      case null { false };
      case (?idx) {
        let existing = photos.at(idx);
        photos.put(idx, { existing with image; category; caption; display_order });
        true;
      };
    };
  };

  public func deletePhoto(photos : List.List<Types.GalleryPhoto>, id : Text) : Bool {
    switch (photos.findIndex(func(p) { p.id == id })) {
      case null { false };
      case (?idx) {
        // Shift remaining elements left by overwriting the target slot
        let size = photos.size();
        var i = idx;
        while (i + 1 < size) {
          photos.put(i, photos.at(i + 1));
          i += 1;
        };
        ignore photos.removeLast();
        true;
      };
    };
  };

  // Returns photos sorted by display_order ascending.
  // Pass null for category to return all photos; pass ?category to filter.
  public func getPhotos(
    photos : List.List<Types.GalleryPhoto>,
    category : ?Text,
  ) : [Types.GalleryPhoto] {
    let filtered : List.List<Types.GalleryPhoto> = switch (category) {
      case null { photos };
      case (?cat) { photos.filter(func(p) { p.category == cat }) };
    };
    let arr = filtered.toArray();
    arr.sort(func(a, b) { Nat.compare(a.display_order, b.display_order) });
  };
};
