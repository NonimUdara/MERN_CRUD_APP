import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from 'axios';

export default class Home extends Component {
constructor(props){
    super(props);

    this.state={
      posts:[]
    };

  }

  componentDidMount(){
    this.retrievePosts();
  }

  retrievePosts(){
    axios.get("/posts").then(res =>{
      if(res.data.success){
        this.setState({
          posts:res.data.existingPosts
        });

        console.log(this.state.posts);
      }
    });
  }

  onDelete = (id) =>{
    axios.delete(`/post/delete/${id}`).then((res) =>{
      alert("Delete Successfully");
      this.retrievePosts();
    })
  }

  filterData(posts,searchKey){

  const result = posts.filter((post) =>
   post.topic.toLowerCase().includes(searchKey) ||
   post.description.toLowerCase().includes(searchKey) ||
   post.postCategory.toLowerCase().includes(searchKey) ||
   post.topic.toUpperCase().includes(searchKey) ||
   post.description.toUpperCase().includes(searchKey) ||
   post.postCategory.toUpperCase().includes(searchKey)
  )

  this.setState({posts:result})

  }

  handleSearchArea = (e) =>{

    const searchKey = e.currentTarget.value;

    axios.get("/posts").then(res =>{
      if(res.data.success){
        
        this.filterData(res.data.existingPosts,searchKey)

      }    
    });
  }

  

  render() {
    return (
      <div className="container">
        Home
      </div>
    )
  }
};
