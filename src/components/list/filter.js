import '../../assets/css/filter.css'
import { useState, useEffect } from "react";
import { useContext } from 'react';
import { SearchContext } from './list';

let yearSelected = "";
let categorySelected = "";
let countrySelected = "";

const Filter = (props) =>{
    const setData = useContext(SearchContext);

    const [countries, setCountries] = useState([]);
    const [categories, setCategories] = useState([]);

    function GetAllCountries() {
        fetch(`http://localhost:8080/api/movie/country/list`, {
            "method": "GET",})
        .then(response => response.json())
        .then(response => {
            setCountries(response.message);
        })
        .catch(err => { console.log(err); });
    }

    function GetAllCategories() {
        fetch(`http://localhost:8080/api/movie/category/list`, {
            "method": "GET",})
        .then(response => response.json())
        .then(response => {
            setCategories(response.message);
        })
        .catch(err => { console.log(err); });
    }

    function selectStateTime(event) {
        yearSelected = event.target.value;
    }

    function selectCategory(event) {
        categorySelected = event.target.value;
    }

    function selectNation(event) {
        countrySelected = event?.target?.value;
    }


    function submitFilterForm(e) {
        e.preventDefault();
        fetch(`http://localhost:8080/api/movie/filter?country=${countrySelected}&year=${yearSelected}&category=${categorySelected}`, {
            "method": "GET",})
        .then(response => response.json())
        .then(response => {
            setData(response);
        })
        .catch(err => { console.log(err); });
        // let sortMovie= [] 
        // for (let movie of props.data.items) {
        //     sortMovie.push(movie);
        // }
        // sortMovie.sort(function(a, b) {
        //     return a.year - b.year;
        // })
        // let newData = JSON.parse(JSON.stringify(props.data));
        // newData.items = sortMovie;
        // props.setData(newData);
    }

    useEffect(() => {
        GetAllCountries();
        GetAllCategories();
      }, [])

    return (
        <form className="d-flex flex-wrap align-items-center" onSubmit={submitFilterForm}>
        <span className="px-3 py-2">L???c Phim</span>
        <div className="d-flex flex-wrap">
            <div className="px-2 py-2">
                <select onChange={selectStateTime} defaultValue={"year"}>
                    <option value={"year"} disabled hidden>N??m</option>
                    {Array(10).fill().map((m,i)=><option key={i} value={2022-i}>{2022-i}</option>)}
                </select>
            </div>
            <div className="px-2 py-2">
                <select onChange={selectCategory} defaultValue={"category"}>
                    <option value={"category"} disabled hidden>Th??? lo???i</option>
                    <option value="all">To??n b??? th??? lo???i</option>
                    {categories?.map((m,i)=><option value={m.categoryId} key={i}>{m.name}</option>)}
                </select>
            </div>
            <div className="px-2 py-2">
                <select onChange={selectNation} defaultValue={"nation"}>
                    <option value={"nation"} disabled hidden>Qu???c gia</option>
                    <option value="all">To??n b??? qu???c gia</option>
                    {countries?.map((m,i)=><option value={m.countryId} key={i}>{m.name}</option>)}
                </select>
            </div>
        </div>
        <div className="d-block py-2">
                <button className="submit-form mx-2 d-block" type="submit">L???c Phim</button>
            </div>
    </form>
    )
}

export {Filter};