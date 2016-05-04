/* global makeGetRequest */
/* global BreadCrumb */
/* global ClientEditForm */
/* global LawsuitIndex */
/* global ClientDeleteButton */
/* global CounterpartsIndex */

class ClientShow extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      client: props.initial_client,
      editMode: false,
      links: props.links,
    };

    this.refreshClient = this.refreshClient.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('editModeButtonClicked', this.toggleEditMode);
    PubSub.subscribe('deleteClientConfirmed', this.deleteClient);
    PubSub.subscribe('clientUpdated', this.refreshClient);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('editModeButtonClicked');
    PubSub.unsubscribe('deleteClientConfirmed');
    PubSub.unsubscribe('clientUpdated');
  }

  refreshClient() {
    makeGetRequest(Routes.client_path(this.state.client.id))
      .success(response => {
        this.toggleEditMode();
        this.setState({ client: response.client });
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    return (
      <div>
        <BreadCrumb
          active={`${this.state.client.first_name} ${this.state.client.last_name}`}
          links={this.state.links}
        />
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <ClientEditForm client={this.state.client} header="" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <ClientDeleteButton clientId={this.props.initial_client.id} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <LawsuitIndex
                  lawsuits={this.props.initial_client.lawsuits}
                  clientId={this.props.initial_client.id}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <CounterpartsIndex
                  lawsuits={this.props.initial_client.lawsuits}
                  initialCounterparts={this.props.counterparts}
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
  initial_client: React.PropTypes.object.isRequired,
  links: React.PropTypes.array.isRequired,
  counterparts: React.PropTypes.array.isRequired,
};
