class LegalCasesIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { legalCases: props.legalCases }; // TODO: rename to initial..
  }

  componentDidMount() {
    PubSub.subscribe('legalCasesTouched', this.refreshLegalCases.bind(this));
    PubSub.subscribe('dismissEdit', this.removeEditFormModal);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('legalCasesTouched');
    PubSub.unsubscribe('dismissEdit');
  }

  // Remove modal from DOM.
  removeEditFormModal() { // TODO: maybee move to EditFormModal
    $('#editFormModal').modal('hide');
    ReactDOM.unmountComponentAtNode(document.getElementById('editModalContainer'));
  }

  refreshLegalCases() {
    var url = Routes.client_legal_cases_path(this.props.clientId);
    makeGetRequest(url)
      .success(response=> {
        this.setState({ legalCases: response.legal_cases });
        this.removeEditFormModal();
      })
      .error(xhr=> {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    var legalCaseRows = this.state.legalCases.map(legalCase=>
      <LegalCaseRow key={legalCase.id} legalCase={legalCase} clientId={this.props.clientId }/>
    );

    return (
      <div className="card">
        <div className="card-block">
          <h3 className="card-title">Klientens mål</h3>
          {legalCaseRows}
          <AddLegalCaseButton clientId={this.props.clientId} />
        </div>
      </div>
    );
  }
}

LegalCasesIndex.propTypes = {
  legalCases: React.PropTypes.array.isRequired,
  clientId: React.PropTypes.number.isRequired,
};
