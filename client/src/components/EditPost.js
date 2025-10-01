import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

 class EditPost extends Component {

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
    const { id } = this.props.params;
    const data = {
      topic: topic,
      description: description,
      postCategory: postCategory
    }

   

    axios.put("/post/update/"+id, data).then((res) => {
      console.log(data)
      if (res.data.success) {
        alert("Post Updated Successfully");
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

  componentDidMount() {

    const { id } = this.props.params;

    axios.get("/post/"+id).then((res) => {
      if (res.data.success) {
        this.setState({
          topic:res.data.post.topic,
          description:res.data.post.description,
          postCategory:res.data.post.postCategory
        });

        console.log(this.state.post);
      }
    });
  }

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Edit post</h1>
      </div>
    )
  }
}
export default (props) => (
  <EditPost
      {...props}
      params={useParams()}
  />
);