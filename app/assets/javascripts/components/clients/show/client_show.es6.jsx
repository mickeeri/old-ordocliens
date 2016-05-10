class ClientShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: props.initialClient,
      editMode: false,
      links: [{ id: 1, path: Routes.clients_path(), name: 'Klienter' }],
    };

    this.setMessage = this.setMessage.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('editModeButtonClicked', this.toggleEditMode);
    PubSub.subscribe('deleteClientConfirmed', this.deleteClient);
    PubSub.subscribe('clientUpdated', this.setMessage);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('editModeButtonClicked');
    PubSub.unsubscribe('deleteClientConfirmed');
    PubSub.unsubscribe('clientUpdated');
  }

  setMessage() {
    $('#updatedClientMessage').fadeIn();
    $('#updatedClientMessage').fadeOut(2000);
  }

  render() {
    return (
      <div>
        <BreadCrumb
          active={`${this.state.client.firstName} ${this.state.client.lastName}`}
          links={this.state.links}
        />
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <p
                  id="updatedClientMessage"
                  className="text-success"
                >Klient uppdaterad</p>
                <div className="card card-block">
                  <ClientForm client={this.state.client} header="" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <ClientDeleteButton clientId={this.props.initialClient.id} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <LawsuitsList
                  lawsuits={this.props.initialClient.lawsuits}
                  clientId={this.props.initialClient.id}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-block">
                  <h3 className="card-title">Motparter</h3>
                  <ul className="show-page-list">
                    {this.props.initialClient.counterparts.map(counterpart =>
                      <li key={counterpart.id}>
                        <a href="#">
                          {counterpart.name} ({counterpart.personalNumber})
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ClientShow.propTypes = {
  initialClient: React.PropTypes.object.isRequired,
  // counterparts: React.PropTypes.array.isRequired,
};
