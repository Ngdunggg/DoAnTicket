import { useState } from "react";

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
    className?: string;
}

const SearchBar = ({ 
    placeholder = "Tìm kiếm...", 
    onSearch, 
    className = "" 
}: SearchBarProps) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.(searchValue);
    };

    return (
        <form onSubmit={handleSearch} className={`w-80 bg-white rounded-lg ${className}`}>
            <input 
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full h-full px-4 py-2 outline-none rounded-lg"
                placeholder={placeholder}
            />
        </form>
    );
};

export default SearchBar;
