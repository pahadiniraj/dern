import React from "react";
import StatusIndicator from "./StatusIndicator";

const DetailItem = ({ label, value }) => {
  // console.log("value" + value);
  return (
    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="text-sm font-medium text-gray-500">{label}:</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      {value}

        {/* {value === "Submitted" ? <StatusIndicator color="blue" /> + "Submitted" : value} */}
      </dd>
    </div>
  );
};

const DetailPage = ({ pageTitle, pageDesc, detailItems }) => {
  return (
    <div className="bg-white h-auto overflow-hidden shadow rounded-lg border">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {pageTitle}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{pageDesc}</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          {detailItems.map((item, index) => (
            <DetailItem key={index} label={item.label} value={item.value} />
          ))}
        </dl>
      </div>
    </div>
  );
};

export default DetailPage;
