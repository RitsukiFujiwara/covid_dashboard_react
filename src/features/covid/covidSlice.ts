import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { count } from "console";
import { RootState } from "../../app/store";
import dataJson from "./dataDaily.json";
import dataJsonDaily from "./dataDaily.json";

const apiUrl = "https://covid19.mathdro.id/api";

type APIDATA = typeof dataJson;
type APIDATADAILY = typeof dataJsonDaily;

type covidState = {
    data: APIDATA;
    country: string;
    dailyData: APIDATADAILY;
};
const initialState: covidState = {
    data: {
        "confirmed": {
        "value": 148739529,
        "detail": "https://covid19.mathdro.id/api/confirmed"
        },
        "recovered": {
        "value": 86275454,
        "detail": "https://covid19.mathdro.id/api/recovered"
        },
        "deaths": {
        "value": 3135750,
        "detail": "https://covid19.mathdro.id/api/deaths"
        },
        "dailySummary": "https://covid19.mathdro.id/api/daily",
        "dailyTimeSeries": {
        "pattern": "https://covid19.mathdro.id/api/daily/[dateString]",
        "example": "https://covid19.mathdro.id/api/daily/2-14-2020"
        },
        "image": "https://covid19.mathdro.id/api/og",
        "source": "https://github.com/mathdroid/covid19",
        "countries": "https://covid19.mathdro.id/api/countries",
        "countryDetail": {
        "pattern": "https://covid19.mathdro.id/api/countries/[country]",
        "example": "https://covid19.mathdro.id/api/countries/USA"
        },
        "lastUpdate": "2021-04-28T08:20:57.000Z"
    },
    country: "",
    dailyData:[
        {
        "totalConfirmed": 557,
        "mainlandChina": 548,
        "otherLocations": 9,
        "deltaConfirmed": 0,
        "totalRecovered": 0,
        "confirmed": {
        "total": 557,
        "china": 548,
        "outsideChina": 9
        },
        "deltaConfirmedDetail": {
        "total": 0,
        "china": 0,
        "outsideChina": 0
        },
        "deaths": {
        "total": 17,
        "china": 17,
        "outsideChina": 0
        },
        "recovered": {
        "total": 0,
        "china": 0,
        "outsideChina": 0
        },
        "active": 0,
        "deltaRecovered": 0,
        "incidentRate": 0.4510818002025252,
        "peopleTested": 0,
        "reportDate": "2020-01-22"
        }
    ]
};

export const fetchAsyncGet = createAsyncThunk(
 "covid/get", 
async() =>{
    const { data } = await axios.get<APIDATA>(apiUrl);
});

export const fetchAsyncGetDaily = createAsyncThunk(
    "covid/getDaily",
    async () => {
        const { data } = await axios.get<APIDATADAILY>(`${apiUrl}/daily`);
        return data;
    }
)

export const fetchAsyncGetCountry = createAsyncThunk(
    "covid/getCountry",
    async (country: string) => {
        let dynamicUrl = apiUrl;
        if(country){
            dynamicUrl = `${apiUrl}/countries/${country}`;
        }
        const { data } = await axios.get<APIDATA>(dynamicUrl);
        return { data: data, country: country };
    }
)



const covidSlice = createSlice({
    name: "covid",
    initialState: initialState,
    reducers: {},
});
