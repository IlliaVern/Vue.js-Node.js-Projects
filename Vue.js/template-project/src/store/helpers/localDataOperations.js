import {
    v4 as uuidv4
} from 'uuid';

export default {
    readGirls: function () {
        if (localStorage.getItem('girlsList'))
            return JSON.parse(localStorage.getItem('girlsList'))
        else return []
    },
    writeGirls: function (girls) {
        localStorage.setItem('girlsList', JSON.stringify(girls))
    },
    addGirl: function (girlName, girlAge, girlEthnic, girlChildren, girlDescription) {
        const girl = {
            id: uuidv4(),
            name: girlName,
            age: girlAge,
            ethnic: girlEthnic,
            children: girlChildren,
            description: girlDescription
        }
        let girlsList = this.readGirls()
        girlsList.push(girl)
        this.writeGirls(girlsList)
    },
    updateGirl: function(girl) {
        let girlsList = this.readGirls()
        const girlIndex = girlsList.findIndex(item=>item.id===girl.id)
        girlsList[girlIndex]={...girl}
        this.writeGirls(girlsList)
    },
    deleteGirl: function(girlId) {
        let girls = this.readGirls()
        girls = girls.filter(girl => girl.id !== girlId)
        this.writeGirls(girls)
        this.readGirls()
    },
    getGirlById: function(girlId) {
        let girlsList = this.readGirls()
        return girlsList.find(girl => girl.id === girlId)
    },
    
}