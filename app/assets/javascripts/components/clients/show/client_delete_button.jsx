class ClientDeleteButton extends React.Component {
  render() {
    const target = 'deleteClient';
    return (
      <div className="card">
        <ConfirmDeleteModal
          target={target}
          url={Routes.client_path(this.props.clientId)}
          redirectTo={Routes.clients_path()}
          subToPublish="deleteClientConfirmed"
        />
        <div className="card-block">
          <div className="row">
            <div className="col-md-8">
              <h3>Radera klient</h3>
            </div>
            <div className="col-md-4">
              <a
                href="#" className="btn btn-danger-outline"
                data-toggle="modal"
                data-target={`#${target}`}
              >Radera klient
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ClientDeleteButton.propTypes = {
  clientId: React.PropTypes.number.isRequired,
};
