import React from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import './scss/app.scss';
import Skeleton from './components/PizzaBlock/Skeleton';

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('https://661fa52416358961cd94ff2b.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false)
      });
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {
                isLoading ? [...new Array(6)].map((_,i) =><Skeleton key={i}/>):
                items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
