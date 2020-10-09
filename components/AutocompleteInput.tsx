import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import useDebounce from "../lib/useDebounce";

type Props = {
  placeholder: string;
  name: string;
  defaultValue: string;
  suggestions?: Array<Array<String>>;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
};

type Ref = HTMLInputElement;

const AutocompleteInput = React.forwardRef<Ref, Props>((props, ref: any) => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const debouncedInput = useDebounce(input, 500);

  // Effect for API call
  useEffect(() => {
    if (debouncedInput) {
      setShowSuggestions(true);
      const filteredSuggestions = props.suggestions.filter(suggestion => {
        let return_val = false;
        suggestion.map(item => {
          return_val =
            return_val ||
            item.toLowerCase().indexOf(debouncedInput.toLowerCase()) >= 0;
        });
        return return_val;
        // return suggestion.filter(choice => {
        //   return (
        //     suggestion.toLowerCase().indexOf(debouncedInput.toLowerCase()) >= 0
        //   );
        // })
      });

      setSuggestions(filteredSuggestions);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [debouncedInput]); // Only call effect if debounced search term changes

  const selectSuggestion = useCallback(suggestion => {
    if (ref && ref.current) {
      ref.current.value = suggestion[0];
      setShowSuggestions(false);
    }
  }, []);

  return (
    <Wrapper onBlur={() => setShowSuggestions(false)}>
      <input
        type="text"
        placeholder={props.placeholder}
        name={props.name}
        defaultValue={props.defaultValue}
        required={props.required}
        disabled={props.disabled}
        ref={ref}
        autoComplete="off"
        onChange={e => setInput(e.target.value)}
        maxLength={props.maxLength}
      />

      {suggestions.length > 0 && showSuggestions && (
        <Suggestions>
          {suggestions.map((suggestion, index) => {
            return (
              <Suggestion
                onMouseDown={e => {
                  e.preventDefault();
                  selectSuggestion(suggestion);
                }}
              >
                {suggestion[0]}
              </Suggestion>
            );
          })}
        </Suggestions>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
  input {
    width: 100%;
    box-sizing: border-box;
  }
`;

const Suggestions = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  z-index: 10;
  border-radius: 4px;
  box-shadow: 0px 2px 6px ${({ theme }) => theme.colors.gray25};
  box-sizing: border-box;
  max-height: 300px;
  overflow-y: scroll;
`;

const Suggestion = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray25};
  cursor: pointer;

  &:hover {
    background-color: #ededed;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export default AutocompleteInput;
