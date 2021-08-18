import nodeGeocoder from "node-geocoder";
import dotenv from "dotenv";

dotenv.config({});

const options = {
  provider: process.env.PROVIDER,
  apiKey: process.env.MAP_QUEST_API_KEY,
  formatter: null,
};

async function geocoder(address) {
  const geo = nodeGeocoder(options);
  try {
    const response = await geo.geocode(address);
    return response;
  } catch (error) {
    return error;
  }
}

export default geocoder;
