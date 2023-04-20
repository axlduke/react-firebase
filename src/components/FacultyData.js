export const userColumns = [
    { field: "id", headerName: "ID", width: 100 },
        {
        field: "name",
        headerName: "Full Name",
        width: 250,
        renderCell: (params) => {
            return (
            <div className="cellWithImg">
                <img className="cellImg" src={params.row.img} alt="" />
                {params.row.name}
            </div>
            );
        },
        },
        {
        field: "address",
        headerName: "address",
        width: 200,
        },
        // {
        // field: "address",
        // headerName: "ID",
        // width: 200,
        // },
        {
        field: "monday",
        headerName: "Monday",
        width: 100,
        },
        {
        field: "tuesday",
        headerName: "Tuesday",
        width: 100,
        },
        // {
        // field: "wednesday",
        // headerName: "Wednesday",
        // width: 100,
        // },
        // {
        // field: "thursday",
        // headerName: "Thursday",
        // width: 100,
        // },
        // {
        // field: "friday",
        // headerName: "Friday",
        // width: 100,
        // },
    //     {
    //     field: "status",
    //     headerName: "Status",
    //     width: 200,
    //     renderCell: (params) => {
    //         return (
    //         <div className={`cellWithStatus ${params.row.status}`}>
    //             {params.row.status}
    //         </div>
    //         );
    //     },
    // },
];