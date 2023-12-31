import { getTimeAgo } from './Itempage';
import { useState, useEffect } from 'react';

function CommentPage(props) {
    const commentId = props.comment;
    const [comment, setComment] = useState([]);
    const [isCommentTreeShowed, setIsCommentTreeShowed] = useState(false);
 
    async function getComment(id) {
        try {
                const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
                const data = await response.json();

                setComment(data);
            } catch (error) {
                console.error('Failed to fetch:', error);
            }
    };

    function getCommentTree() {
        setIsCommentTreeShowed(!isCommentTreeShowed);
    };

    useEffect(() => {getComment(commentId)}, [commentId]);

    return (
        <>
        <div className='comment'>
                <p><span style={{fontWeight: 'bold'}}>commented by:</span> <span style={{fontStyle: 'italic'}}>{comment.by}</span> | {getTimeAgo(comment.time)}</p>
            <p dangerouslySetInnerHTML={{ __html: comment.text}} ></p>
            {
                comment.kids && comment.kids.length > 0 &&
                (
                    <div>
                        <p className='button' style={{marginTop: '15px'}} onClick={()=>{getCommentTree()}}>
                            {!isCommentTreeShowed ? `show replies (${comment.kids.length})` : 'hide replies'}</p>
                        {
                            isCommentTreeShowed &&
                            comment.kids.map(commentId => <CommentPage key={commentId} comment={commentId} />)
                        }
                    </div>
                )
            }
        </div>
        </>
    );
};


export {CommentPage};