const getCity = () => {

    let city = document.getElementById('city').value;

    city = city.toLowerCase();
    city = city[0].toUpperCase() + city.slice(1);

    console.log(city);

    return city
}