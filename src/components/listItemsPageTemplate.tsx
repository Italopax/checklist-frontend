import { Dispatch, SetStateAction } from "react";
import Button from "./button";
import Divisor from "./divisor";
import Input from "./input";

interface ListItemsPageTemplateProps {
  children: React.ReactNode;
  inputSearch: {
    placeholder: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
  };
  searchButton: {
    text: string;
    onClick: () => void;
  };
  createButton: {
    text: string;
    onClick: () => void;
  };
}

export default function ListItemsPageTemplate ({ children, inputSearch, searchButton, createButton }: ListItemsPageTemplateProps) {
  return (
    <section
      className="flex max-w-7xl m-auto px-16 gap-4 justify-between items-center"
    >
      <div className="flex flex-col flex-1 p-4 rounded gap-8">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Input
              type='text'
              placeholder={inputSearch.placeholder}
              value={inputSearch.value}
              setValue={inputSearch.setValue}
            />
            <Button
              text={searchButton.text}
              type='button'
              onClick={searchButton.onClick}
              secondaryColor
            />
          </div>
          <div className="flex gap-4">
            <Button
              text={createButton.text}
              type='button'
              secondaryColor
              onClick={createButton.onClick}
            />
          </div>
        </div>
        <Divisor />
        { children }
      </div>
    </section>
  );
} 