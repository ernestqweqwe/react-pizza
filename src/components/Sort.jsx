import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDirection, setSort } from '../redux/slices/filterSlice';

export default function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);



  const [open, setOpen] = React.useState(false);
  const list = [
    { name: 'популярности', sortProperty: 'rating' },
    { name: 'цене', sortProperty: 'price' },
    { name: 'алфавиту', sortProperty: 'title' },
  ];

  const onClickListItem = (obj) => {
    setOpen(false);
    dispatch(setSort(obj));
  };

  const onClickDirection =(value)=>{
    dispatch(setDirection(value))
  }


 

  return (
    <div className="sort">
      <div className="sort__label">
        <div className="sort__buttons">
          <button  onClick={() => onClickDirection('asc')} > ↑ </button>
          <button  onClick={() => onClickDirection('desc')}> ↓ </button>
        </div>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={obj.name}
                onClick={() => onClickListItem(obj)}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
