import React, { useEffect, useState } from 'react';

interface Option {
    id: string;
    label: string;
}

interface DropdownProps {
    placeholder: string;
    options: Option[];
    activeOptionId: string;
    onOptionChange: (optionId: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ placeholder, options, activeOptionId, onOptionChange }) => {
    const [selectedOptionId, setSelectedOptionId] = useState<string>(activeOptionId);

    useEffect(() => {
        setSelectedOptionId(activeOptionId);
    }, [activeOptionId]);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSelectedOptionId = event.target.value;
        setSelectedOptionId(newSelectedOptionId);
        onOptionChange(newSelectedOptionId);
    };

    return (
        <div className="dropdown">
            <select value={selectedOptionId} onChange={handleSelect}>
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.label}
                    </option>
                ))}
            </select>
            {selectedOptionId && (
                <div>
                    Выбранный элемент: {options.find(option => option.id === selectedOptionId)?.label}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
