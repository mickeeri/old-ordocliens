class AddClientButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();
    const form = this.props.addNewClient ?
      <ClientForm lawsuitId={this.props.lawsuitId} /> :
      <ClientsDropdown lawsuitId={this.props.lawsuitId} />;
    ReactDOM.render(
      <EditFormModal
        form={form}
        header="Lägg till klient till ärende"
      />,
    document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal();
  }

  render() {
    return (
      <a
        onClick={this.handleOnClick}
        className="btn btn-success btn-sm"
      >{this.props.addNewClient ? 'Lägg till ny klient' :
        'Lägg till befintlig klient'}
      </a>
    );
  }
}

AddClientButton.propTypes = {
  lawsuitId: React.PropTypes.number.isRequired,
  addNewClient: React.PropTypes.bool.isRequired,
};
