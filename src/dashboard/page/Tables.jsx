import { useState } from "react";
import CardTable from "../components/Card/CardTable";
import ModalExample from "../components/Modal/ModalCreate";

// components

export default function Tables() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-3 rounded"
            onClick={handleOpenModal}
          >
            Add New
          </button>
        </div>

        <div className="w-full px-4">
          <CardTable />
        </div>
        {isOpen && <ModalExample isOpen={isOpen} setIsOpen={setIsOpen} />}
      </div>
    </>
  );
}
