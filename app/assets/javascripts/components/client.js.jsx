var Client = React.createClass({
  propTypes: {
    lastName: React.PropTypes.string,
    firstName: React.PropTypes.string,
    ssn: React.PropTypes.string,
    street: React.PropTypes.string,
    postCode: React.PropTypes.string,
    city: React.PropTypes.string,
    note: React.PropTypes.string
  },

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.firstName} {this.props.lastName}</h3>
        </div>
        <div className="panel-body">
          <h4>Personnummer</h4>
          {this.props.ssn}
          <hr/>
          <h4>Adress</h4>
          {this.props.street} <br/>
          {this.props.postCode} {this.props.city}
          <hr/>
          <h4>Anteckning</h4>
          <div>{this.props.note}</div>
        </div>
      </div>
    );
  }
});
