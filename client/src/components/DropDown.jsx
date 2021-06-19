import React, { Component, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Results from './Cards'

function EndpointSelect() {
    var url = [

        {
            value: 1,
            site: "http://localhost:5000/api/v1/ebay?subject=",
            label: "Ebay"
        },
        {
            value: 2,
            site: "http://localhost:5000/api/v1/craigslist?subject=",
            label: "Craigslist"
        }];
    var [setURL, urlChoice] = useState(url.label);
    var urlHandle = e => {
        urlChoice(e.site)
    }
    return (
        <div>
            <Select options={EndpointSelect.label} onChange={EndpointSelect.setURL}></Select>
        </div>
    )
}
export default EndpointSelect