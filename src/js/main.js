import 'bootstrap/dist/css/bootstrap.min.css'

import '../css/main.css'

import './icons'
import './check-updates'
import { prepareForm } from './form-util'
import { warnFacebookBrowserUserIfNecessary } from './facebook-util'
import { addVersion } from './util'
import { createForm } from './form'
import { format, subMinutes } from 'date-fns'

export const $ = (...args) => document.querySelector(...args)

async function writeToForm () {
    console.log("write to form")
    const urlParams = new URLSearchParams(window.location.search);
    const dataUrl = decodeURIComponent(urlParams.get('data'))
    console.log("dataUrl", dataUrl)
    const type = decodeURIComponent(urlParams.get('type'))
    const express = decodeURIComponent(urlParams.get('express'))
    const expressInt = parseInt(express)
    const dataParsed = JSON.parse(dataUrl)
    console.log("dataParsed", dataParsed)
    if (dataParsed) {
        console.log("Dataa from url", dataParsed)
        Object.keys(dataParsed).map((field) => {
            const fieldData = dataParsed[field]
            $(field).setAttribute('value', fieldData)
        })
        let heure
        console.log("expressInt", expressInt)

        if (expressInt) {
            heure = format(subMinutes(new Date(), expressInt), 'HH:mm')

        } else {
            heure = format(new Date(), 'HH:mm')
        }

        console.log("heure", heure)
        $('#field-heuresortie').setAttribute('value', heure)
        $('#field-datesortie').setAttribute('value', format(new Date(), 'yyyy-MM-dd'))

        if (type == 'enfants') {
            $("#checkbox-enfants").setAttribute('checked', true)
        } else {
            $("#checkbox-sport_animaux").setAttribute('checked', true)
        }

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
