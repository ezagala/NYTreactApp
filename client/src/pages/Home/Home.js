import React, { Component } from "react";
import DatePicker from 'react-date-picker';
import moment from 'moment';
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, SearchBtn } from "../../components/Form";

class Home extends Component {
    state = {
        articles: [],
        topic: "",
        startDate: '',
        endDate: ''
    };

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = (data) => {
        // parse and render response from the API here 
        console.log(data);
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

    onStartDateChange = startDate => this.setState({ startDate })
    onEndDateChange = endDate => this.setState({ endDate })

    handleFormSubmit = event => {
        event.preventDefault();

        // Call to the NYT API 
        console.log(`
        The topic is ${this.state.topic}
        startDate is ${this.state.startDate}
        endDate is ${this.state.endDate}
        `)

        if (this.state.topic && this.state.startDate) {
        API.searchArticles({
            topic: this.state.topic,
            startDate: moment(this.state.startDate).format("YYYYMMDD"),
            endDate: moment(this.state.endDate).format("YYYYMMDD")
        })
            .then(res => { 
                const artArray = res.data.response.docs
                this.loadArticles(artArray); 
            })
            .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <h1>Search</h1>
                        <hr />
                        <form>
                            <Input
                                value={this.state.topic}
                                onChange={this.handleInputChange}
                                name="topic"
                                placeholder="Topic (required)"
                            />
                            <DatePicker
                                value={this.state.startDate}
                                onChange={this.onStartDateChange}
                                name="startDate"
                                style={{ marginBottom: 10, marginRight: 15 }}
                            />
                            <DatePicker
                                value={this.state.endDate}
                                onChange={this.onEndDateChange}
                                name="endDate"
                            />
                            <SearchBtn
                                disabled={!(this.state.topic && this.state.startDate)}
                                onClick={this.handleFormSubmit}
                            >
                                Search
                            </SearchBtn>
                        </form>
                    </Col>
                    <Col size="md-6 sm-12">
                        <h1>Results</h1>
                        <hr />
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
