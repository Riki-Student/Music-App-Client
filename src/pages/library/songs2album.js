import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Rating } from 'primereact/rating';



function Songs2album() {

    const { pId } = useParams()
    const [songs, setSongs] = useState([]);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {


        async function fetchData() {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
            }
            const { data } = await axios.get(`http://localhost:3600/api/songs/albumSongs/${pId}`, config);
            setSongs(data.slice(0, 12));
            setLoading(false);

        }
        fetchData();
        initFilters();
    }, [pId]);

    const onGlobalFilterChange = (e) => {

        const value = e.target.value;
        console.log(value)
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        console.log(filters)
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            songName: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            },
        });
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Search"
                    />
                </span>
            </div>
        );
    };

    const timeBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.duration}</span>
            </div>
        );
    };

    const nameBodyTemplate = (rowData) => {

        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.songName}</span>
            </div>
        );
    };

    const picBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <img
                    alt="picture"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2CQDBSm5MNncKaq8SQQEal_Z51qlQ93bvkQ&usqp=CAU"
                    //   className={`flag flag-${rowData.country.code}`}
                    style={{ width: '5px' }}
                />
            </div>
        );
    };

    const rateBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <Rating value={rowData.rating} readOnly cancel={false} />
            </div>
        );
    };

    const header = renderHeader();

    return (
        <div className="card">
            <DataTable
                value={songs}
                rows={10}
                loading={loading}
                dataKey="id"
                filters={filters}
                header={header}
                emptyMessage="No songs found."
            >
                <Column
                    style={{ minWidth: '12rem' }}
                    body={picBodyTemplate}
                />

                <Column
                    filterField="songName"
                    field="name"
                    style={{ minWidth: '12rem' }}
                    body={nameBodyTemplate}
                />
                <Column
                    style={{ minWidth: '25rem' }}
                    body={timeBodyTemplate}
                />
                <Column
                    style={{ minWidth: '25rem' }}
                    body={rateBodyTemplate}
                />

            </DataTable>
        </div>
    );


}

export default Songs2album