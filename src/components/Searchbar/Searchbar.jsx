import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { ReactComponent as SearchIcon } from "../../icons/search.svg";

export class Searchbar extends Component {
  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.props.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchIcon width={32} height={32} />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            name="search"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
