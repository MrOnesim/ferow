import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Member = {
    id : Text;
    name : Text;
    title : Text;
    bio : Text;
    photo : Storage.ExternalBlob;
    display_order : Nat;
    created_at : Int;
  };
};
