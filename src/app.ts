import axios from "axios"

const form=document.querySelector("#form")! as HTMLFormElement;

const GOOGLE_API_KEY='AIzaSyAvTG8YHyz82spRn_az1S6Nrc_7atr5n1E'

declare var google:any

type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: "OK" | "ZERO_RESULTS";
  };
  

const searchFunction=async(event:Event)=>{
    event.preventDefault()
    const address=form.address.value
   try {
    const response= await  axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${GOOGLE_API_KEY}`)
    console.log(response)
    if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;
       const  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center:coordinates,
        zoom: 8,
      });
      const maps = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 4,
          center: coordinates,
        }
      );
    
      // The marker, positioned at Uluru
       new google.maps.Marker({
        position: coordinates,
        map: maps,
      });
      console.log(map)
   } catch (err) {
        console.log(err)
   }
}

form.addEventListener("submit",searchFunction)

