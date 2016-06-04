class ClientShow extends React.Component {
  constructor(props) {
    super(props);
    this.setMessage = this.setMessage.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('clientUpdated', this.setMessage);
  }

  componentWillUnmount() {
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
                  <ClientForm client={this.props.initialClient} header="" />
                </div>
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
                    {this.props.counterparts.map(counterpart =>
                      <li key={counterpart.id}>
                        <a href={Routes.counterpart_path(counterpart.id)}>
                          {counterpart.firstName} {counterpart.lastName} ({counterpart.personalNumber})
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-md-12">
                <ClientDeleteButton
                  clientId={this.props.initialClient.id}
                  primary={this.props.primary}
                />
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
    email: React.PropTypes.string,
    firstName: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    lastName: React.PropTypes.string.isRequired,
    note: React.PropTypes.string,
    personalNumber: React.PropTypes.string.isRequired,
    phoneNumber: React.PropTypes.string,
    postCode: React.PropTypes.string,
    street: React.PropTypes.string,
  }),
  counterparts: React.PropTypes.array.isRequired,
  lawsuits: React.PropTypes.array.isRequired,
  primary: React.PropTypes.bool.isRequired,
};
