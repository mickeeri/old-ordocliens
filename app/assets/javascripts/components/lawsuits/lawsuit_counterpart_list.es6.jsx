class LawsuitCounterpartList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counterparts: props.counterparts };
  }

  render() {
    return (
      <div className="card card-block">
        <h3 className="card-title">
          {this.props.counterparts.length > 1 ? 'Motparter' : 'Motpart'}
        </h3>
        <ul className="show-page-list">
          {this.state.counterparts.map(counterpart =>
            <li key={counterpart.id}>
              <a href={Routes.lawsuit_counterpart_path(this.props.lawsuitId, counterpart.id)}>
                {counterpart.name} ({counterpart.personalNumber})
              </a>
            </li>
          )}
        </ul>
        <AddCounterpartButton lawsuitId={this.props.lawsuitId} />
      </div>
    );
  }
}

LawsuitCounterpartList.propTypes = {
  counterparts: React.PropTypes.array.isRequired,
  lawsuitId: React.PropTypes.number.isRequired,
};
