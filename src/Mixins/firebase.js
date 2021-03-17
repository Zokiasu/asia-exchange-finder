import db from '../main.js'
import {apps} from '../main.js'

export default {
    methods: {

        newUniversityObject(universityData) {
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

        newPartnerObject(partnerData){
            return {
                "universityPartnerName": partnerData.universityPartnerName,
                "universityPartnerCountry": partnerData.universityPartnerCountry,
                "universityPartnerCity": partnerData.universityPartnerCity,
                "universityPartnerAddress": partnerData.universityPartnerAddress,
                "universityPartnerWebsiteLink": partnerData.universityPartnerWebsiteLink,
                "universityPartnerCondition": partnerData.universityPartnerCondition,
                "universityPartnerCycle": partnerData.universityPartnerCycle,
                "universityPartnerDisplay": partnerData.universityPartnerDisplay,
                "universityPartnerCreator": partnerData.universityPartnerCreator,
                "universityPartnerLastUpdate": partnerData.universityPartnerLastUpdate,  
                "universityPartnerSpeciality": partnerData.universityPartnerSpeciality,
            }
        },

        fillPartnerObject(partnerToFill, partnerData){
            
        },

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