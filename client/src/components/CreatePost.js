import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      description: "",
      postCategory: ""
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    })
  }

  onSubmit = (e) => {

    e.preventDefault();

    const { topic, description, postCategory } = this.state;

    const data = {
      topic: topic,
      description: description,
      postCategory: postCategory
    }

    console.log(data)

    axios.post("/post/save", data).then((res) => {
      if (res.data.success) {
        this.setState(
          {
            topic: "",
            description: "",
            postCategory: ""
          }
        )
      }
    })

  }

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Create new post</h1>
      </div>
    )
  }
}
