class SearchField extends React.Component {
  render() {
    return (
      <form>
        <input
          className="form-control"
          placeholder={this.props.placeholder}
          autoFocus="true"
          onChange={this.props.changeEvent}
          ref="search"
        />
      </form>
    );
  }
}

SearchField.propTypes = {
  changeEvent: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string.isRequired,
};
