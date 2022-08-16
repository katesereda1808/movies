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
                  date: (new Date()).toDateString(),
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
                const newArr = this.state.comments.filter(comment => comment.movieId === this.props.movieId);
                console.log()
                    return (
                        <div className={s.comments}>
                            <div className={s.comments_box}>
         
                                {this.state.comments.length>0?
                                    
                                    newArr.map(comment => <div key={comment.id}>
                                    {/* this.newArr.map(comment => <div key={comment.id}> */}
                                    <div className={s.comment_content}>
                                        <div>
                                            <div className={s.name}>
                                                {comment.name}
                                            </div>
                                            <div className={s.date}>
                                                {comment.date}
                                            </div>

                                        </div>
                                        
                                        
                                        <div className={s.comment_text}>
                                            {comment.comment}
                                        </div>
                            
                                        <button className={s.button} onClick={this.removeComment.bind(null, comment.id)}>delete</button>
                                        </div>

                                    </div>
                                    
                                    ):
                                    <></>
                                }

                            

                            </div>
                            <div className={s.newComment}>

                            
                                <input placeholder='Имя пользователя'

                                type="text"

                                value={this.state.form.name}

                                name="name"

                                onChange={this.handleChange} />

                            <textarea

                                name="comment"

                                value={this.state.form.comment}

                                onChange={this.handleChange}></textarea>

                        

                            <button className={s.button} onClick={()=>this.addComment(this.props.movieId)}>send</button>

                            </div>

                        </div>
           
                      
                    )
                  }
                
            
        
}
export default Comments


