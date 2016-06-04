class ClientDeleteButton extends React.Component {
  render() {
    const target = 'deleteClient';
    return (
      <div className="card">
        <ConfirmDeleteModal
          target={target}
          resourceName="klient"
          url={Routes.client_path(this.props.clientId)}
          redirectTo={Routes.clients_path()}
          subToPublish="deleteClientConfirmed"
        />
        <div className="card-block">
          <div className="row">
            <div className="col-md-12">
              <h3>Radera klient</h3>
              {this.props.primary ?
                <p className="text-warning">
                  Klienten kan inte raderas eftersom denne är huvudklient i ett ärende.
                  Radera ärendet först för att kunna radera klienten.
                </p> :
                ''}
            </div>
            <div className="col-md-12">
              <a
                href="#"
                className={this.props.primary ?
                  'btn btn-danger-outline disabled' :
                  'btn btn-danger-outline'}
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
  primary: React.PropTypes.bool.isRequired,
};
