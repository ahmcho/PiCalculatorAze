import React, {useState} from 'react';
import '../styles/SearchForm.css';

const SearchForm = () => {
    const [number,setNumber] = useState('');
    const [finalResult,setFinalResult] = useState('');
    const message = document.querySelector('.message');
           
    const calculateEnding = (number) => {
        const lastDigit = number.toString().split('').pop();
        let lastTwoDigits = number.toString().substr(-2);
        let lastFourDigits = number.toString().substr(-4);
        switch (lastDigit) {
            case "1":
            case "2":
            case "5":
            case "7":
            case "8":
                return `${number}-ci`
            case "3":
            case "4":
                return `${number}-cü`
            case "6":
                return `${number}-cı`
            case "9":
                return `${number}-cu`
            case "0":
                switch(lastTwoDigits){
                    case "10":
                    case "30":
                        return `${number}-cu`
                    case "20":
                    case "50":
                    case "70":
                    case "80":
                        return `${number}-ci`
                    case "40":
                    case "60":
                    case "90":
                        return `${number}-cı`
                    case "00":
                        switch(lastFourDigits){
                            default:
                                return `${number}-ci`
                        }
                        return `${number}-cü`
                    
                    
                }
            default:
                return `${number} pozisiyasında`
        }
    }
    
    const searchNumber = (e) => {
        e.preventDefault();
        const input = document.getElementById('search');
        console.log(fetchData(input.value))
    }

    const fetchData = async (data = '420') => {
        console.log(data);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Cookie", "__cfduid=d43c3fccba6389bc1f11a062543e8be551593162472");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("q", data);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.angio.net/newpi/piquery`, requestOptions)
        const result = await response.json();
        const status = result.r[0].status;
        if(status === "notfound"){
            message.style.color = "red";
            return setFinalResult(`Bu rəqəm tapılmadı`);
        } else {    
            try {
                console.log(result);
                message.style.color = "black";
                return setFinalResult(`${data} rəqəmi ${calculateEnding(result.r[0].p)} yerdə tapıldı. Bu rəqəm Pi ədədinin vergüldən sonrakı ilk 200 milyon rəqəmi arasında ${result.r[0].c} dəfə tapıldı`);
                
            } catch (error) {
                return setFinalResult(error)
            }
        }
    }
    return (
        <div className="container">
            <div className="form">
                <h1>Pi ədədində rəqəm tap!</h1>
                <form onSubmit={searchNumber}>
                    <input type="number" id="search" placeholder="Rəqəm yaz" value={number} onChange={(e) => setNumber(e.target.value) } required/>
                    <p className="message">{finalResult}</p>
                    <button>Axtar</button>
                </form>
            </div>
        </div>
    )
}

export { SearchForm as default };