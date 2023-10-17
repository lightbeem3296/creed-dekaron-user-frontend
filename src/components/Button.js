import classNames from "classnames"

export const LbSkewButton = ({ selected, children }) => {
  return (
    <div
      className={classNames("px-4 py-2 lb-transition skew-x-12", {
        "lb-btn-color-sel": selected,
        "lb-btn-color": !selected,
      })}
    >
      <div className="text-lg text-white -skew-x-12 lb-text-font">
        {children}
      </div>
    </div >
  );
}

export const LbButton = ({ children, className, ...rest }) => {
  return (
    <button className={classNames("btn px-4 py-2 lb-transition lb-btn-color-sel rounded-md lb-text-font", className)} {...rest}>
      {children}
    </button>
  );
}

export const LbLabelButton = ({ className, children, ...rest }) => {
  return (
    <label className={classNames("btn btn-sm lb-btn-color border border-gray-800/50 ", className)} {...rest}>
      {children}
    </label>
  );
}
    