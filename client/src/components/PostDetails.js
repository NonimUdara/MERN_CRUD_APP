import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

class PostDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            post:{}
        };
    }

    componentDidMount(){
        
      const { id } = this.props.params;

         axios.get("/post/"+id).then((res) =>{
             if(res.data.success){
                 this.setState({
                     post:res.data.post
                 });

                 console.log(this.state.post);
             }
         });
    }

    

  render() {

     const {topic,description,postCategory} = this.state.post;

    return (
      <div style={{marginTop:'20px'}}>
        Post Details
       </div> 
    )
  }


}

export default (props) => (
  <PostDetails
      {...props}
      params={useParams()}
  />
);