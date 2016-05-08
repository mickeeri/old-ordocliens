class AddClientButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();
    ReactDOM.render(
      <EditFormModal
        form={<ClientForm lawsuitId={this.props.lawsuitId} />}
        header="Lägg till klient"
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
          <a
            onClick={this.handleOnClick}
            className="btn btn-success btn-sm"
          >Lägg till klient till ärendet
          </a>
        </div>
      </div>
    );
  }
}

AddClientButton.propTypes = {
  lawsuitId: React.PropTypes.number.isRequired,
};
