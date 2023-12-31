import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function getTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() / 1000) - timestamp);
  const interval = Math.floor(seconds / 60);
  if (interval < 1) {
    return 'just now';
  }
  if (interval === 1) {
    return 'minute ago';
  }
  if (interval < 60) {
    return interval + ' minutes ago';
  }
  const hours = Math.floor(interval / 60);
  if (hours === 1) {
    return 'hour ago';
  }
  if (hours < 24) {
    return hours + ' hours ago';
  }
  const days = Math.floor(hours / 24);
  if (days === 1) {
    return 'yesterday';
  }
  if (days <= 7) {
    return days + ' days ago';
  }
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}/${day}/${month}`;
};

function Itempage(props) {
  
  const newsId = props.item;
  const [newsItem, setNewsItem] = useState([]);
    
  async function getNewsList(id) {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    const data = await response.json();

    setNewsItem(data);
  };

  useEffect(() => {getNewsList(newsId)}, [newsId]);

  return (
  <li className='news-item__order-list'>
    <div className='news-item'>
      <Link to={`/${newsItem.id}`} key={newsItem.id}><h5>{newsItem.title}</h5></Link>
      <p>by: {newsItem.by} | score: {newsItem.score} | {getTimeAgo(newsItem.time)} | comments: {newsItem.descendants}</p>
    </div>
  </li>
  );
};

export { Itempage, getTimeAgo};
