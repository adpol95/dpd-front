import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [datas, setDatas] = useState([]);
    const [state, setState] = useState(false);
    const [curPage, setCurPage] = useState(1);
    const pages = [];
    for (let i= 1; i < 15; i++) pages.push(i);
    useEffect(() => {
        fetch("http://localhost:5000", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({page: curPage})
        })
            .then(r => r.json())
            .then(resp => {
                setDatas(resp);
                setState(true);
            })
            .catch(err => console.log(err));
    }, [curPage]);
    return (
        <div className="App">
            {state ? <div>
                    <table>
                        <thead>
                        <th scope="col">ФИО</th>
                        <th scope="col">Пол</th>
                        <th scope="col">Страна</th>
                        <th scope="col">Дата рождения</th>
                        <th scope="col">Адрес электронной почты</th>
                        <th scope="col">Домашний телефон</th>
                        <th scope="col">Мобильный телефон</th>
                        <tbody>
                        {datas.map((item, i) => <tr key={i}>
                            <th scope="row">{item.name.first + " " + item.name.last}</th>
                            <td>{item.gender}</td>
                            <td>{item.location.country}</td>
                            <td>{item.dob.date}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.cell}</td>
                        </tr>)
                        }
                        </tbody>
                        </thead>
                    </table>
                    <div className="pagination-block">
                        <ul onClick={(event) => {
                            event.preventDefault();
                            setCurPage(event.target.innerText)
                        }}>
                            {pages.map((num, i) => <li key={i * 123}>{num}</li>)}
                        </ul>
                    </div>
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
    );
}

export default App;
