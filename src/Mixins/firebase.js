import db from '../main.js'
import {apps, name, grade, analytics} from '../main.js'

export default {
    methods: {

        //University

        newUniversityObject(universityData) {
            if(universityData != undefined) {
                if(universityData.universitySourceId == undefined) {universityData.universitySourceId = ""}
                if(universityData.universitySourceName == undefined) {universityData.universitySourceName = ""}
                if(universityData.universitySourceCountry == undefined) {universityData.universitySourceCountry = ""}
                if(universityData.universitySourceCity == undefined) {universityData.universitySourceCity = ""}
                if(universityData.universitySourceAddress == undefined) {universityData.universitySourceAddress = ""}
                if(universityData.universitySourceImageLink == undefined) {universityData.universitySourceImageLink = ""}
                if(universityData.universitySourceWebsiteLink == undefined) {universityData.universitySourceWebsiteLink = ""}
                if(universityData.universitySourceDisplay == undefined) {universityData.universitySourceDisplay = ""}
                if(universityData.universitySourceCreator == undefined) {universityData.universitySourceCreator = []}
                if(universityData.universitySourceMoreInfo == undefined) {universityData.universitySourceMoreInfo = ""}
                if(universityData.universitySourceContributors == undefined) {universityData.universitySourceContributors = ""}
                if(universityData.universitySourceLastUpdate == undefined) {universityData.universitySourceLastUpdate = ""}
                if(universityData.universitySourcerPartner == undefined) {universityData.universitySourcerPartner = []}
                return {
                    "universitySourceId": universityData.universitySourceId,
                    "universitySourceName": universityData.universitySourceName,
                    "universitySourceCountry": universityData.universitySourceCountry,
                    "universitySourceCity": universityData.universitySourceCity,
                    "universitySourceAddress": universityData.universitySourceAddress,
                    "universitySourceImageLink": universityData.universitySourceImageLink,
                    "universitySourceWebsiteLink": universityData.universitySourceWebsiteLink,
                    "universitySourceDisplay": universityData.universitySourceDisplay,
                    "universitySourceCreator": universityData.universitySourceCreator,
                    "universitySourceMoreInfo": universityData.universitySourceMoreInfo,
                    "universitySourceContributors": universityData.universitySourceContributors,
                    "universitySourceLastUpdate": universityData.universitySourceLastUpdate,   
                    "universitySourcerPartner": universityData.universitySourcerPartner, 
                }
            } else {
                return {
                    "universitySourceId": "",
                    "universitySourceName": "University Name",
                    "universitySourceCountry": "France",
                    "universitySourceCity": "Paris",
                    "universitySourceAddress": "",
                    "universitySourceImageLink": "https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80",
                    "universitySourceWebsiteLink": "",
                    "universitySourceDisplay": "False",
                    "universitySourceCreator": name,
                    "universitySourceMoreInfo": "",
                    "universitySourceContributors": [],
                    "universitySourceLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),   
                    "universitySourcerPartner": [], 
                }
            }
        },

        fillUniversityObject(universityToFill, universityData) {
            universityToFill.universitySourceId = universityData.universitySourceId,
            universityToFill.universitySourceName = universityData.universitySourceName,
            universityToFill.universitySourceCountry = universityData.universitySourceCountry,
            universityToFill.universitySourceCity = universityData.universitySourceCity,
            universityToFill.universitySourceAddress = universityData.universitySourceAddress,
            universityToFill.universitySourceImageLink = universityData.universitySourceImageLink,
            universityToFill.universitySourceWebsiteLink = universityData.universitySourceWebsiteLink,
            universityToFill.universitySourceDisplay = universityData.universitySourceDisplay,
            universityToFill.universitySourceCreator = universityData.universitySourceCreator,
            universityToFill.universitySourceMoreInfo = universityData.universitySourceMoreInfo,
            universityToFill.universitySourceContributors = universityData.universitySourceContributors,
            universityToFill.universitySourceLastUpdate = universityData.universitySourceLastUpdate,
            universityToFill.universitySourcerPartner = universityData.universitySourcerPartner
        },

        copyUniversityObject(universityToFill, universityData) {
            if(universityData.universitySourceId) universityToFill.universitySourceId = JSON.parse(JSON.stringify(universityData.universitySourceId))
            if(universityData.universitySourceName) universityToFill.universitySourceName = JSON.parse(JSON.stringify(universityData.universitySourceName))
            if(universityData.universitySourceCountry) universityToFill.universitySourceCountry = JSON.parse(JSON.stringify(universityData.universitySourceCountry))
            if(universityData.universitySourceCity) universityToFill.universitySourceCity = JSON.parse(JSON.stringify(universityData.universitySourceCity))
            if(universityData.universitySourceAddress) universityToFill.universitySourceAddress = JSON.parse(JSON.stringify(universityData.universitySourceAddress))
            if(universityData.universitySourceImageLink) universityToFill.universitySourceImageLink = JSON.parse(JSON.stringify(universityData.universitySourceImageLink))
            if(universityData.universitySourceWebsiteLink) universityToFill.universitySourceWebsiteLink = JSON.parse(JSON.stringify(universityData.universitySourceWebsiteLink))
            if(universityData.universitySourceDisplay) universityToFill.universitySourceDisplay = JSON.parse(JSON.stringify(universityData.universitySourceDisplay))
            if(universityData.universitySourceCreator) universityToFill.universitySourceCreator = JSON.parse(JSON.stringify(universityData.universitySourceCreator))
            if(universityData.universitySourceMoreInfo) universityToFill.universitySourceMoreInfo = JSON.parse(JSON.stringify(universityData.universitySourceMoreInfo))
            if(universityData.universitySourceContributors) universityToFill.universitySourceContributors = JSON.parse(JSON.stringify(universityData.universitySourceContributors))
            if(universityData.universitySourceLastUpdate) universityToFill.universitySourceLastUpdate = JSON.parse(JSON.stringify(universityData.universitySourceLastUpdate))
            if(universityData.universitySourcerPartner) universityToFill.universitySourcerPartner = JSON.parse(JSON.stringify(universityData.universitySourcerPartner))
        },

        //Partner

        newPartnerObject(partnerData){
            if(partnerData != undefined) {
                if(partnerData.universityPartnerName == undefined) {partnerData.universityPartnerName = ""}
                if(partnerData.universityPartnerCountry == undefined) {partnerData.universityPartnerCountry = ""}
                if(partnerData.universityPartnerCity == undefined) {partnerData.universityPartnerCity = ""}
                if(partnerData.universityPartnerAddress == undefined) {partnerData.universityPartnerAddress = ""}
                if(partnerData.universityPartnerWebsiteLink == undefined) {partnerData.universityPartnerWebsiteLink = ""}
                if(partnerData.universityPartnerMoreInfoLink == undefined) {partnerData.universityPartnerMoreInfoLink = ""}
                if(partnerData.universityPartnerCondition == undefined) {partnerData.universityPartnerCondition = ""}
                if(partnerData.universityPartnerCycle == undefined) {partnerData.universityPartnerCycle = []}
                if(partnerData.universityPartnerDisplay == undefined) {partnerData.universityPartnerDisplay = ""}
                if(partnerData.universityPartnerCreator == undefined) {partnerData.universityPartnerCreator = ""}
                if(partnerData.universityPartnerLastUpdate == undefined) {partnerData.universityPartnerLastUpdate = ""}
                if(partnerData.universityPartnerSpeciality == undefined) {partnerData.universityPartnerSpeciality = []}
                return {
                    "universityPartnerName": partnerData.universityPartnerName,
                    "universityPartnerCountry": partnerData.universityPartnerCountry,
                    "universityPartnerCity": partnerData.universityPartnerCity,
                    "universityPartnerAddress": partnerData.universityPartnerAddress,
                    "universityPartnerWebsiteLink": partnerData.universityPartnerWebsiteLink,
                    "universityPartnerMoreInfoLink": partnerData.universityPartnerMoreInfoLink,
                    "universityPartnerCondition": partnerData.universityPartnerCondition,
                    "universityPartnerCycle": partnerData.universityPartnerCycle,
                    "universityPartnerDisplay": partnerData.universityPartnerDisplay,
                    "universityPartnerCreator": partnerData.universityPartnerCreator,
                    "universityPartnerLastUpdate": partnerData.universityPartnerLastUpdate,
                    "universityPartnerSpeciality": partnerData.universityPartnerSpeciality,
                }
            } else {
                return {
                    "universityPartnerName": "",
                    "universityPartnerCountry": "",
                    "universityPartnerCity": "",
                    "universityPartnerAddress": "",
                    "universityPartnerWebsiteLink": "",
                    "universityPartnerMoreInfoLink": "",
                    "universityPartnerCondition": "",
                    "universityPartnerDisplay": "True",
                    "universityPartnerCreator": name,
                    "universityPartnerLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),
                    "universityPartnerSpeciality": [],
                    "universityPartnerCycle": [],
                }
            }
        },

        fillPartnerObject(partnerToFill, partnerData){
            partnerToFill.universityPartnerName = partnerData.universityPartnerName,
            partnerToFill.universityPartnerCountry = partnerData.universityPartnerCountry,
            partnerToFill.universityPartnerCity = partnerData.universityPartnerCity,
            partnerToFill.universityPartnerAddress = partnerData.universityPartnerAddress,
            partnerToFill.universityPartnerWebsiteLink = partnerData.universityPartnerWebsiteLink,
            partnerToFill.universityPartnerMoreInfoLink = partnerData.universityPartnerMoreInfoLink,
            partnerToFill.universityPartnerCondition = partnerData.universityPartnerCondition,
            partnerToFill.universityPartnerCycle = partnerData.universityPartnerCycle,
            partnerToFill.universityPartnerDisplay = partnerData.universityPartnerDisplay,
            partnerToFill.universityPartnerCreator = partnerData.universityPartnerCreator,
            partnerToFill.universityPartnerLastUpdate = partnerData.universityPartnerLastUpdate,
            partnerToFill.universityPartnerSpeciality = partnerData.universityPartnerSpeciality
        },

        copyPartnerObject(partnerToFill, partnerData){
            if(partnerData.universityPartnerName) partnerToFill.universityPartnerName = JSON.parse(JSON.stringify(partnerData.universityPartnerName))
            if(partnerData.universityPartnerCountry) partnerToFill.universityPartnerCountry = JSON.parse(JSON.stringify(partnerData.universityPartnerCountry))
            if(partnerData.universityPartnerCity) partnerToFill.universityPartnerCity = JSON.parse(JSON.stringify(partnerData.universityPartnerCity))
            if(partnerData.universityPartnerAddress) partnerToFill.universityPartnerAddress = JSON.parse(JSON.stringify(partnerData.universityPartnerAddress))
            if(partnerData.universityPartnerWebsiteLink) partnerToFill.universityPartnerWebsiteLink = JSON.parse(JSON.stringify(partnerData.universityPartnerWebsiteLink))
            if(partnerData.universityPartnerMoreInfoLink) partnerToFill.universityPartnerMoreInfoLink = JSON.parse(JSON.stringify(partnerData.universityPartnerMoreInfoLink))
            if(partnerData.universityPartnerCondition) partnerToFill.universityPartnerCondition = JSON.parse(JSON.stringify(partnerData.universityPartnerCondition))
            if(partnerData.universityPartnerCycle) partnerToFill.universityPartnerCycle = JSON.parse(JSON.stringify(partnerData.universityPartnerCycle))
            if(partnerData.universityPartnerDisplay) partnerToFill.universityPartnerDisplay = JSON.parse(JSON.stringify(partnerData.universityPartnerDisplay))
            if(partnerData.universityPartnerCreator) partnerToFill.universityPartnerCreator = JSON.parse(JSON.stringify(partnerData.universityPartnerCreator))
            if(partnerData.universityPartnerLastUpdate) partnerToFill.universityPartnerLastUpdate = JSON.parse(JSON.stringify(partnerData.universityPartnerLastUpdate))
            if(partnerData.universityPartnerSpeciality) partnerToFill.universityPartnerSpeciality = JSON.parse(JSON.stringify(partnerData.universityPartnerSpeciality))
        },

        //General Function for Firebase
        
        updateCreators(universityEdit) {
            var newEditor = true

            universityEdit.universitySourceContributors.forEach(el => {
                if(el.contributorSourceName == name) {
                    el.contributorSourceEditNumber = el.contributorSourceEditNumber + 1
                    newEditor = false
                }
            })
            
            if(newEditor) {
                universityEdit.universitySourceContributors.push({
                    "contributorSourceName": name,
                    "contributorSourceEditNumber": 1
                })
            }

        },

        //Firebase University Function

        addUniversityToFrebase(universityToAdd){
            var id = ""
            var up = {}

            if(universityToAdd.universitySourceId == "" || universityToAdd.universitySourceId == undefined) {
                //If new university add version by user with a new generated id
                id = db.ref().child('universitys').push().key
                universityToAdd.universitySourceId = id
                this.updateCreators(universityToAdd)
                up['/universitysEdited/' + id + '/' + universityToAdd.universitySourceCreator] = universityToAdd
            } else {
                //If existing university add version by user to validate information
                this.updateCreators(universityToAdd)
                up['/universitysEdited/' + universityToAdd.universitySourceId + '/' + universityToAdd.universitySourceCreator] = universityToAdd
            }

            return db.ref().update(up).then(() => {
                    this.logCreateUniversity(name, universityToAdd.universitySourceName)                 
                }
            )
        },

        removeUniversityToFirebase(universityToDelete){
            if(universityToDelete.universitySourceDisplay == "True") {
                apps.database().ref('/universitys/' + universityToDelete.universitySourceId).set(null)
            } else {
                apps.database().ref('/universitysEdited/' + universityToDelete.universitySourceId + '/' + universityToDelete.universitySourceCreator).set(null)
            }
            this.logDeleteUniversity(name, universityToDelete.universitySourceName)
        },

        validUniversity(universityToValidated){
            var up = {}
            universityToValidated.universitySourceDisplay = "True"
            up['/universitys/' + universityToValidated.universitySourceId] = universityToValidated
            apps.database().ref('/universitysEdited/' + universityToValidated.universitySourceId + '/' + universityToValidated.universitySourceCreator).set(null)
            return db.ref().update(up).then(() => {
                this.logConfirmUniversity(name, universityToValidated.universitySourceName)                 
            })
        },

        //Firebase Log Function

        logCreateUniversity(userEditor, universityEdited){
            var up = {}

            var ActualDate = new Date().toISOString().slice(0, 10)
            var ActualHour = new Date().toISOString().slice(11, 19)

            var test = userEditor + " added the university " + universityEdited + " to the database"

            up['/log/aef/' + ActualDate + '/' + ActualHour + '/'] = test

            return db.ref().update(up);
        },

        logEditUniversity(userEditor, universityEdited){
            var up = {}

            var ActualDate = new Date().toISOString().slice(0, 10)
            var ActualHour = new Date().toISOString().slice(11, 19)

            var test = userEditor + " edited the university " + universityEdited

            up['/log/aef/' + ActualDate + '/' + ActualHour + '/'] = test

            return db.ref().update(up);
        },

        logDeleteUniversity(userEditor, universityEdited){
            var up = {}

            var ActualDate = new Date().toISOString().slice(0, 10)
            var ActualHour = new Date().toISOString().slice(11, 19)

            var test = userEditor + " deleted the university " + universityEdited

            up['/log/aef/' + ActualDate + '/' + ActualHour + '/'] = test

            return db.ref().update(up);
        },

        logConfirmUniversity(userEditor, universityEdited){
            var up = {}

            var ActualDate = new Date().toISOString().slice(0, 10)
            var ActualHour = new Date().toISOString().slice(11, 19)

            var test = userEditor + " valided the university " + universityEdited

            up['/log/aef/' + ActualDate + '/' + ActualHour + '/'] = test

            return db.ref().update(up);
        },
        
        logCreatePartner(userEditor, universityEdited) {
            var up = {}

            var ActualDate = new Date().toISOString().slice(0, 10)
            var ActualHour = new Date().toISOString().slice(11, 19)

            var test = userEditor + " added a partner into " + universityEdited

            up['/log/aef/' + ActualDate + '/' + ActualHour + '/'] = test

            return db.ref().update(up);
        },

        logEditPartner(userEditor, universityEdited, partnerName) {
            var up = {}

            var ActualDate = new Date().toISOString().slice(0, 10)
            var ActualHour = new Date().toISOString().slice(11, 19)

            var test = userEditor + " edited the partner " + partnerName + " into " + universityEdited

            up['/log/aef/' + ActualDate + '/' + ActualHour + '/'] = test

            return db.ref().update(up);
        },

        logDeletePartner(userEditor, universityEdited, partnerName) {
            var up = {}

            var ActualDate = new Date().toISOString().slice(0, 10)
            var ActualHour = new Date().toISOString().slice(11, 19)

            var test = userEditor + " deleted the partner " + partnerName + " into " + universityEdited

            up['/log/aef/' + ActualDate + '/' + ActualHour + '/'] = test

            return db.ref().update(up);
        },
    }
};