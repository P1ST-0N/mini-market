import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Categories, Sort, SneakerBlock, Skeleton, Pagination } from 'components';

import { sortList } from 'components/Sort';

import { useAppDispatch } from 'redux/store';
import { selectFilter } from 'redux/filter/selectors';
import { selectSneakerData } from 'redux/sneaker/selectors';
import { setCategoryId, setCurrentPage, setFilters } from 'redux/filter/slice';
import { fetchSneakers } from 'redux/sneaker/asyncActions';
import { SearchSneakerParams } from 'redux/sneaker/types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectSneakerData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getSneakers = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? String(categoryId) : '';
    const search = searchValue;

    dispatch(
      fetchSneakers({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    // window.scrollTo(0, 0);
  };

  React.useEffect(() => {

    getSneakers();

  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const sneakers = items.map((obj: any) => <SneakerBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Весь вибір</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Сталася помилка 😕</h2>
          <p>Нажаль, не вдалось отримати товар. Спробуйте повторити пізніше</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : sneakers}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
