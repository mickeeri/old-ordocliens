class Client extends React.Component {
  render () {
    return (
      <div>
        <div>First Name: {this.props.firstName}</div>
        <div>Last Name: {this.props.lastName}</div>
        <div>Personnummer: {this.props.ssn}</div>
      </div>
    );
  }
}

Client.propTypes = {
  firstName: React.PropTypes.string,
  lastName: React.PropTypes.string,
  ssn: React.PropTypes.string
};
