import React from "react";

export default function Form({
  fields,
  fieldNames,
  onInputChange,
  onAdd,
  onRemove,
  onSubmit,
  submitButtonText,
}) {
  return (
    <div className="h-screen w-screen dark:bg-gray-900">
      <h1 className="text-white font-bold text-xl flex justify-center pt-4">
        {submitButtonText}
      </h1>
      <div className="flex justify-center mt-4">
        <form className="w-1/2 space-y-4 md:space-y-6" action="#">
          {fields.map((field, index) => (
            <div key={index} className="space-y-4">
              {fieldNames.map(({ name, label, placeholder }) => (
                <div key={name}>
                  <label
                    htmlFor={`${name}-${index}`}
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {label}
                  </label>
                  <input
                    type="text"
                    name={name}
                    id={`${name}-${index}`}
                    value={field[name]}
                    onChange={(e) => onInputChange(index, e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={placeholder}
                    required
                  />
                </div>
              ))}
            </div>
          ))}
          <div className="flex justify-between">
            <button
              onClick={onRemove}
              className="text-black bg-white w-10 rounded-md"
            >
              -
            </button>
            <button
              onClick={onAdd}
              className="text-black bg-white w-10 rounded-md"
            >
              +
            </button>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={onSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
