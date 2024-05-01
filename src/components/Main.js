import {Link, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";

function Main() {
    const [datas, setDatas] = useState([]);
    const [state, setState] = useState(false);
    const [curPage, setCurPage] = useState(0);
    const [input, setInput] = useState("");
    const pages = [];
    const [sort, setSort] = useState("");
    for (let i = 1; i < 16; i++) pages.push(i);
    useEffect(() => {
        fetch("http://localhost:5000", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(sort ? {page: curPage, "sort": sort} : {page: curPage})
        })
            .then(r => r.json())
            .then(resp => {
                setDatas(resp);
                setState(true);
            })
            .catch(err => console.log(err));
    }, [curPage, sort]);
    return (
        <div>
            <Outlet/>
            {state ? <div>
                    <div className="search-bar">
                        <Link to={input + "-filter"}>
                            <button>Поиск</button>
                        </Link>
                        <input value={input} onChange={(event) => {
                            setInput(event.target.value)
                        }}/>
                    </div>
                    <table>
                        <thead>
                        <th scope="col">
                            <button onClick={() => setSort("name.last")}>&darr;</button>
                            <div>ФИО</div>
                        </th>
                        <th scope="col">
                            <button onClick={() => setSort("gender")}>&darr;</button>
                            <div>Пол</div>
                        </th>
                        <th scope="col">
                            <button onClick={() => setSort("location.country")}>&darr;</button>
                            <div>Страна</div>
                        </th>
                        <th scope="col">
                            <button onClick={() => setSort("dob")}>&darr;</button>
                            <div>Дата рождения</div>
                        </th>
                        <th scope="col">
                            <button onClick={() => setSort("email")}>&darr;</button>
                            <div>Адрес электронной почты</div>
                        </th>
                        <th scope="col">
                            <button onClick={() => setSort("phone")}>&darr;</button>
                            <div>Домашний телефон</div>
                        </th>
                        <th scope="col">
                            <button onClick={() => setSort("cell")}>&darr;</button>
                            <div>Мобильный телефон</div>
                        </th>
                        <tbody>
                        {datas.map((item, i) => <tr key={i}>
                            <th scope="row">{item.name.first + " " + item.name.last}</th>
                            <td>{item.gender}</td>
                            <td>{item.location.country}</td>
                            <td>{item.dob}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.cell}</td>
                        </tr>)
                        }
                        </tbody>
                        </thead>
                    </table>
                    <ul onClick={(event) => {
                        if (event.target.nodeName === "BUTTON") {
                            event.preventDefault();
                            setCurPage(+event.target.innerText - 1);
                        }
                    }} className="pagination-block">
                        {pages.map((num, i) => <li key={i * 123}>
                            <button key={num} style={curPage === i ? {background: "gray"} : {}}>{num}</button>
                        </li>)}
                    </ul>
                </div> :
                <div className="loader">
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>}

        </div>
    )
}

export default Main;