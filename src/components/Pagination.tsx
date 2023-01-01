import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
interface IPagination {
  limit: number;
  page: number;
  maxPages: number;
  onSelect?:(page:number)=> void
}
const Pagination: React.FC<IPagination> = (props) => {
  const { limit, maxPages, page,onSelect = (page)=> {} } = props;

  const _onSelect= (page:number)=> {
    onSelect(page > maxPages ? maxPages : page < 0 ? 0 : page)}
  return (
    <div className="pagination">
      <AiOutlineCaretLeft onClick={()=> _onSelect( page - 1)}/>
      <div className="number-cell">{page }</div>
      <AiOutlineCaretRight onClick={()=> _onSelect(page  + 1)}/>
    </div>
  );
};

export default Pagination;
