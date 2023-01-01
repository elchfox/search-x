import { useEffect, useState } from "react";
import { AiOutlineHistory } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { DATA } from "../data/data";

const Result = () => {
  const [results, setResults] = useState<any[]>([]);
  const [text, setText] = useState<string | any>("");
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [startEnd, setstartEnd] = useState<string>("0");
  const navigate = useNavigate()
  const onSelect = (item: any) => {
    let startTime = performance.now();

    let params = new URLSearchParams(window.location.search);
    let value: any = params.get("text");
    let page: any = params.get("page");
    let _data = DATA.filter((e) => e.title.toLowerCase().includes(value));
    let endTime = performance.now();
    setText(value);
    setPage(Number(page));
    setResults(_data);
    setstartEnd((endTime - startTime) / 1000 + "");
  };

  useEffect(() => {
    onSelect({});
  }, [window.location.search]);

  return (
    <>
      <Search value={text} onSelect={onSelect} />
      <div style={{padding:"1rem"}}>
      <div className="search-info">
        Results: {results.length} Time Search: {startEnd}
      </div>
      {results?.length > 0 && (
        <div className="box-result">
          {results
            .slice((page - 1) * limit, (page - 1) * limit + limit)
            .map((item, index) => {

              return (
                <div
                  className="item-list"
                  key={item._id}>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              );
            })}
        </div>
      )}
      <div style={{display:"flex",justifyContent:"center"}}>
      <Pagination
        limit={limit}
        page={page}
        maxPages={Math.round(results.length / limit)}
        onSelect={(page) =>
          (window.location.href = `/search?text=${text}&page=${page}`)
        }
      />
      </div>
      <div className="float-btn" onClick={()=> navigate("/history")}>
      <AiOutlineHistory/>
      </div>
      </div>
    </>

  );
};

export default Result;
