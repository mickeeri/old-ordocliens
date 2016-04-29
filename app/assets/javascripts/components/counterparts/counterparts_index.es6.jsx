class CounterpartsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counterparts: props.initialCounterparts };
  }

  // componentDidMount() {
  //   PubSub.subscribe('legalCasesTouched', this.refreshLegalCases.bind(this));
  //   PubSub.subscribe('dismissEdit', this.removeEditFormModal);
  // }
  //
  // componentWillUnmount() {
  //   PubSub.unsubscribe('legalCasesTouched');
  //   PubSub.unsubscribe('dismissEdit');
  // }

  // Remove modal from DOM.
  // removeEditFormModal() { // TODO: maybee move to EditFormModal
  //   $('#editFormModal').modal('hide');
  //   ReactDOM.unmountComponentAtNode(document.getElementById('tasksModalContainer'));
  // }

  // refreshLegalCases() {
  //   var url = Routes.client_legal_cases_path(this.props.clientId);
  //   makeGetRequest(url)
  //     .success(response=> {
  //       this.setState({ legalCases: response.legal_cases });
  //       this.removeEditFormModal();
  //     })
  //     .error(xhr=> {
  //       console.error(url, xhr.status, xhr.statusText);
  //     });
  // }

  render() {
    var counterpartRows = this.state.counterparts.map(counterpart=>
      <CounterPartRow key={counterpart.id}
        counterpart={counterpart}
        clientId={this.props.clientId }/>
    );

    return (
      <div className="card card-block">
        <h3 className="card-title">Motparter</h3>
        {counterpartRows}
        <AddCounterpartButton clientId={this.props.clientId} />
      </div>
    );
  }
}

CounterpartsIndex.propTypes = {
  initialCounterparts: React.PropTypes.array.isRequired,
  clientId: React.PropTypes.number.isRequired,
};
