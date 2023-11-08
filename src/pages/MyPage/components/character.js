export const LbCharacterRow = ({ title, desc, className }) => {
  return (
    <div className={"px-2 sm:px-4 grid grid-cols-2 gap-4 text-sm lg:text-base items-center " + className}>
      <dt className="leading-6 text-gray-100">{title}</dt>
      <dd className="mt-1 leading-6 text-gray-200">{desc}</dd>
    </div>
  );
}

export const LbCharacterPanel = ({ title, children }) => {
  return (
    <div className="mb-4 border rounded-md lb-text-font border-gray-500">
      <div className="px-2 py-2 border-b sm:px-4 border-gray-600">
        <h3 className="text-lg leading-7 text-gray-100 lg:text-xl">{title}</h3>
      </div>
      <dl className="divide-y divide-gray-700">
        {children}
      </dl>
    </div>
  );
}
                       