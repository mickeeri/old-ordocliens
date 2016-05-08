class CounterpartShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Under uppbyggnad.
      </div>
    );
  }
}

CounterpartShow.propTypes = {
  lawsuitId: React.PropTypes.number.isRequired,
  counterpart: React.PropTypes.object.isRequired,
};
