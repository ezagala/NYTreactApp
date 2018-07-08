import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Link } from "react-router-dom";
import DeleteBtn from "../../components/DeleteBtn";

class Saved extends Component {
  state = {
    articles: []
  }

  componentDidMount() {
    this.loadArticles();
    
  }

  loadArticles = () => {
    API.getArticles()
      .then(res => this.setState({ articles: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };



  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6 sm-12">
            <h1>Saved Articles</h1>
            <hr />
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={article.url}>
                      <strong>
                        {article.title}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    )
  };
}

export default Saved;
