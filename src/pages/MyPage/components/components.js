import classNames from "classnames";

export const LbPropsDesc = ({ title, desc, className }) => {
  return (
    <div className={"grid grid-cols-3 gap-4 text-sm sm:text-base " + className}>
      <dt className="text-gray-100 break-words">{title}</dt>
      <dd className="col-span-2 text-gray-200 break-words">{desc}</dd>
    </div>
  );
}

export const LbProfilePanel = ({ title, desc, children, className }) => {
  return (
    <div className="lb-text-font">
      <div className="flex pb-6 border-b border-gray-400 sm:px-4">
        <h3 className="flex-grow text-xl leading-7 text-gray-100 lg:text-2xl">{title}</h3>
        <h4 className="text-lg leading-7 text-gray-100 w-fit lg:text-xl">{desc}</h4>
      </div>
      <div className={className}>
        {children}
      </div>
    </div>
  );
}

export const LbPropsContainer = ({ children, devide, className }) => {
  return (
    <dl className={classNames('sm:px-4', className, {
      " divide-y divide-gray-800": devide,
    })}>
      {children}
    </dl>
  );
}
                            