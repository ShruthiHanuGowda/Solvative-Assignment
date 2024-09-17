import React, { useEffect, useState } from 'react'
import { useSearchBarContext } from '../Pages/SearchContainer';
import axios from 'axios';
import Pagination from './SearchPagination';
import { useDebounce } from '../hooks/useDebounce';
import { ApiURL, SearchURL } from '../constants';

export default function Table() {
    const { searchVal } = useSearchBarContext();
    const [cityData, setCityData] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [paginationLinkList, setPaginationLinkList] = useState([]);
    const [currentpaginationLink, setCurrentPaginationLink] = useState(`${SearchURL}?offset=0&limit=5&namePrefix=''`);
    const [offset, setOffset] = useState(0);
    const debouncedSearchValue = useDebounce(searchVal, 500);
    const debouncedItemsPerPage = useDebounce(itemsPerPage, 500);
    const [limitError, setlimitError] = useState(false);

    useEffect(() => {
        if (searchVal.length > 0) {
            fetchData('search');
        } else {
            setCityData([]);
        }
    }, [debouncedSearchValue]);

    useEffect(() => {
        fetchData('pagination');
    }, [currentpaginationLink]);

    useEffect(() => {
        if (debouncedItemsPerPage <= 10) {
            fetchData('itemsPerPage');
            setlimitError(false);
        } else {
            setlimitError(true);
        }
    }, [debouncedItemsPerPage]);


    const fetchData = async (from) => {
        let url;
        if (from == 'search') {
            url = `${SearchURL}?offset=0&limit=5&namePrefix=${searchVal}`
        } else if (from === 'itemsPerPage') {
            url = `${SearchURL}?offset=0&limit=${itemsPerPage}&namePrefix=${searchVal}`;
        } else {
            url = currentpaginationLink;
        }
        const options = {
            method: 'GET',
            url: `${ApiURL}${url}`,
            headers: {
                'x-rapidapi-key': '9a8c42f994msh73af891e19917d0p15ea3djsnb1d771944446',
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
            },
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setCityData(response.data.data);
            setPaginationLinkList(response.data.links);
            setOffset(response.data.metadata.currentOffset);
        } catch (error) {
            console.error(error);
        }
    }

    const searchContent = () => {
        if (searchVal.length === 0 || searchVal === undefined || searchVal === null) {
            return <tr className='table_msg flex'>Start searching</tr>;
        } else {
            if (cityData.length > 0) {
                return cityData.map((city, index) => (
                    <tr key={`${index}_${city.id}`}>
                        <td>{offset + index + 1}</td>
                        <td>{city.name}</td>
                        <td className='per-page-container flex'>
                            <img className='countryName' src={`https://flagsapi.com/${city.countryCode}/shiny/16.png`} />
                            <span>{city.country}</span>
                        </td>
                    </tr>
                ));
            } else {
                return <tr className='message flex'>No result found</tr>
            }

        }
    };
    return (
        <div className='tableContainer'>
            <div className='flex pageContainer'>
                <label htmlFor="">Items per Page</label>
                <input type="number" value={itemsPerPage} placeholder='Items per page' onChange={(e) => setItemsPerPage(e.target.value)} min={5} max={10} />
            </div>
            {limitError && <small className="error">More than 10 items per page not allowed.</small>}
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Place Name</th>
                        <th>Country</th>
                    </tr>

                </thead>
                <tbody>
                    {searchContent()}
                </tbody>
            </table>
            {
                paginationLinkList?.length > 0 && <Pagination list={paginationLinkList} setCurrentLinkFn={setCurrentPaginationLink} />
            }
        </div>
    )
}
