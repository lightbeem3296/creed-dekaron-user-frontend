import classNames from "classnames"

export const LbInput = ({ className, error, ...rest }) => {
  return (
    <input
      className={classNames('lb-text-font rounded-md px-2 py-1 ring-1 ring-inset ring-gray-200 ', {
        'focus:ring-red-600 border-2 border-red-600': error,
      }, className)}
      {...rest} />
  )
}

export const LbInputWithLabel = ({ label, className, ...rest }) => {
  return (
    <div className="py-1 form-field">
      <label className="text-sm sm:text-base form-label">{label}</label>
      <input className="h-8 py-0 text-sm bg-gray-900 border sm:text-base input" {...rest} />
    </div>
  );
}
            