import Int "mo:core/Int";
import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/articles-and-submissions";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public func getPublishedArticles(articles : List.List<Types.Article>) : [Types.Article] {
    articles.filter(func(a) { a.published }).toArray();
  };

  public func getArticleById(articles : List.List<Types.Article>, id : Nat) : ?Types.Article {
    articles.find(func(a) { a.id == id });
  };

  public func getRecentArticles(articles : List.List<Types.Article>, limit : Nat) : [Types.Article] {
    let published = articles.filter(func(a) { a.published });
    let sorted = published.sort(func(a, b) {
      if (a.created_at > b.created_at) { #less }
      else if (a.created_at < b.created_at) { #greater }
      else { #equal }
    });
    sorted.toArray().sliceToArray(0, Int.fromNat(limit));
  };

  public func createArticle(
    articles : List.List<Types.Article>,
    title : Text,
    content : Text,
    excerpt : Text,
    image : Storage.ExternalBlob,
    category : Text,
  ) : Types.Article {
    let now = Time.now();
    let id : Nat = Int.abs(now);
    let article : Types.Article = {
      id;
      title;
      content;
      excerpt;
      image;
      category;
      created_at = now;
      published = false;
    };
    articles.add(article);
    article;
  };

  public func updateArticle(
    articles : List.List<Types.Article>,
    id : Nat,
    title : Text,
    content : Text,
    excerpt : Text,
    image : Storage.ExternalBlob,
    category : Text,
  ) : Bool {
    var found = false;
    articles.mapInPlace(func(a) {
      if (a.id == id) {
        found := true;
        { a with title; content; excerpt; image; category }
      } else { a }
    });
    found;
  };

  public func deleteArticle(articles : List.List<Types.Article>, id : Nat) : Bool {
    let before = articles.size();
    let filtered = articles.filter(func(a) { a.id != id });
    articles.clear();
    articles.append(filtered);
    articles.size() < before;
  };

  public func togglePublished(articles : List.List<Types.Article>, id : Nat) : Bool {
    var found = false;
    articles.mapInPlace(func(a) {
      if (a.id == id) {
        found := true;
        { a with published = not a.published }
      } else { a }
    });
    found;
  };

  public func getAllArticles(articles : List.List<Types.Article>) : [Types.Article] {
    articles.toArray();
  };

  public func submitJoinForm(
    submissions : List.List<Types.JoinSubmission>,
    name : Text,
    email : Text,
    phone : Text,
    city : Text,
  ) : Types.JoinSubmission {
    let now = Time.now();
    let id : Nat = Int.abs(now);
    let submission : Types.JoinSubmission = {
      id;
      name;
      email;
      phone;
      city;
      submitted_at = now;
    };
    submissions.add(submission);
    submission;
  };

  public func getJoinSubmissions(submissions : List.List<Types.JoinSubmission>) : [Types.JoinSubmission] {
    submissions.toArray();
  };
};
