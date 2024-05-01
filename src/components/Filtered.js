import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function Filtered() {
    const url = useLocation().pathname.slice(1, useLocation().pathname.indexOf("-filter"));
    const [curPage, setCurPage] = useState(0);
    const [datas, setDatas] = useState([]);
    const redirectBack = useNavigate();
    const [input, setInput] = useState("");
    const [check, setCheck] = useState(false);
    useEffect(() => {
        fetch("dpdback-gw9gfuby.b4a.run/filter", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title: url, page: curPage})
        })
            .then(r => r.json())
            .then(resp => {
                setDatas(resp);
                if (typeof resp === "string") {
                    alert(resp);
                    redirectBack("/")
                }
            })
            .catch(err => console.log(err));
    }, [curPage, check]);
    return (
        <div>
            <div className="search-bar">
                <Link to={"/" + input + "-filter"}>
                    <button onClick={() => {
                        setCheck(!check);
                        setInput("");
                        setCurPage(0)
                    }}>Поиск
                    </button>
                </Link>
                <input value={input} onChange={(event) => {
                    setInput(event.target.value);
                }}/>

            </div>
            <table>
                <thead>
                <th scope="col">
                    <div>ФИО</div>
                </th>
                <th scope="col">
                    <div>Пол</div>
                </th>
                <th scope="col">
                    <div>Страна</div>
                </th>
                <th scope="col">
                    <div>Дата рождения</div>
                </th>
                <th scope="col">
                    <div>Адрес электронной почты</div>
                </th>
                <th scope="col">
                    <div>Домашний телефон</div>
                </th>
                <th scope="col">
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
            <ul className="pagination-block">
                <li key="238">
                    <button key="25342" disabled={!curPage}
                            onClick={(event) => {
                                event.preventDefault();
                                setCurPage(curPage - 1)
                            }} style={!curPage ? {background: "gray"} : {}}>
                        {"<"}
                    </button>
                </li>
                <li key="234" style={{color: "#dc0032"}}>{curPage + 1}</li>
                <li key="235">{curPage + 2}</li>
                <li key="237">{curPage + 3}</li>
                <li>
                    <button key="2567" disabled={datas.length < 21}
                            onClick={() => setCurPage(curPage + 1)}
                            style={datas.length < 21 ? {background: "gray"} : {} }>
                        {">"}
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Filtered;