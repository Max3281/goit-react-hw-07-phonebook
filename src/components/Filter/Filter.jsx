import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { onFilter } from 'redux/slice';

const Filter = () => {
  const val = useSelector(selectFilter);

  const dispatch = useDispatch();

  const changeFilter = e => {
    dispatch(onFilter(e.currentTarget.value));
  };

  return (
    <label>
      Find contacts by name{' '}
      <input type="text" value={val} onChange={changeFilter} />
    </label>
  );
};

export default Filter;
