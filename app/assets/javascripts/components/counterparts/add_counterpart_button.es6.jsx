class AddCounterpartButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();
    const form = this.props.addNewCounterpart ?
      <CounterpartForm lawsuitId={this.props.lawsuitId} /> :
      <CounterpartsDropdown lawsuitId={this.props.lawsuitId} />;
    ReactDOM.render(
      <EditFormModal
        form={form}
        header="Lägg till motpart till ärende"
      />,
    document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal();
  }

  render() {
    return (
      <button
        onClick={this.handleOnClick}
        className="btn btn-success-outline btn-sm"
      >{this.props.addNewCounterpart ? 'Lägg till ny motpart' :
        'Lägg till befintlig motpart'}
      </button>
    );
  }
}

AddCounterpartButton.propTypes = {
  lawsuitId: React.PropTypes.number.isRequired,
  addNewCounterpart: React.PropTypes.bool.isRequired,
};
