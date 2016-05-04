class LawsuitNew extends React.Component {
  displayName: 'LawsuitNew';
  render() {
    // TODO: used?
    return (
      <div className="row">
        <div className="col-md-9 col-md-offset-2">
          <LawsuitEditForm header="Lägg till" client_id={this.props.client_id} />
        </div>
      </div>
    );
  }
}

LawsuitNew.propTypes = {
  client_id: React.PropTypes.number.isRequired,
};
