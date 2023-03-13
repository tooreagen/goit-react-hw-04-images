import PropTypes from 'prop-types';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { ReactComponent as SearchIcon } from "../../icons/search.svg";

export function Searchbar({ handleSubmit }) {
  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
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

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
