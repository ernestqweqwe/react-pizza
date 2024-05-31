import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';

import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [categoryId, setCategoryId] = React.useState(0); // Стейт для компонента categories

  const [currentPage, setCurrentPage] = React.useState(1); // стейт для пагинации

  const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' }); // Стейт для компоннента sort
  const [orderType, setOrderType] = React.useState('asc');
  const {searchValue} = React.useContext(SearchContext)

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.sortProperty.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://661fa52416358961cd94ff2b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${orderType}${search}`,
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return [];
        }
        // handle error
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
        // mockapi returns only tasks that match `hello` string
      })
      .catch((error) => {});
    window.scrollTo(0, 0);
  }, [categoryId, sortType, orderType, searchValue, currentPage]);
  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
        <Sort
          value={sortType}
          onChangeSort={(i) => setSortType(i)}
          onChangeDesc={(i) => setOrderType(i)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
