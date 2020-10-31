import 'bootstrap/dist/css/bootstrap.min.css'

import '../css/main.css'

import './icons'
import './check-updates'
import { prepareForm } from './form-util'
import { warnFacebookBrowserUserIfNecessary } from './facebook-util'
import { addVersion } from './util'
import { createForm } from './form'
import { format } from 'date-fns'

export const $ = (...args) => document.querySelector(...args)

async function writeToForm () {
    console.log("write to form")
    const urlParams = new URLSearchParams(window.location.search);
    const dataUrl = decodeURIComponent(urlParams.get('data'))
    console.log("dataUrl", dataUrl)
    const dataParsed = JSON.parse(dataUrl)
    console.log("dataParsed", dataParsed)
    if (dataParsed) {
        console.log("Dataa from url", dataParsed)
        Object.keys(dataParsed).map((field) => {
            const fieldData = dataParsed[field]
            $(field).setAttribute('value', fieldData)
        })
        $('#field-datesortie').setAttribute('value', format(new Date(), 'yyyy-MM-dd'))
        $('#field-heuresortie').setAttribute('value', format(new Date(), 'hh-mm'))
        $("#checkbox-sport_animaux").setAttribute('checked', true)
        $("#generate-btn").click()
    } else {
        console.log("No data from url")
    }


}

async function init () {
    await warnFacebookBrowserUserIfNecessary()
    await createForm()
    await prepareForm()
    await addVersion(process.env.VERSION)
    await writeToForm()
}

init()
