import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';

//DataType
type Properties = {
    [key: string]: string | number;
};

type Item = {
    guid: string;
    name: string;
    path: Array<string>;
    properties: Properties;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Item[] = [{ guid: "guid1", name: "name1", path: ["path1", "path2"], properties: { propString: "value1", propNumber: 1, date: "10/10/2014" } }, { guid: "guid2", name: "name2", path: ["path3", "path4"], properties: { "property3": "value3", "property4": "value4" } }, { guid: "guid3", name: "nfda df asf asdame3", path: ["path5", "path6"], properties: { "property5": "value5", "property6": "value6" } }, { guid: "guid4", name: "name4", path: ["path7", "path8"], properties: { "property7": "value7", "property8": "value8" } }, { guid: "guid5", name: "name5 fdaf adsfsadas", path: ["path9", "path10"], properties: { "property9": "value9", "property10": "value10" } }]




const Table = () => {
    //should be memoized or stable
    const columns = useMemo<MRT_ColumnDef<Item>[]>(
        () => [
            {
                accessorKey: 'guid', 
                header: 'guid',
                size: 150,
            },
            {
                accessorKey: 'name',
                header: 'Name',
                size: 150,
            },
            {
                accessorKey: 'path', //normal accessorKey
                header: 'Path',
                size: 200,
            },
        ],
        [],
    );

    
    const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    });


    return (
        <MaterialReactTable table={table} />
    )
}

export default Table