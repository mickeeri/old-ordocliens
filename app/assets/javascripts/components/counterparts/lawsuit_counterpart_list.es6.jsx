class LawsuitCounterpartList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counterparts: props.counterparts };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('counterpartListUpdated', this.refreshCounterParts.bind(this));
  }

  componentWillUnmount() {
    PubSub.unsubscribe('counterpartListUpdated');
  }

  handleDeleteClick(counterpartId) {
    const url = `${Routes.counterpart_path(counterpartId)}?lawsuit_id=${this.props.lawsuitId}`;
    makeDeleteRequest(url)
      .success(() => {
        showSuccessText('Motpart raderad från ärende', '#counterpart-list-message');
        this.refreshCounterParts();
      })
      .fail(xhr => {
        showErrorText('Något gick fel när motpart skulle raderas från ärende',
          '#counterpart-list-message');
      });
  }

  refreshCounterParts() {
    const url = `/lawsuits/${this.props.lawsuitId}/counterparts`;
    makeGetRequest(url)
      .success(res => {
        this.setState({ counterparts: res.counterparts });
        PubSub.publish('dismissEdit');
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    return (
      <div className="card card-block">
        <p className="hidden message" id="counterpart-list-message">
        </p>
        <h3 className="card-title">
          {this.props.counterparts.length > 1 ? 'Motparter' : 'Motpart'}
        </h3>
        <ul className="show-page-list">
          {this.state.counterparts.map(counterpart =>
            <li key={counterpart.id}>
              <a href={Routes.counterpart_path(counterpart.id)}>
                {counterpart.firstName} {counterpart.lastName} ({counterpart.personalNumber})
              </a>
              <i
                className="fa fa-times delete-row-icon"
                onClick={() => this.handleDeleteClick(counterpart.id)}
                aria-hidden="true"
              />
            </li>
          )}
        </ul>
        <div id="editModalContainer"></div>
        <div className="content-right">
          <AddCounterpartButton
            addNewCounterpart={false}
            lawsuitId={this.props.lawsuitId}
          />
          <AddCounterpartButton
            addNewCounterpart
            lawsuitId={this.props.lawsuitId}
          />
        </div>
      </div>
    );
  }
}

LawsuitCounterpartList.propTypes = {
  counterparts: React.PropTypes.array.isRequired,
  lawsuitId: React.PropTypes.number.isRequired,
};
