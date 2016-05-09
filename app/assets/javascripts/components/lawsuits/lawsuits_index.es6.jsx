class LawsuitsIndex extends React.Component {
  constructor(props) {
    super(props);

    // Initializing state.
    this.state = {
      lawsuits: props.lawsuits,
      meta: props.meta,
      fetchData: {
        search: '',
        page: 1,
      },
    };
  }

  render() {
    return (
      <div>
        <p>Under uppbyggnad</p>
      </div>
    );
  }
}

LawsuitsIndex.propTypes = {
  lawsuits: React.PropTypes.array,
  meta: React.PropTypes.object,
};
