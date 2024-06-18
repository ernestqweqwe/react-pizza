import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';

import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId); // Достаем categoryId из нашего filterSlice
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const direction = useSelector((state) => state.filter.direction);



  const dispatch = useDispatch();

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [currentPage, setCurrentPage] = React.useState(1); // стейт для пагинации

  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType
    const order = direction
    const search = searchValue ? `&search=${searchValue}` : '';
    

    fetch(
      `https://661fa52416358961cd94ff2b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
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
  }, [categoryId, sortType, searchValue, currentPage, direction]);
  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort
         
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
