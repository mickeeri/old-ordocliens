class AddLawsuitButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    ReactDOM.render(
      <EditFormModal
        form={<LawsuitForm clientId={this.props.clientId} />}
        header="Lägg till mål"
      />,
    document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal();
  }

  render() {
    return (
      <div>
        <div id="editModalContainer"></div>
        <div className="content-right">
          <hr />
          <a
            onClick={this.handleClick}
            className="btn btn-success-outline"
          >Lägg till mål
          </a>
        </div>
      </div>
    );
  }
}

AddLawsuitButton.propTypes = {
  clientId: React.PropTypes.number.isRequired,
};
