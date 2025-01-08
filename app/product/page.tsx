"use client";
import React from "react";
import ProductView from "./[detail]/(components)/product-view";

function page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <ProductView />
      <ProductView />
      <ProductView />
      <ProductView />

      {/* <Button onClick={()=>router.push("product/1")}>Detail</Button> */}
    </div>
  );
}

export default page;
