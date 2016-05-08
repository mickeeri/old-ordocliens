class BreadCrumb extends React.Component {
  render() {
    let links = this.props.links.map(link =>
      <li key={link.id}><a href={link.path}>{link.name}</a></li>
    );
    return (
      <div className="row">
        <div className="col-md-12">
          <ol className="breadcrumb">
            {links}
            <li className="active">{this.props.active}</li>
          </ol>
        </div>
      </div>
    );
  }
}

BreadCrumb.propTypes = {
  active: React.PropTypes.string.isRequired,
  links: React.PropTypes.array.isRequired,
};
