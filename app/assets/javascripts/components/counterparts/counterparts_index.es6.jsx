class CounterpartsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counterparts: props.initialCounterparts };
  }

  componentDidMount() {
    PubSub.subscribe('counterpartsTouched', this.refreshCounterParts.bind(this));
    PubSub.subscribe('dismissEdit', this.removeEditFormModal);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('counterpartsTouched');
    PubSub.unsubscribe('dismissEdit');
  }

  // Remove modal from DOM.
  removeEditFormModal() { // TODO: maybee move to EditFormModal
    $('#editFormModal').modal('hide');
    ReactDOM.unmountComponentAtNode(document.getElementById('editModalContainer'));
  }

  refreshCounterParts() {
    const url = Routes.client_counterparts_path(this.props.clientId);
    makeGetRequest(url)
      .success(response => {
        this.setState({ counterparts: response.counterparts });
        this.removeEditFormModal();
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    // {counterpartRows}
    // <AddCounterpartButton clientId={this.props.clientId} />

    return (
      <div className="card card-block">
        <h3 className="card-title">Motparter</h3>
        <ul className="show-page-list">
        </ul>
      </div>
    );
  }
}

CounterpartsIndex.propTypes = {
  initialCounterparts: React.PropTypes.array.isRequired,
  lawsuits: React.PropTypes.array.isRequired,
};
