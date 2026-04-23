import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Article = {
    id : Nat;
    title : Text;
    content : Text;
    excerpt : Text;
    image : Storage.ExternalBlob;
    category : Text;
    created_at : Int;
    published : Bool;
  };

  public type JoinSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    city : Text;
    submitted_at : Int;
  };
};
