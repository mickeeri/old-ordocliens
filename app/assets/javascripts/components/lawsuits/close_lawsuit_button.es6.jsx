class CloseLawsuitButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: props.closed,
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();
    const request = !this.state.closed;
    this.setState({ closed: request });
    makePutRequest(Routes.lawsuit_path(this.props.lawsuitId),
      { lawsuit: { closed: request } })
      .done(() => {
        PubSub.publish('lawsuitClosedOpened');
      })
      .fail(xhr => {
        showErrorText(`Fel uppstod. Statuskod: ${xhr.status}`, '#lawsuit-form-message');
      });
  }

  render() {
    const state = this.state;
    return (
      <div className="card card-block">
        <div className="row">
          <div className="col-md-12">
            <a
              href="#"
              className={state.closed ?
                'btn btn-success-outline width-fill' :
                'btn btn-warning-outline width-fill'}
              onClick={this.handleOnClick}
            >
              {!state.closed ? <i className="fa fa-archive" aria-hidden="true"></i> : ''}
              {state.closed ? 'Öppna ärende' : 'Arkivera ärende'}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

CloseLawsuitButton.propTypes = {
  lawsuitId: React.PropTypes.number.isRequired,
  closed: React.PropTypes.bool.isRequired,
};
