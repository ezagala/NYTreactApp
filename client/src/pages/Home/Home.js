import React, { Component } from "react";
import DatePicker from 'react-date-picker';
import moment from 'moment';
import SaveBtn from "../../components/SaveBtn";
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

    loadArticles = data => {
        // Data cannont be undefined b/c this is fired when the component mounts    
        if (data) {
            this.setState({ articles: data });
            console.log("State.articles upated to: ", this.state.articles);
        }
        
    };

    saveArticle = id => {
        // Define payload
        const newArticle = {};
        // Loop through current articles and build out the payload 
        this.state.articles.forEach(x => {
            if (x._id === id) {
                newArticle.nytId = x._id;
                newArticle.title = x.headline.main;
                newArticle.date = x.pub_date;
                newArticle.url = x.web_url;
            }
        })
        // Send off the payload to be saved, then remove the article from the list
        API.saveArticle(newArticle)
            .then(res => {
                this.state.articles.forEach(x => {
                    if (x._id === res.data.nytId) {
                        this.state.articles.splice(this.state.articles.indexOf(x), 1);
                        return this.loadArticles(this.state.articles)
                    }
                })
                
            })
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
                                        <a href={article.web_url}>
                                            <strong>
                                                {article.headline.main}
                                            </strong>
                                        </a>
                                        <SaveBtn onClick={() => this.saveArticle(article._id)} />
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
