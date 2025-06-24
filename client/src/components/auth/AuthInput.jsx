export default function AuthInput({
  name,
  type,
  placeholder,
  error,
  handleChange
}) {
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor={name} className="text-sm font-bold tracking-wide">
        {placeholder}
      </label>
      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
      />
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}
