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
    $('#updatedClientMessage').slideDown();
    $('#updatedClientMessage').slideUp(2000);
  }

  render() {
    return (
      <div>
        <p
          id="updatedClientMessage"
          className="text-success"
        >Klient uppdaterad!</p>
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-block">
                  <h3 className="card-title">Uppgifter</h3>
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
                  lawsuits={this.props.lawsuits}
                  clientId={this.props.initialClient.id}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-block">
                  <h3 className="card-title">Motparter</h3>
                  <hr />
                  <ul className="show-page-list">
                    {this.props.initialClient.counterparts.map(counterpart =>
                      <li key={counterpart.id}>
                        <a href={Routes.counterpart_path(counterpart.id)}>
                          {counterpart.firstName} {counterpart.lastName} ({counterpart.personalNumber})
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
  initialClient: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    firstName: React.PropTypes.string.isRequired,
    lastName: React.PropTypes.string.isRequired,
    personalNumber: React.PropTypes.string.isRequired,
    email: React.PropTypes.string,
    phoneNumber: React.PropTypes.string,
    postCode: React.PropTypes.string,
    street: React.PropTypes.string,
    note: React.PropTypes.string,
    lawsuits: React.PropTypes.array,
    counterparts: React.PropTypes.array,
  }),
  lawsuits: React.PropTypes.array.isRequired,
  // counterparts: React.PropTypes.array.isRequired,
};
