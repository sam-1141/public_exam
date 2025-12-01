import React, { useState, useEffect, useRef, useMemo } from "react";
import Fuse from "fuse.js";
import { debounce } from "lodash";

const CollegeAutocomplete = ({ label, value, onChange, colleges, name }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  // Fuse.js setup (memoized)
  const fuse = useMemo(() => {
    return new Fuse(colleges, {
      keys: ["কলেজের নাম"], // search by college name
      includeScore: true,
      threshold: 0.3, // tweak for typo tolerance
      ignoreLocation: true,
    });
  }, [colleges]);

  // Debounced search function
  const search = useMemo(
    () =>
      debounce((query) => {
        if (!query) {
          setSuggestions([]);
          setShowDropdown(false);
          return;
        }
        const results = fuse.search(query, { limit: 10 }); // top 10 results
        setSuggestions(results.map((r) => r.item));
        setShowDropdown(results.length > 0);
      }, 200),
    [fuse]
  );

  const handleInput = (e) => {
    const val = e.target.value;
    onChange(e); // propagate to parent
    search(val);
  };

  const handleSelect = (college) => {
    onChange({ target: { name, value: college["কলেজের নাম"] } });
    setShowDropdown(false);
  };

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: "relative" }} ref={wrapperRef}>
      {label && <label>{label}</label>}
      <input
        type="text"
        name={name}
        placeholder={label || "Type to search"}
        value={value}
        onChange={handleInput}
        autoComplete="off"
        onFocus={(e) => {
          if (e.target.value) search(e.target.value);
        }}
      />
      {showDropdown && suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            border: "1px solid #d4d4d4",
            backgroundColor: "#fff",
            width: "100%",
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((c, idx) => (
            <div
              key={idx}
              style={{ padding: "8px", cursor: "pointer" }}
              onClick={() => handleSelect(c)}
            >
              {c["কলেজের নাম"]} - {c.EIIN}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollegeAutocomplete;
