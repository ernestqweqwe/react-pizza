import React from 'react';

export default function Sort({ value, onChangeSort, onChangeDesc }) {
  const [open, setOpen] = React.useState(false);
  const list = [
    { name: 'популярности', sortProperty: 'rating' },
    { name: 'цене', sortProperty: 'price' },
    { name: 'алфавиту', sortProperty: 'title' },
  ];

  const onClickListItem = (i) => {
    onChangeSort(i);
    setOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <div className="sort__buttons">
          <button onClick={() => onChangeDesc('asc')}> ↑ </button>
          <button onClick={() => onChangeDesc('desc')}> ↓ </button>
        </div>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={obj.name}
                onClick={() => onClickListItem(obj)}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
