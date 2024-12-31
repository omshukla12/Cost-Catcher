import React from "react";

const AddDetails = () => {
  return (
    <div className="font-inter">
      {/* TODO: FETCH PRODUCT DETAILS AND LOCK CURRENT PRICE FIELD OF THE PRODUCT */}
      <form>
        <p>When Product hits this price or low, we will notify you.</p>
        <div class="mb-6">
          <label
            for="default-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Target Price:
          </label>
          <input
            type="text"
            id="default-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5"
            placeholder="₹"
          />
        </div>
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Track
        </button>
      </form>
    </div>
  );
};

export default AddDetails;
