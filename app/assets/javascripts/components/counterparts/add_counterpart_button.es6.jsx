class AddCounterpartButton extends React.Component {
  handleOnClick(e) {
    e.preventDefault();
    ReactDOM.render(
      <EditFormModal
        form={<CounterPartForm lawsuitId={this.props.lawsuitId} />}
        header="Lägg till motpart"
      />,
    document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal();
  }

  render() {
    return (
      <div>
        <div id="editModalContainer"></div>
        <div className="content-right">
          <a onClick={this.handleOnClick.bind(this)}
            className="btn btn-success btn-sm">Lägg till motpart
          </a>
        </div>
      </div>
    );
  }
}
AddCounterpartButton.propTypes = {
  lawsuitId: React.PropTypes.number.isRequired,
};
