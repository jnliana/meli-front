import "./Breadcrumb.scss";

const Breadcrumb = (props) => {
  let categoriesBreadCrumb = "";
  if (props.categories && props.categories.length > 0) {
    props.categories.map((item) => {
      if (item?.name) {
        return (categoriesBreadCrumb += `${item.name} >`);
      } else {
        return (categoriesBreadCrumb += `${item} >`);
      }
    });
  }

  return (
    <div className="breadcrumb">
      <span>{categoriesBreadCrumb.slice(0, -1)}</span>
    </div>
  );
};

export default Breadcrumb;
