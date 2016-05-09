class CounterpartsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counterparts: props.initialCounterparts };
  }

  render() {
    return (
      <div>
        <p>Under uppbyggnad</p>
      </div>
    );
  }
}

CounterpartsIndex.propTypes = {
  initialCounterparts: React.PropTypes.array,
  lawsuits: React.PropTypes.array,
};
