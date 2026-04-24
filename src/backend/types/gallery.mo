import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type GalleryPhoto = {
    id : Text;
    image : Storage.ExternalBlob;
    category : Text; // one of: Événements, Formations, Actions Sociales, Leadership
    caption : Text;  // max 200 chars
    display_order : Nat;
    created_at : Int;
  };
};
