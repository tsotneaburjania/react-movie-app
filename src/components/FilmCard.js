import React from 'react'
import { Link } from 'react-router-dom';

function FilmCard(props) {
    function between(x, min, max) {
        return x >= min && x <= max;
    }


    var formattedTitle = props.title;
    if (props.title.length >= 25){
        var formattedTitle = props.title.slice(0, 25) + '...';
    }
    var formattedDesc = props.overview;
    if (props.overview.length >= 25){
        var formattedDesc = props.overview.slice(0, 250) + '...';
    }
    var formattedYear = props.release.substring(0, props.release.indexOf('-'))

    var color = 'black'
    if (between(props.vote, 0.0, 5.0)){
        color = 'red'
    }
    else if (between(props.vote, 5.1, 7.3)){
        color = 'orange'
    }
    else if (between(props.vote, 7.4, 10)){
        color = 'green'
    }
    return (
        <Link to={{
            pathname: `/`+props.id,
            state: {id: props.id}
        }}>
            <img src={props.image}/>
            <div className='thumbTexts'>
                <h3>{formattedTitle}</h3>
                <h5>{formattedYear}</h5>
                <h5 className='voteScore' style={{color: color}}>{props.vote}</h5>
                <h5>{formattedDesc}</h5>
            </div>
        </Link>
    )
}

export default FilmCard
