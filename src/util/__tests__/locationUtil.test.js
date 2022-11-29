import { addLocationIdentifier, getLocationSelectOptions } from '../locationUtil'

function makeid() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const LOCATION_A = {
    countryCode: "BR",
    countryName: "Brasil",
    cityName: "Santos",
    label: "Santos",
    region: "São Paulo",
    cityLat: 203020,
    cityLong: 202020,
}

const LOCATION_B = {
    id: 2,
    countryCode: "PT",
    countryName: "Portugal",
    cityName: "Lagos",
    label: "Lagos",
    region: "Algarve",
    cityLat: 103020,
    cityLong: 102020,
}

jest.mock('uuid', () => ({
    v4: jest.fn(() => makeid())
}))

describe('locationUtil', () => {
    describe('addLocationIdentifier', () => {
        it('should add a random id to each one of the locations', () => {
            const locations = addLocationIdentifier([LOCATION_A, LOCATION_B])

            expect(locations[0].id).not.toBeNull()
            expect(locations[1].id).not.toBeNull()
        })

        it('should maintain the location id already setted', () => {
            const locations = addLocationIdentifier([LOCATION_A, LOCATION_B])

            expect(locations[1].id).toEqual(2)
        })
    });
    describe('getLocationSelectOptions', () => {
        it('should return the label as text and the id as value', () => {
            const options = getLocationSelectOptions([LOCATION_A, LOCATION_B])

            expect(options[1].text).toBe(LOCATION_B.label)
            expect(options[1].value).toBe(`${LOCATION_B.id}`)
        })

        it('should return the locations as options', () => {
            const options = getLocationSelectOptions([LOCATION_A, LOCATION_B])

            expect(options.length).toBe(2)
        })
    });
})