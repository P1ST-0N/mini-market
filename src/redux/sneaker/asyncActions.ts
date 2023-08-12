import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Sneaker, SearchSneakerParams } from './types';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

export const fetchSneakers = createAsyncThunk<Sneaker[], SearchSneakerParams>(
  'sneaker/fetchSneakersStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    console.log(params, 4444);
    const { data } = await axios.get<Sneaker[]>(`https://6491fbe22f2c7ee6c2c94115.mockapi.io/shoes`, {
      params: pickBy(
        {
          page: currentPage,
          limit: 4,
          category,
          sortBy,
          order,
          search,
        },
        identity,
      ),
    });

    return data;
  },
);
