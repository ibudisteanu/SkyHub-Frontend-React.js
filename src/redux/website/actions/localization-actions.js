/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/26/2017.
 * (C) BIT TECHNOLOGIES
 */

import axios from 'axios';

export function getDefaultLocalization(dispatch) {

    axios.get("http://freegeoip.net/json/") .then(res => {

        res = res.data;

        var status = {
            country: res.country_name||'',
            countryCode : res.country_code||'',
            city : res.city||'',
            latitude : res.latitude||'',
            longitude : res.longitude||'',
            ip : res.ip||'',
            timeZone: res.time_zone||'',
        };

        console.log(status);

        dispatch({
            type: "NEW_LOCALIZATION",
            status: status,
        });
    });
}