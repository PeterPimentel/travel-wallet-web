import { SelectOption } from "../../../types/CommonType";
import { Location } from "../../../types/LocationType";
import { addLocationIdentifier, getLocationSelectOptions } from "../../../util/locationUtil";

export const PLACES_SEARCH_START = 'PLACES/SEARCH/START';

export const PLACES_FETCH_START = 'PLACES/FETCH/START';
export const PLACES_FETCH_SUCCESS = 'PLACES/FETCH/SUCCESS';
export const PLACES_FETCH_ERROR = 'PLACES/FETCH/ERROR';

interface LocalState {
    search: string;
    options: SelectOption[];
    locations: Location[];
    loading: boolean;
}


export const initialState: LocalState = {
    search: "",
    options: [],
    locations: [],
    loading: false,
};

type SearchPlacesStartAction = {
    type: typeof PLACES_SEARCH_START;
    payload: string
};

type FetchPlacesStartAction = {
    type: typeof PLACES_FETCH_START;
};
type FetchPlacesErrorAction = {
    type: typeof PLACES_FETCH_ERROR;
};
type FetchPlacesSuccessAction = {
    type: typeof PLACES_FETCH_SUCCESS;
    payload: Location[]
};

export type ActionTypes = FetchPlacesStartAction | FetchPlacesSuccessAction | FetchPlacesErrorAction | SearchPlacesStartAction;

export function reducer(state: LocalState, action: ActionTypes) {
    switch (action.type) {
        case PLACES_FETCH_START:
            return {
                search: state.search,
                options: [],
                locations: [],
                loading: true
            };
        case PLACES_SEARCH_START:
            return {
                search: action.payload,
                options: [],
                locations: [],
                loading: false
            };
        case PLACES_FETCH_SUCCESS:
            const identifiedLocations = addLocationIdentifier(action.payload)

            return {
                search: state.search,
                options: getLocationSelectOptions(identifiedLocations),
                locations: identifiedLocations,
                loading: false
            };
        case PLACES_FETCH_ERROR:
            return {
                search: state.search,
                options: [],
                locations: [],
                loading: false
            };
        default:
            return state
    }
}
