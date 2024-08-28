import React from "react";
import { Table } from "react-bootstrap";

export default function DataTable(props) {

    const { keys, values } = props;

    return (
        <Table responsive>
            <thead>
                <tr className="table_head_row_cls">
                    {keys?.map((val, i) =>
                        <td key={i}>{val?.name}</td>
                    )}
                </tr>
            </thead>
            {values?.length === 0 ?
                <tbody>
                    <tr>
                        <td colSpan={keys?.length} className="text-center h6">No Records Found</td>
                    </tr>
                </tbody> :
                <tbody>
                    {values?.map((val, valueInd) =>
                        <tr key={valueInd} className="table_body_row_cls">
                            {keys?.map((k, keyInd) =>
                                <>
                                    <td>
                                        <div>{val[k?.accessor] ? val[k?.accessor] : "--"}</div>
                                    </td>
                                </>
                            )}
                        </tr>
                    )}
                </tbody>
            }
        </Table>
    )
}