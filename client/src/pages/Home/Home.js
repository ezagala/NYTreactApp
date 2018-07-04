import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, SearchBtn } from "../../components/Form";

class Home extends Component {
    state = {
        articles: [],
        topic: "",
        startDate: null,
        endDate: null
    };

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = () => {
        API.getArticles()
            .then(res =>
                this.setState({ articles: res.data, title: "", date: null, url: "" })
            )
            .catch(err => console.log(err));
    };

    deleteArticle = id => {
        API.deleteArticle(id)
            .then(res => this.loadArticles())
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        // This is where I'll handle the request to NYT's API
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <h1>Search</h1>
                        <form>
                            <Input
                                value={this.state.topic}
                                onChange={this.handleInputChange}
                                name="topic"
                                placeholder="Topic (required)"
                            />
                            <Input
                                value={this.state.startDate}
                                onChange={this.handleInputChange}
                                name="startDate"
                                placeholder="Start Date (required)"
                            />
                            <Input
                                value={this.state.endDate}
                                onChange={this.handleInputChange}
                                name="endDate"
                                placeholder="End Date"
                            />
                            <SearchBtn
                                disabled={!(this.state.topic && this.state.startDate)}
                                onClick={this.handleFormSubmit}
                            >
                                Search
                            </SearchBtn>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-6 sm-12">
                        <h1>Results</h1>
                        {this.state.articles.length ? (
                            <List>
                                {this.state.articles.map(article => (
                                    <ListItem key={article._id}>
                                        <Link to={"/articles/" + article._id}>
                                            <strong>
                                                {article.title}
                                            </strong>
                                        </Link>
                                        <DeleteBtn onClick={() => this.deleteBook(article._id)} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h3>No Results to Display</h3>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;
