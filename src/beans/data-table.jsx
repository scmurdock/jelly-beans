import {useState} from 'react';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import BeanForm from "./bean-form.jsx";

import PropTypes from 'prop-types';

import { Plus, Trash, Pencil  } from "lucide-react"

import { Button } from "@/components/ui/button"

export function DataTable({
  columns
}) {


  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingBean, setEditingBean] = useState({});
  const [data, setData] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    adding || editing ?
    <>
        <BeanForm editingBean={editingBean} editing={editing} setEditing={setEditing} adding={adding} setAdding={setAdding} data={data} setData={setData} /> 
    </> 
    :
      <>
      <div className="text-center">
        <h2>Jelly Beans</h2>
      </div>
      <div className="flex justify-end">
        <Button variant="ghost" size="icon" onClick={()=>{setAdding(true); setEditingBean({}) }}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="rounded-md border">

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, position) => (
                <TableRow
                  key={position}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>

                  ))}
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={()=>{
                      const beanArray = [...data];
                      beanArray.splice(row.id, 1);
                      setData(beanArray);
                      console.log(`Delete ${row.id}`) 
                      }}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={()=>{setEditing(true); setEditingBean(data[row.id]) }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>                  
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      </>
  )
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    accessorKey: PropTypes.string.isRequired,
    header: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]).isRequired,
    // Add other properties as needed
  })).isRequired,
  data: PropTypes.array.isRequired,
};