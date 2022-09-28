//Packages
import { useEffect, useRef, useState, useCallback } from 'react';

//Components
import { TbChevronDown } from 'react-icons/tb';
import { BsCheck } from 'react-icons/bs';

//Styles
import styles from './Dropdown.module.css';

const Dropdown = ({
  onItemAdd,
  dropdownItems,
  header,
  dropdownItemsSelected,
}) => {
  const containerRef = useRef('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const onDropdownItemSelect = useCallback(
    (item) => {
      onItemAdd(item);
      setIsOpen(false);
    },
    [onItemAdd]
  );

  const onDropdownClick = () => {
    setIsOpen((prev) => !prev);
  };
  const onDropdownBlur = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [isOpen]);

  useEffect(() => {
    const cntrRef = containerRef.current;
    const handler = (e) => {
      if (e.target !== cntrRef) return;
      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen((prev) => !prev);
          if (isOpen) onDropdownItemSelect(dropdownItems[highlightedIndex]);
          break;
        case 'ArrowUp':
        case 'ArrowDown': {
          if (!isOpen) {
            setHighlightedIndex(1);
            setIsOpen(true);
            break;
          }
          const newIndexValue =
            highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);

          if (newIndexValue >= 0 && newIndexValue < dropdownItems.length) {
            setHighlightedIndex(newIndexValue);
          }
          break;
        }
        case 'Escape':
          setIsOpen(false);
          break;
        default:
          break;
      }
    };
    cntrRef.addEventListener('keydown', handler);

    return () => {
      cntrRef.removeEventListener('keydown', handler);
    };
  }, [dropdownItems, isOpen, highlightedIndex, onDropdownItemSelect]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={styles.container}
      onClick={onDropdownClick}
      onBlur={onDropdownBlur}
    >
      <div className={`${styles.dropdown}`}>
        <div className={styles.header}>
          {header}
          <TbChevronDown
            className={`${styles.chevron} ${isOpen && styles.rotated}`}
          />
        </div>
        <ul className={`${styles.options} ${isOpen && styles.open}`}>
          {dropdownItems.map((option, idx) => (
            <li
              key={idx}
              className={`${styles.option} ${
                highlightedIndex === idx && styles.highlighted
              }`}
              onMouseEnter={() => setHighlightedIndex(idx)}
              data-value={option}
              onClick={(e) => {
                e.stopPropagation();
                onDropdownItemSelect(option);
              }}
            >
              {option}
              {dropdownItemsSelected.includes(option) && (
                <BsCheck className={styles.checkmark} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
