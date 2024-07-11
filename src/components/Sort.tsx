import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, setDirection, setSort } from '../redux/slices/filterSlice';

type SortItem = {
  name:string;
  sortProperty:string;
}



export const list: SortItem[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

export default function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj: SortItem) => {
    setOpen(false);
    dispatch(setSort(obj));
  };

  const onClickDirection = (value:any) => {
    dispatch(setDirection(value));
  };

  React.useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <div className="sort__buttons">
          <button onClick={() => onClickDirection('asc')}> ↑ </button>
          <button onClick={() => onClickDirection('desc')}> ↓ </button>
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
