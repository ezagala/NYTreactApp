import axios from "axios";

export default {
  // Search for articles
  searchArticles: function(articleData) {
    return axios.get("/api/search", articleData); 
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
