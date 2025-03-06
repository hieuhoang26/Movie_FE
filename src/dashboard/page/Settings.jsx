import React from "react";
import CardSettings from "../components/Card/CardSettings";
import MovieModal from "../components/Modal/MovieModal";

// components

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-8/12 px-4">
          <MovieModal />
        </div>
      </div>
    </>
  );
}
