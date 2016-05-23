class CounterpartShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counterpart: props.initialCounterpart,
    };
    this.setMessage = this.setMessage.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('counterpartUpdated', this.setMessage);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('counterpartUpdated');
  }

  setMessage() {
    $('#updatedCounterpartMessage').fadeIn();
    $('#updatedCounterpartMessage').fadeOut(2000);
  }

  render() {
    return (
      <div>
        <p
          id="updatedCounterpartMessage"
          className="text-success"
        >Motpart uppdaterad!</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card card-block">
              <h3 className="card-title">Uppgifter</h3>
              <hr />
              <CounterpartForm initialCounterpart={this.props.initialCounterpart} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card card-block">
              <h3 className="card-title">Ärenden</h3>
              <hr />
              <CounterpartLawsuitList lawsuits={this.props.lawsuits} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CounterpartShow.propTypes = {
  initialCounterpart: React.PropTypes.object.isRequired,
  lawsuits: React.PropTypes.array.isRequired,
};
