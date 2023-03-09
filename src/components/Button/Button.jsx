import { Component } from 'react';
import { ButtonLoadMore } from './Button.styled';
import PropTypes from 'prop-types';

export class Button extends Component {
  render() {
    return (
      <ButtonLoadMore type="button" onClick={this.props.handleLoadMore}>
        Load more
      </ButtonLoadMore>
    );
  }
}

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
