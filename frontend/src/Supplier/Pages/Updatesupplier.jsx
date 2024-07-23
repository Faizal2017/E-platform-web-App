import React from "react";
import Card from "../../Shared/Components/UiElements/Card";
import SupplierformUpdate from "./Components/Supplierformupdate";
import Navbar from "../../Shared/Components/UiElements/Navbar";
import Header from "../../Shared/Components/UiElements/header";

const Updatesupplier = () => {
  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Navbar select={"Product Details"}/>
      <Header/>
      <div className="main-content ml-64 w-full h-screen overflow-y-auto bg-gray-50 pt-14 dark:bg-gray-900">
        <SupplierformUpdate />
      </div>
      </div>
    </>
  );
};

export default Updatesupplier;