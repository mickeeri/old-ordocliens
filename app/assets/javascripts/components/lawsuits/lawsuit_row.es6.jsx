function LawsuitRow({ lawsuit }) {
  console.log(lawsuit);
  return (
    <div>
      <hr />
      <a
        href={Routes.lawsuit_path(lawsuit.id)}
      >{lawsuit.name}
      </a>
    </div>
  );
}

LawsuitRow.propTypes = {
  lawsuit: React.PropTypes.object.isRequired,
};

// {lawsuit.counterparts.map(counterpart =>
//   <p>{counterpart.name})</p>)}
