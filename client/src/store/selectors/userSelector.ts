import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { sortUsers } from '../../components/utils/usersSort';

export const selectUsers = (state: RootState) => state.users.users;
export const selectSortingColumn = (state: RootState) => state.users.sortingColumn;
export const selectSortOrder = (state: RootState) => state.users.sortOrder;

export const selectSortedUsers = createSelector(
  [selectUsers, selectSortingColumn, selectSortOrder],
  (users, sortingColumn, sortOrder) => {
    return sortUsers(users, sortingColumn, sortOrder);
  }
);