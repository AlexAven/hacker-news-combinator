import { useEffect, useState } from 'react';
import { Itempage } from './Itempage';

function Homepage() {
    const [newsIdList, setNewsIdList] = useState([]);
    // const timerId = setInterval(() => getNewsIds(), 60000);

    async function getNewsIds() {
        try {
            const response =  await fetch('https://hacker-news.firebaseio.com/v0/newstories.json');
            const data = await response.json();
        
            setNewsIdList(data.slice(0, 100));
        } catch (error) {
            console.error('Failed to fetch news IDs:', error);
        }
    };

    function handleRefreshClick() {
        getNewsIds();
    };

    useEffect(() => {getNewsIds()
        const intervalId = setInterval(() => {
            getNewsIds();
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    
    return (
        <>
        <div className='cart blue-grey darken-1 white-text' onClick={handleRefreshClick}>
        <i className='small material-icons'>refresh</i>
        </div>
        <ol>
            {newsIdList.map(item => <Itempage key={item} item={item} />)}  
        </ol>
        </>
    );
};

export { Homepage };