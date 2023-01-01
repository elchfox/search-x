import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineHistory } from "react-icons/ai";
import { _GetlocalStorage, _SetlocalStorage } from "../method/local";

const History = () => {
  const [historyData, setHistoryData] = useState<any[]>([]);
  useEffect(() => {
    let resJson: any[] = _GetlocalStorage("history");
    if (resJson) {
      setHistoryData(resJson);
    }
  }, []);
  return (
    <div className="search-box">
      <div className="autocomplete">
        {historyData.map((item: any, index: number) => {
          return (
            <div
              className={`item-list`}
              key={item._id}
              // onClick={() => _onSelect(value, item)}
            >
              <div className="search-icon">
                <AiOutlineHistory />
              </div>
              <span style={{ flex: 1 }}>{item.title} </span>
              <span style={{ flex: 1 }}>{item.dateSearched} </span>

              <span
                className="delete-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  let res: any[] = _GetlocalStorage("history");
                  let indexOf = res.findIndex(
                    (_item) => _item._id === item._id
                  );
                  indexOf >= 0 && historyData.splice(index, 1);
                  setHistoryData([...historyData]);
                  _SetlocalStorage("history",historyData)
                }}
              >
                <AiOutlineDelete />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
