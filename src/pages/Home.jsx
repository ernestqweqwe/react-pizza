import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';

import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [categoryId, setCategoryId] = React.useState(0);// Стейт для компонента categories
  const [sortType, setSortType] = React.useState({name: 'популярности', sortProperty:'rating'});// Стейт для компоннента sort
  const [orderType, setOrderType] = React.useState("asc");

 

  React.useEffect(() => {
    setIsLoading(true)
    fetch(`https://661fa52416358961cd94ff2b.mockapi.io/items?${categoryId > 0 ?`category=${categoryId}`: ''}&sortBy=${sortType.sortProperty}&order=${orderType}`)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, orderType]);
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} onChangeDesc={(i) => setOrderType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </>
  );
};

export default Home;
