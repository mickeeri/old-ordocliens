class ClientInfo extends React.Component {
  render() {
    var client = this.props.client;
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">{client.first_name} {client.last_name}</h4>
          <dl>
            <dt>Personnummer</dt>
            <dd>{client.ssn}</dd>
            <dt>E-post</dt>
            <dd>{client.email}</dd>
            <dt>Mobil</dt>
            <dd>{client.phone_number}</dd>
            <dt>Adress</dt>
            <dd>{client.street}<br/>
                {client.post_code} {client.city}
            </dd>
            <dt>Anteckning</dt>
            <dd>{client.note}</dd>
          </dl>
        </div>
      </div>
    );
  }
}
ClientInfo.propTypes = {
  client: React.PropTypes.object.isRequired,
};
