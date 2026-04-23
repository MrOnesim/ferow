import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import ArticlesMixin "mixins/articles-and-submissions-api";
import Types "types/articles-and-submissions";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinObjectStorage();

  let articles = List.empty<Types.Article>();
  let submissions = List.empty<Types.JoinSubmission>();

  include ArticlesMixin(accessControlState, articles, submissions);
};
