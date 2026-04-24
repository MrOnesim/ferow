import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import ArticlesMixin "mixins/articles-and-submissions-api";
import AdminAccessMixin "mixins/admin-access-api";
import Types "types/articles-and-submissions";

actor {
  let accessControlState = AccessControl.initState();
  include MixinObjectStorage();
  include MixinAuthorization(accessControlState);

  // Tracks the president principal (set by _registerAsPresident after initialization).
  let presidentHolder = { var value : ?Principal = null };

  let articles = List.empty<Types.Article>();
  let submissions = List.empty<Types.JoinSubmission>();

  include ArticlesMixin(accessControlState, articles, submissions);
  include AdminAccessMixin(accessControlState, presidentHolder);
};
