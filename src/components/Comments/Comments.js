import React, { Component, useEffect } from 'react'
import s from './Comments.module.css';


class Comments extends Component {
    // const { movieId } = this.props;
    constructor(props){
        super(props);
        
        this.state = {
            comments: [],
            form: {
                name: '',
                comment: ''
            }
    }
    this.addComment = this.addComment.bind(this);
    this.addComment = this.addComment.bind(this);
    
    }

    componentDidMount(){
        if (localStorage.getItem('state')) {
                  this.setState({ ...JSON.parse(localStorage.getItem('state')) })
            
                }
    }

    addComment = (id) => {
     
            this.setState({
              comments: [
                ...this.state.comments,
                {
    
                  id: this.state.comments.length ? this.state.comments.reduce((p, c) => p.id > c.id ? p : c).id + 1 : 1,
     
                  name: this.state.form.name,
     
                  comment: this.state.form.comment,
      
                  date: new Date(),

                  movieId: id,
     
            }
        ],
      
              form: {
       
                name: '',
      
                comment: ''
      
              }
        
            }, () => localStorage.setItem('state', JSON.stringify(this.state)))
        
          }

          removeComment = (id) => {
      
                this.setState({
           
                  comments: this.state.comments.filter(comment => comment.id !== id)
           
                }, () => localStorage.setItem('state', JSON.stringify(this.state)))
          
              }
            
              handleChange = (e) => {
           
                console.log(e.target.name)
          
                this.setState({
          
                  form: {
      
                    ...this.state.form,
           
                    [e.target.name]: e.target.value,
          
                  }
          
                })
              }
              render() {
              
                console.log(this.state.comments)
                    return (
           
                      <div className={s.comments}>
         
                        {this.state.comments.length>0?
                        this.state.comments.map(comment => <div key={comment.id}>
            
                          <span style={{ fontStyle: 'italic' }}>
                            {comment.id} - {(comment.date, 'DD/MM/YYYY')}: 
                            
                            </span>
             
                          <strong>{comment.name}, </strong>
             
                          <span>{comment.comment}</span>
            
                          <button onClick={this.removeComment.bind(null, comment.id)}>Удалить комментарий</button>
               
                        </div>
                        ):
                        <></>}
             
                        <div>
             
                          <label>Имя: <input
            
                            type="text"
            
                            value={this.state.form.name}
           
                            name="name"
             
                            onChange={this.handleChange} /></label>
             
                          <label>Комментарий: <textarea
             
                            name="comment"
           
                            value={this.state.form.comment}
               
                            onChange={this.handleChange}></textarea>
              
                          </label>
             
                          <button onClick={()=>this.addComment(this.props.movieId)}>Добавить комментарий в {this.props.movieId}</button>
           
                        </div>
              
                      </div>
                    )
                  }
                
            
        
}
export default Comments


