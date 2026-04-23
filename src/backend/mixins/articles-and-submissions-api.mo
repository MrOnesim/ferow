import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/articles-and-submissions";
import ArticlesLib "../lib/articles-and-submissions";

mixin (
  accessControlState : AccessControl.AccessControlState,
  articles : List.List<Types.Article>,
  submissions : List.List<Types.JoinSubmission>,
) {
  // ── Public queries ──────────────────────────────────────────────────────────

  public query func getPublishedArticles() : async [Types.Article] {
    ArticlesLib.getPublishedArticles(articles);
  };

  public query func getArticleById(id : Nat) : async ?Types.Article {
    ArticlesLib.getArticleById(articles, id);
  };

  public query func getRecentArticles(limit : Nat) : async [Types.Article] {
    ArticlesLib.getRecentArticles(articles, limit);
  };

  // ── Public update ───────────────────────────────────────────────────────────

  public shared func submitJoinForm(name : Text, email : Text, phone : Text, city : Text) : async () {
    ignore ArticlesLib.submitJoinForm(submissions, name, email, phone, city);
  };

  // ── Admin-only updates ──────────────────────────────────────────────────────

  public shared ({ caller }) func createArticle(
    title : Text,
    content : Text,
    excerpt : Text,
    image : Storage.ExternalBlob,
    category : Text,
  ) : async Types.Article {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create articles");
    };
    ArticlesLib.createArticle(articles, title, content, excerpt, image, category);
  };

  public shared ({ caller }) func updateArticle(
    id : Nat,
    title : Text,
    content : Text,
    excerpt : Text,
    image : Storage.ExternalBlob,
    category : Text,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update articles");
    };
    ArticlesLib.updateArticle(articles, id, title, content, excerpt, image, category);
  };

  public shared ({ caller }) func deleteArticle(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete articles");
    };
    ArticlesLib.deleteArticle(articles, id);
  };

  public shared ({ caller }) func togglePublished(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can publish/unpublish articles");
    };
    ArticlesLib.togglePublished(articles, id);
  };

  // ── Admin-only queries ──────────────────────────────────────────────────────

  public query ({ caller }) func getAllArticles() : async [Types.Article] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all articles");
    };
    ArticlesLib.getAllArticles(articles);
  };

  public query ({ caller }) func getJoinSubmissions() : async [Types.JoinSubmission] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view submissions");
    };
    ArticlesLib.getJoinSubmissions(submissions);
  };
};
