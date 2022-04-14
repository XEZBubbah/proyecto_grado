import React from 'react'

var displaydate = () => {
    var showdate=new Date();
    var dt=showdate.toDateString();
    return(
        <div>
            {dt}
        </div>
    );
}

export default displaydate;