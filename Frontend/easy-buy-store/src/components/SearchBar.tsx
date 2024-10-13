import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounced";
import { FaSearch } from "react-icons/fa";

type Props = {
  onSearch: Function;
};

const SearchBar = (props: Props) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    props.onSearch(debouncedQuery);
  }, [debouncedQuery]);

  const handleInputChange = (e: any) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex flex-row items-center border-b border-sky-900 py-2">
      <FaSearch className="text-gray-500 mr-2" />
      <input
        className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
