import { getTimeAgo } from './Itempage';
import { CommentPage } from './CommentPage';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function SinglePage() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [newsItemData, setNewsItemData] = useState('');

    const goBack = () => navigate(-1);

    async function getNewsItemData(param) {
        try {const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${param}.json`);
        const data = await response.json();
    
        setNewsItemData(data);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        }
    };

    function handleRefreshClick() {
        getNewsItemData(id);
    };
    
    useEffect(() => {getNewsItemData(id)
        const interval = setInterval(() => {
            getNewsItemData(id);
        }, 60000);
        
        return () => clearInterval(interval);
    }, [id]);

    return ( 
        <div>
            <button className='waves-effect waves-light btn' onClick={goBack}>Go back</button>
            {
                !newsItemData ? 
                <h3>Loading data... </h3>
                :
                <>
                    <div className='news-page'>
                        <div>
                            <h3>{newsItemData.title}</h3>
                            <h5>Source: <Link to={newsItemData.url}>{newsItemData.url}</Link> </h5>
                            <p>Author: <span style={{fontStyle: 'italic'}}>{newsItemData.by}</span> | {getTimeAgo(newsItemData.time)} | <span className='comments__toggle'>comments: {newsItemData.descendants}</span></p> 
                        </div>
                        <div className='cart blue-grey darken-1 white-text' onClick={handleRefreshClick}>
                            <i className='material-icons'>refresh</i>
                        </div>
                        {
                            newsItemData.kids ? 
                            <div className="comments">
                                {newsItemData.kids.map(comment => <CommentPage key={comment} comment={comment}/>)}
                            </div> 
                            : ''
                        }
                    </div>
                </> 
            }
        </div>
    );
};

export { SinglePage }; 

