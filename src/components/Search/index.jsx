import React from 'react';
import debounce from 'lodash.debounce';

import styles from './search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef(); // вытаскивание ссылки на дом элемент инпута(в самом инпуте пишет ref={inputRef} )

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))

    }, 700),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('');
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        height="512px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 512 512"
        width="512px"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z" />
      </svg>

      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type="text"
        placeholder="поиск пиццы"
      />
      {value && (
        <svg
          onClick={() => {
            onClickClear();
          }}
          className={styles.clearIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M6.00015 4.58569L12.0002 10.5857L18.0002 4.58569L19.4144 5.99991L13.4144 11.9999L19.4144 17.9999L18.0002 19.4141L12.0002 13.4141L6.00015 19.4141L4.58594 17.9999L10.5859 11.9999L4.58594 5.99991L6.00015 4.58569Z"
            fill="black"
          />
        </svg>
      )}
    </div>
  );
};

export default Search;
