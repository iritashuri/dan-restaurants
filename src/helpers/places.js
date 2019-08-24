const google = window.google;
const location = new google.maps.LatLng(32.078403, 34.786442);
const nearbyParams = {
    location: location,
    radius: 20000,
    types: ['restaurant'],
}

let myPosition
navigator.geolocation.getCurrentPosition((position) => {
    myPosition = position.coords
});

export const getDistance = (from) => {
    const R = 6371; // km (change this constant to get miles)
    const lat1 = myPosition.latitude;
    const lon1 = myPosition.longitude;
    const lat2 = from.latitude;
    const lon2 = from.longitude;
	const dLat = (lat2-lat1) * Math.PI / 180;
	const dLon = (lon2-lon1) * Math.PI / 180;
	const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	const d = R * c;
	if (d>1) return Math.round(d)+"km";
	else if (d<=1) return Math.round(d*1000)+"m";
	return d;
}

export const updateRestaurants = (callback) => {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15
      });
    const service = new google.maps.places.PlacesService(map); 
    service.nearbySearch(
        nearbyParams,
        (result) => callback(result)
    );

}