import React from 'react'

var displaydate = () => {
    var showdate=new Date();
    var displaytodaysdate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
    var dt=showdate.toDateString();
    return(
        <div>
            {dt}
        </div>
    );
}

export default displaydate;