import React, { useState, useEffect } from 'react';
import { columns } from "./beans/columns"
import { DataTable } from "./beans/data-table.jsx"

function getData(){
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Buttery Popcorn",
      color: "Yellow",
      flavor: "Butter",
    },
    // ...
  ]
}

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}