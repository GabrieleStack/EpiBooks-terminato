import React, { useEffect } from "react";
import { useState } from "react";
import {Form, InputGroup, ListGroup  } from 'react-bootstrap';

const CommentArea = ({asin}) => {
    
    const [oneComment, setoneComment] = useState('')
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch(`https://striveschool-api.herokuapp.com/api/books/${asin}/comments/`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzQ2MzVjYWIxNjAwMTVhNmE0N2EiLCJpYXQiOjE3MTc1OTcyODMsImV4cCI6MTcxODgwNjg4M30.d8BWaYF4IQ0XH2V4gClfkTQrHUOgxqimJtJr-sKFbAo'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('response from GET:', data);
            setComments(data)
        })
        .catch(error => console.error('errore', error))
    },[asin])

    const HandleSingleCommment = (e) => {
        const comment = e.target.value
        setoneComment(comment)
    }

    const HandleAddSingleComment = () => {
        if(!oneComment.trim()) {
            return
        }

        let newComment = {
            comment: oneComment,
            rate: 5,
            elementId: asin
        }

        fetch('https://striveschool-api.herokuapp.com/api/comments', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzQ2MzVjYWIxNjAwMTVhNmE0N2EiLCJpYXQiOjE3MTc1OTcyODMsImV4cCI6MTcxODgwNjg4M30.d8BWaYF4IQ0XH2V4gClfkTQrHUOgxqimJtJr-sKFbAo',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
        .then(response => response.json())
        .then(data => {
            console.log('response from POST:', data);
            setComments([...comments, data])
            setoneComment('')
        })
        .catch(error => console.error('errore', error))
    }
        return (
            <div>
              <InputGroup className="inputbook mb-3">
                <Form.Control
                 placeholder="Inserisci Recensione"
                 aria-label="Recipient's username"
                 aria-describedby="basic-addon2"
                 value={oneComment}
                 onChange={HandleSingleCommment}
                 />
                <InputGroup.Text className='bottone' id="basic-addon2" onClick={HandleAddSingleComment}>Aggiungi</InputGroup.Text>
              </InputGroup>

              <ListGroup className='list' data-testid="comment-list">
                {comments.map((comment, index) => (
                <ListGroup.Item key={index} data-testid={`comment-item-${index}`}>{comment.comment}</ListGroup.Item>
                ))}
              </ListGroup>
           </div>
        )

}

export default CommentArea