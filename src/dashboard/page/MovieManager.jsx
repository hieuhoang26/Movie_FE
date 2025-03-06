import { useState } from "react";
import { MdEdit } from "react-icons/md";

export default function MovieManager() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(!isOpen);

  return (
    <div className="container mx-auto p-4">
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleOpenModal}
      >
        Add New
      </button>

      <div className="w-full mt-6 overflow-auto">
        <table className="w-full border border-gray-300 bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {["Transaction", "Amount", "Date", "Status", ""].map((header) => (
                <th key={header} className="p-4 text-left border-b">
                  <p className="text-gray-700 font-medium">{header}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="p-4 border-b flex items-center gap-3">
                <img
                  src="https://docs.material-tailwind.com/img/logos/logo-spotify.svg"
                  alt="Spotify"
                  className="w-12 h-12 object-contain p-1 border rounded-md"
                />
                <p className="text-gray-900 font-semibold">Spotify</p>
              </td>
              <td className="p-4 border-b text-gray-700 font-medium">$2,500</td>
              <td className="p-4 border-b text-gray-700 font-medium">
                Wed 3:00pm
              </td>
              <td className="p-4 border-b">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-semibold">
                  Paid
                </span>
              </td>
              <td className="p-4 border-b text-center">
                <button className="p-2 rounded-full hover:bg-gray-200 transition">
                  <MdEdit />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
