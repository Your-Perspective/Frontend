"use client";

import * as React from "react";
import DropdownCompo from "../drop-down/DropdownCompo";
import { Products, ProductsOptionsSelect } from "@/constrain/Products";
import ProductCard from "./ProductCard";
export default function ProductList() {
  return (
    <div>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-5">
        {ProductsOptionsSelect.map((item, index) => (
          <DropdownCompo
            key={item.display_name}
            display_name={item.display_name}
            label={item.label}
            items={item.items}
          />
        ))}
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 my-7">
        {Products.map((item) => (
          <ProductCard
            key={item.uuid}
            uuid={item.uuid}
            oldPrice={item.oldPrice}
            newPrice={item.newPrice}
            thumbnail={item.thumbnail}
            title={item.title}
            type={item.type}
            description={item.description}
            colors={item.colors}
          />
        ))}
      </div>
    </div>
  );
}
