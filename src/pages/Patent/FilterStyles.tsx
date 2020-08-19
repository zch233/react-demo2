import styled from 'styled-components';

export const Wrapper = styled.section``;
export const UserFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  .filterText {
    svg {
      width: 0.7em;
      margin-left: 0.2em;
      margin-right: 0.3em;
    }
  }
  .filterControl {
    border: solid 1px #e8e8e8;
    padding: 2px 9px;
    background: #fafafa;
    color: #6b6b6b;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;
    &:hover {
      color: #f40;
    }
    svg {
      width: 0.7em;
      margin-left: 0.6em;
    }
  }
`;
export const FilterSection = styled.div`
  background-color: #fff;
  margin-bottom: 20px;
  padding: 5px 15px;
  margin-top: 10px;
  .filterItem {
    padding: 10px 0;
    border-bottom: 1px dashed #ddd;
    display: flex;
    align-items: center;
    &:last-child {
      border-bottom: none;
    }
    &-label {
      color: #999;
      width: 6em;
    }
    &-category {
      margin-right: 0.4em;
      cursor: pointer;
      color: #000;
      padding: 0.1em 0.8em;
      border-radius: 2em;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        color: #d82d2b;
      }
      &.active {
        background-color: #d82d2b;
        color: #fff;
      }
    }
  }
`;
export const CategoryDetailWrapper = styled.section`
  max-height: 20em;
  overflow-y: auto;
  .item {
    margin-bottom: 5px;
    cursor: pointer;
    &:hover {
      color: #d82d2b;
    }
  }
  &::-webkit-scrollbar-track-piece {
    background: #fff;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 20px;
  }
`;
