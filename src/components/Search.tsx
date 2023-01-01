import { useEffect, useRef, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineHistory,
  AiOutlineSearch,
} from "react-icons/ai";
import { DATA } from "../data/data";
import { _GetlocalStorage, _SetlocalStorage } from "../method/local";
interface ISearch {
  value?: string | number | undefined;
  onChange?: (e: any) => void;
  onSelect?: (e: any, text?: string) => void;
}
interface IData {
  _id?: string;
  title: string;
  description: string;
  dateSearched?: Date | string;
}
let typing: any;
const Search: React.FC<ISearch> = (props) => {
  const [value, setValue] = useState<string | any>(props.value);
  const [data, setData] = useState<IData[]>([]);
  const [historyData, setHistoryData] = useState<IData[]>([]);
  const [tempValue, setTempValue] = useState<string | any>(null);
  const [isActive, setIsActive] = useState<number>(-1);
  const inputRef = useRef<any>(null);

  const onSearch = (e: any) => {
    clearTimeout(typing);
    typing = setTimeout(() => {
      let _data = [...historyData, ...DATA]
        .filter(
          (item) =>
            item.title.includes(inputRef.current.value) ||
            item.description.includes(inputRef.current.value)
        )
        .slice(0, 10);
      setData(_data);
      
      setIsActive(-1);
    }, 250);
    setValue(inputRef.current.value);
  };

  useEffect(() => {
    let resJson: any[] = _GetlocalStorage("history");
    if (resJson) {
      setHistoryData(resJson);
    }
    setValue(props.value);
    inputRef.current.focus();
  }, [props.value]);

  const _onSelect = (value: string, valueSelect?: any) => {
    if (valueSelect) {
      let updateHistory = { ...valueSelect, dateSearched: new Date() };
      let res: any[] = _GetlocalStorage("history");
      if (res) {
        let indexOf = res.findIndex((item) => item._id === updateHistory._id);
        indexOf >= 0 ? (res[indexOf] = updateHistory) : res.push(updateHistory);

        _SetlocalStorage("history", res);
      } else {
        _SetlocalStorage("history", [updateHistory]);
      }
    }
    window.location.href = `/search?text=${value}&page=1`;
  };

  return (
    <div className="header-search" style={{ minWidth: "30%" }}>
      <div className="search-box">
        <div className="search-typing">
          <div className="search-icon">
            <AiOutlineSearch />
          </div>
          <input
            // onFocus={}
            ref={inputRef}
            value={isActive >= 0 ? tempValue : value}
            onKeyDown={(e) => {
              let _isActive = isActive;
              if (e.key === "Enter") {
                _onSelect(
                  inputRef.current.value,
                  _isActive >= 0 ? data[_isActive] : undefined
                );
              } else if (e.key === "ArrowDown") {
                _isActive = isActive === data.length - 1 ? -1 : isActive + 1;
              } else if (e.key === "ArrowUp") {
                _isActive = isActive === -1 ? data.length - 1 : isActive - 1;
              }
              _isActive >= 0 && setTempValue(data[_isActive].title);
              setIsActive(_isActive);
            }}
            className="search-input"
            placeholder="Search..."
            onChange={onSearch}
          />
        </div>
        {value?.length > 0 && data.length > 0 && (
          <ul className="autocomplete">
            {data.map((item: IData, index: number) => {
              let text = item.title.replace(value, `<b>${value}</b>`);
              return (
                <li
                  className={`item-list ${isActive === index ? "active" : ""}`}
                  key={item._id}
                  onClick={() => _onSelect(value, item)}
                >
                  <div className="search-icon">
                    {item.dateSearched ? (
                      <AiOutlineHistory />
                    ) : (
                      <AiOutlineSearch />
                    )}
                  </div>
                  <span
                    style={{
                      flex: 1,
                      color: item.dateSearched ? "purple" : "black",
                    }}
                    dangerouslySetInnerHTML={{ __html: text }}
                  />

                  {item.dateSearched && (
                    <span
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        let res: any[] = _GetlocalStorage("history");
                        let indexOf = res.findIndex(
                          (_item) => _item._id === item._id
                        );
                        indexOf >= 0 && res.splice(indexOf, 1);
                        indexOf >= 0 && data.splice(index, 1);
                        setHistoryData(res);
                        _SetlocalStorage("history", res);
                      }}
                    >
                      {" "}
                      <AiOutlineDelete />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
