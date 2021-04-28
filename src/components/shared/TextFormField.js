const TextFormField = (props) => (
  <div className="mb-4 box-border">
    <label className="text-sm text-gray-500 font-medium">
      {props.label}
      <input
        className="block mt-2 border-2 border-gray-500 text-black text-base border-opacity-50 rounded w-full h-11 pl-3"
        {...props}
      />
    </label>
  </div>
);

export default TextFormField;
