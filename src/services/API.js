import { useEffect, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

let APIURL = ""

const unsubscribe = NetInfo.addEventListener(state => {
    if(state.details.ssid == "LJEANS5" || state.details.ssid == "INFINITUMAA47" || state.details.ssid == "SUC13MOC"){
        APIURL = "http://20.20.0.91:8000/"
    }else{
        APIURL = "http://suc13vpn.ddns.net:4700/"
    }
    console.log('Connected to:', state.details.ssid);
    console.log('Using host:', APIURL)
});
unsubscribe();



//const APIURL = "http://20.20.0.91:8000/"
//URL = "http://milanita.ddns.net:8000/"
//const APIURL = "http://192.168.1.76:8000/"

export { APIURL }
