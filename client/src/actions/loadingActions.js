import { PAGE_LOADED, PAGE_LOADING } from '../actions/types';

export const isLoading = () => async (dispatch) => {
    dispatch({ type: PAGE_LOADING });
};

export const isLoaded = () => async (dispatch) => {
    dispatch({ type: PAGE_LOADED });
};
