/* global makeGetRequest */
/* global LawsuitRow */
/* global AddLawsuitButton */
/* global CounterpartsIndex */

class LawsuitIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lawsuits: props.lawsuits }; // TODO: rename to initial..
    this.refreshLawsuits = this.refreshLawsuits.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('lawsuitsTouched', this.refreshLawsuits);
    PubSub.subscribe('dismissEdit', this.removeEditFormModal);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('lawsuitsTouched');
    PubSub.unsubscribe('dismissEdit');
  }

  // Remove modal from DOM.
  removeEditFormModal() { // TODO: maybee move to EditFormModal
    $('#editFormModal').modal('hide');
    ReactDOM.unmountComponentAtNode(document.getElementById('editModalContainer'));
  }

  refreshLawsuits() {
    const url = `${Routes.lawsuits_path()}?client_id=${this.props.clientId}`;
    makeGetRequest(url)
      .success(response => {
        this.setState({ lawsuits: response.lawsuits });
        this.removeEditFormModal();
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    let lawsuitRows = this.state.lawsuits.map(lawsuit =>
      <LawsuitRow
        key={lawsuit.id}
        lawsuit={lawsuit}
      />
    );

    return (
      <div className="card">
        <div className="card-block">
          <h3 className="card-title">Ärenden</h3>
          {lawsuitRows}
          <AddLawsuitButton clientId={this.props.clientId} />
        </div>
      </div>
    );
  }
}

LawsuitIndex.propTypes = {
  lawsuits: React.PropTypes.array.isRequired,
  clientId: React.PropTypes.number.isRequired,
};
