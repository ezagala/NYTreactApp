import axios from "axios";

export default {
  // Search for articles
  searchArticles: function(data) {
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    queryURL += "?api-key=fdc18b9b249f467aa2f64b5312a76fad";
    queryURL += "&q=" + data.topic;
    queryURL += "&begin_date=" + data.startDate;
    queryURL += "&end_date=" + data.endDate;
    return axios.get(queryURL)
  },
  // Gets all
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets w/ specific id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes w/ specific id 
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves to the DB 
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
