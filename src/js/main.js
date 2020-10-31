import 'bootstrap/dist/css/bootstrap.min.css'

import '../css/main.css'

import './icons'
import './check-updates'
import { prepareForm } from './form-util'
import { warnFacebookBrowserUserIfNecessary } from './facebook-util'
import { addVersion } from './util'
import { createForm } from './form'
export const $ = (...args) => document.querySelector(...args)

async function writeToForm () {
    console.log("write to form")

    const data = {
        '#field-firstname': "Florine",
        '#field-lastname': "Botte",
        '#field-birthday': "05/10/1986",
        '#field-placeofbirth': "Lomme",
        '#field-address': "33 rue campagne première",
        '#field-city': "Paris",
        '#field-zipcode': "75014",
        '#field-datesortie': "2020-10-31",
        '#field-heuresortie': "20:20",
      }

    Object.keys(data).map((field) => {
        const fieldData = data[field]
        $(field).setAttribute('value', fieldData)
    })

    $("#checkbox-sport_animaux").setAttribute('checked', true)

    $("#generate-btn").click()

}

async function init () {
    await warnFacebookBrowserUserIfNecessary()
    await createForm()
    await prepareForm()
    await addVersion(process.env.VERSION)
    await writeToForm()
}

init()
