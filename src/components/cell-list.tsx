import { Fragment } from "react/jsx-runtime";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";

const CellList:React.FC = () => {
    const cells = useTypedSelector(({cells: {order, data}}) => order.map(id => data[id]));
    
    const renderedCells = cells.map(cell => (
            <Fragment key={cell.id}>
                <AddCell previousCellId={cell.id} />
                <CellListItem  cell={cell} />
            </Fragment>
        ));
    
    return <div>
        {renderedCells}
        <AddCell forceVisible={cells.length === 0} previousCellId={null} />
    </div>
}
export default CellList;