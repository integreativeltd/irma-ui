"use client";
import * as React from "react";

export const MarketingPanel = () => {
  return (
    <section className="flex relative flex-col flex-1 justify-center p-10 text-white max-md:px-5 max-md:py-8">
      <img
        alt="Professional office environment with people working"
        src="https://images.pexels.com/photos/7534168/pexels-photo-7534168.jpeg"
        className="object-cover overflow-hidden absolute top-0 left-0 aspect-square size-full z-[-1]"
      />
            <div className="absolute inset-0 bg-black/60 z-[-1]" />

      <div className="mb-10">
        <p className="mb-4 text-lg font-medium text-orange-400">
         Register – Collect – Reconcile
        </p>
        {/* <h1 className="mb-6 text-5xl font-bold leading-tight max-md:text-4xl">
        Collect Smarter, Manage Better – The IRMA Revenue Platform
        </h1> */}
        <h1 className="mb-6 text-5xl font-bold leading-tight max-w-2xl max-md:text-4xl">
         Collect Smarter, Manage Better – The IRMA Revenue Platform
        </h1>
        <p className="text-xl leading-relaxed text-white">
        From taxpayer registration to payment tracking and audit reporting — our digital
        revenue platform simplifies tax management for government agencies and ensures
        accountability across local, state, and federal tiers.
        </p>
      </div>
    </section>
  );
};
