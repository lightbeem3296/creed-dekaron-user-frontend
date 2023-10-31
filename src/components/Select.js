export const LbSelect = ({ label, options, placeholder, ...rest }) => {
  return (
    <div className="py-1 form-field">
      <label className="text-sm sm:text-base form-label" >{label}</label>
      <select className="py-0 text-sm bg-gray-900 border sm:text-base select select-sm" defaultValue="none" {...rest}>
        <option value="none" disabled hidden>{placeholder || 'Select an Option'}</option>
        {Object.entries(options).map(([k, v]) => (
          <option key={k} value={k}>{v}</option>
        ))}
      </select>
    </div>
  );
}
                  