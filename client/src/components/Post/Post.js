

import React from 'react'
import { Divider } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import TextField from '@mui/material/TextField';
import { Form, Container } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { trusted } from 'mongoose';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import './Post.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import styled from "styled-components";

import { Link } from 'react-router-dom';

const commentListT = []

const Post = (props) => {
    const [countUp, setCountUp] = useState(0)
    const [clicked, setClicked] = useState(false)
    const [comment, setComment] = useState(false)
    const [commentList, setCommentList] = useState(commentListT);
    const [commentDescription, setCommentDescription] = useState("")
    const [inputImage, setImage] = useState(null);


/*     useEffect(() => {
        setClicked(JSON.parse(window.localStorage.getItem('clicked')));
      }, []);
    
      useEffect(() => {
        window.localStorage.setItem('clicked', clicked);
      }, [clicked]);
     */
      const addComment = (commentInformation) => {
        var data = new FormData()
    
        data.append('commentDescription', commentInformation.CommentDescription)
        data.append('postIndex', props.postInfo.postId)
        data.append('userIndex', props.username)
        console.log(props.postInfo.postId)
        fetch('/UserCreateComment',
          {
            method: 'POST',
            body: data
          }).then((response) => response.json())
    
          .then((result) => {
    
            let commentListNew = commentList
            commentListNew.push(result)

            setCommentList(commentListNew)
            console.log(commentList)
            window.location.reload(false);

          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }

    const updateLikes = (postInformation) => {
        var data = new FormData()
    
        console.log(postInformation.postId)
        console.log(postInformation.postLikes)
        data.append('postId', postInformation.postId)
        data.append('postLikes', postInformation.postLikes)
        fetch('/UpdatePostLikes',
          {
            method: 'POST',
            body: data
          }).then((response) => response.json())
    
          .then((result) => {
            window.location.reload(false);
            
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }

      const updateLikes2 = (postInformation) => {
        var data = new FormData()
    
        console.log(postInformation.postId)
        console.log(postInformation.postLikes)
        data.append('postId', postInformation.postId)
        data.append('postLikes', postInformation.postLikes)
        fetch('/DecreaseLikes',
          {
            method: 'POST',
            body: data
          }).then((response) => response.json())
    
          .then((result) => {
    
            let postLikes = result
            console.log(postLikes)
            window.location.reload(false);
            
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }

      const handleCommentCreate = () => {

        const commentInformation = {
            CommentDescription: commentDescription,
          }
        console.log(props.postInfo.postComments)

          addComment(commentInformation)
          setComment(false)

    }

    const deleteComment = (commentEntry) =>
    {
      console.log("Delete comment!")
      console.log("hello")

  
      let index = -1
      for (let i = 0; i < props.postInfo.postComments.length; i++) {
        if (props.postInfo.postComments[i].commentId == commentEntry.commentId){
            if (props.username == props.postInfo.postComments[i].username) {
                    index = i
                    break
            }
        }
      }
  
      if (index > -1)
      {
        const url = '/DeleteComment?' + new URLSearchParams({ commentId: props.postInfo.postComments[index].commentId, postIndex: props.postInfo.postId }).toString()
  
        fetch(url, {
          method: 'DELETE',
        }).then((response) => response.json())
  
        .then((result) => {
           console.log('Success:', result.returnValue);
           window.location.reload(false);
           window.location.reload(false);

        })
        .catch((error) => {
          console.error('Error:', error);
        });
  
      }
    }
  
      useEffect(() => {
        const getData = async() => {
    
  
          const getPfpURL = '/getUserProfilePic?' + new URLSearchParams({ username:  props.postInfo.username}).toString()

          console.log(props.postInfo.username)
    
           fetch(getPfpURL)
           .then(async (result) => {
             console.log('File retrieval success!');
             let myBlob = await result.blob()
     
              var reader  = new FileReader();
              reader.onload = function(e)  {
                  setImage(e.target.result)
               }
               reader.readAsDataURL(myBlob);
           })
           .catch((error) => {
             console.error('Error:', error);
           });
    
           
        }

    getData()

  }, []);
  

    return (
            <Container className = "Post" >
                <div className = 'row'>
                    <IconButton className = 'row' color="primary" aria-label="profile"  component={Link} to={`/profile/${props.postInfo.username}`}>
                        <Avatar src={inputImage} alt="Profile" />
                     </IconButton>
                    <div className = 'row' style = {{color: 'black', fontWeight: '700', }} > 
                                        {props.postInfo.username} 
                                </div> 

                    <Button className = 'row' onClick={() => {props.deletePost(props.postInfo)}} color = "error" style={{marginLeft: 600}}>
                        <DeleteIcon/>
                    </Button>
                </div>
                    
  
            <Divider component="li" sx={{borderBottomWidth: 2, color: 'purple'}}/>

            <Box sx={{  mb: 0, mx: 'auto', color: "#7150BC",textAlign:"left", borderRadius: '15px' , marginTop: '15'}}>
                <Container style={{marginBottom: '30'}}>
                    <div style = {{color: 'black', fontWeight: 'normal', justifyContent: 'space-between'}} > 
                        {props.postInfo.postDescription} 
                    </div>
                    {props.postInfo.DisplayImage &&                     
                    <img className = "image" sx = {{height: '20', width: '20'}}
                        src={props.postInfo.DisplayImage} /> }

                    
                </Container> 
            </Box>


                <Divider component="li" sx={{marginLeft: '2%', marginRight: '2%', borderBottomWidth: 2}}/>
                <div className='row'>
                    <Button                 
                    onClick={() => 
                        {{if (clicked == false) {updateLikes(props.postInfo); setClicked(true)} else {updateLikes2(props.postInfo); setClicked(false)}}}} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
                        {clicked ? <ThumbUpIcon style = {{color: "black"}}/> : <ThumbUpOffAltIcon style = {{color: "black"}}/>}
                    </Button>
                
                    <div className='row' style = {{color: 'black', fontWeight: '700', marginRight: 15}} > 
                        Like 
                    </div> 

                    <Button   onClick={() => 
                        {{if (comment == false) {setComment(true)} else {setComment(false)}}}} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
                            <CommentIcon style={{color: 'black', marginTop: 2, maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px'}}/>
                    </Button>
                    <div className='row' style = {{color: 'black', fontWeight: '700'}} > 
                        Comment
                    </div> 
                    <Container className = 'row' style = {{color: 'black', fontWeight: 'normal', justifyContent: 'space-between', marginLeft: 700}}>
                     Likes: {props.likes} 
                    </Container>
                    <Divider component="li" sx={{borderBottomWidth: 2}}/>

                    {
                        props.postInfo.postComments && props.postInfo.postComments.map((element) => {
                            return (
                            <div key={element.commentId} >
                                <Box sx={{  mb: 0, mx: 'auto', color: "#7150BC",textAlign:"left", borderRadius: '30px' , marginTop: '15'}}>
                                    <div className = 'row' style={{fontWeight: '700', marginRight: 20}}>
                                        {element.username}     
                                    </div>
                                    <div className = 'row'>
                                        {element.commentDescription}
                                    </div>
                                    <Button className = 'row' onClick={() => {deleteComment(element)}} color = "error" style={{marginLeft: 70, fontSize: 10, fontWeight: '700'}}>
                                        Delete
                                    </Button>
                                </Box>
                            </div>
                            )
                            })
                    }

                    {comment ? <TextField id="outlined-basic"
                                name="Comment"
                                label="Comment"
                                fullWidth
                                margin="normal"
                                sx={{height:'10%'}}
                                onChange={(event) => {setCommentDescription(event.target.value)}}
                            /> : <div/>}
                    {comment ?   <Button variant="contained" size="small" sx={{ width: 1, fontWeight: 'bold', alignContent: 'center', marginBottom: 3}} onClick={() => 
                        {handleCommentCreate()}}>
                                Comment
                    </Button> : <div/>}



                </div>
            </Container>

    )
}




export default Post;



