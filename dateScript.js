// // Get the current date
// const currentDate = new Date("2024-06-01T02:53:39.371Z")//new Date();

// console.log("currentDate ",currentDate.getDate())
// // Subtract 3 days from the current date
// const pastDate = new Date();
// pastDate.setDate(currentDate.getDate() - 3);

// // // Format the past date (optional)
// // const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
// // const formattedPastDate = pastDate.toLocaleDateString('en-GB', options);

// // // Log the dates
// // console.log("Current Date: ", currentDate.toLocaleDateString('en-GB', options));
// console.log("Date 3 Days Ago: ", pastDate);

t = -1*86400
 
const ut = new Date();
ut.setUTCHours(23);
        ut.setUTCMinutes(59);
        ut.setUTCSeconds(0);

ut.setSeconds(ut.getSeconds() + Number(t));

ut.setUTCHours(0);
        ut.setUTCMinutes(0);
        ut.setUTCSeconds(0);
        ut.setUTCMilliseconds(0);

console.log("ut ",ut)

return ut;