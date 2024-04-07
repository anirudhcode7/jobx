import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { FaPlus } from 'react-icons/fa'; // Importing the plus icon from react-icons/fa

function StringList({ stringList, setStringList, placeholder, label }) {
  const [inputValue, setInputValue] = useState('');

  const handleAddString = () => {
    if (inputValue.trim() !== '') {
      setStringList([...stringList, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDeleteString = (index) => {
    const newList = [...stringList];
    newList.splice(index, 1);
    setStringList(newList);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddString();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <Input
          label={label}
          type="text"
          variant="flat"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleAddString} style={{ cursor: 'pointer' }}>
          <FaPlus />
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {stringList.map((string, index) => (
          <div key={index} style={{ marginRight: '10px', flexBasis: 'fit-content', flexGrow: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '6px 10px', borderRadius: '20px', border: '1px solid #ccc', maxWidth: '100%' }}>
              <span>{string}</span>
              <button onClick={() => handleDeleteString(index)} style={{ marginLeft: '5px', cursor: 'pointer', borderRadius: '20px' }}>❌</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StringList;
