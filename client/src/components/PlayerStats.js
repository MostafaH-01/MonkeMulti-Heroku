import React, {useState, useEffect} from 'react';

import 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SERVER_URL from "../constants";

export default function PlayerStats({ username }) {

    const [stats, setStats] = useState(
        {
            rating: '-',
            winrate: '-',
            roundsPlayed: '-',
            gamesPlayed: '-',
        }
    );
    
    async function getStats(){
        try{
            console.log('Reacccccccccccccccched getting stats');
            const res = await fetch(`${SERVER_URL}/getstats`, {
                method: 'POST',
                body: JSON.stringify({ username }),
                headers: { 'Content-Type' : 'application/json' },
                credentials: 'include'
            });
            const data = await res.json();
            console.log("Stats data is:" +  data);
            let err_text = document.getElementById('stats-container');
            if(data.error){
                console.log("error in getting stats: " + data.error);
                err_text.innerHTML = "Your session ended - Please login again";
            }else{
                console.log("reached the else condition");
                setStats({rating:data.rating, winrate:data.winrate, roundsPlayed:data.roundsPlayed, gamesPlayed:data.gamesPlayed});
                //console.log(gamesPlayed + ", " + roundsPlayed + ", " + rating + ", " + winrate);
            }
        }catch(err){
            console.log(err);
        }
    }
    getStats();
    
    return (
        <div id='stats-container' className="text-danger w-100">
            <table className="table table-dark table-striped text-light">
                <tr className="text-light">
                    <th>Rating</th>
                    <th>Winrate</th>
                    <th>Games Played</th>
                    <th>Rounds Played</th>
                </tr>
                <tr className="text-light">
                    <th id="rating">{stats.rating}</th>
                    <th id="winrate">{stats.winrate}%</th>
                    <th id="gamesPlayed">{stats.gamesPlayed}</th>
                    <th id="roundsPlayed">{stats.roundsPlayed}</th>
                </tr>
            </table>
        </div>
    );
}