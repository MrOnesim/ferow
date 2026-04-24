import Principal "mo:core/Principal";

module {
  /// A single admin entry: principal + role label ("president" or "assistant")
  public type AdminEntry = {
    principal : Principal;
    role : Text;
  };
};
