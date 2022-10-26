import useTranslation from 'next-translate/useTranslation';
import { useMemo, useReducer, useCallback } from 'react'
import { useStoreState } from "easy-peasy";
import { FaTimes } from 'react-icons/fa';

import { Location } from '../../../types/LocationType';
import { common } from '../../../constants/locales';
import { getPlaces } from '../../../service/location';
import { getToken } from '../../../service/token';
import { debounceCallback, DEFAULT_TIMER } from '../../../util/debounceUtil';
import { getUniqueLocationOptions, getUsedLocations } from '../../../util/locationUtil';
import { StoreEntities } from '../../../types/StoreType';
import { Travel } from '../../../types/TravelType';

import { Select } from "../../atoms/Select/Select";
import { Text } from "../../atoms/Typography/Typography";

import styles from "./style.module.css";

import {
    reducer,
    initialState,
    PLACES_FETCH_ERROR,
    PLACES_FETCH_START,
    PLACES_FETCH_SUCCESS,
    PLACES_SEARCH_START,
} from './reducer';

type PlaceSelectProps = {
    value?: string;
    travelId?: number;
    onSelect: (location: Location) => void
}

export const PlaceSelect = ({ value, travelId, onSelect }: PlaceSelectProps) => {
    const token = getToken();
    const { t } = useTranslation();
    const travels: Travel[] = useStoreState<StoreEntities>((store) => store.travels);

    const [state, dispatch] = useReducer(reducer, initialState);
    const usedLocations = useMemo(() => getUsedLocations(travels, travelId), [travels, travelId])
    const usedOptions = useMemo(() => getUniqueLocationOptions(usedLocations || [], value), [usedLocations, value])

    const onChange = useCallback((value: string) => {
        const locationsToSearch = state.search.length === 0 ? usedLocations : state.locations
        const selected = locationsToSearch.find(l => `${l.id}` === value)
        if (selected) {
            onSelect(selected)
        }
    }, [onSelect, state.locations, state.search.length, usedLocations])

    const handleClear = useCallback(() => {
        onSelect(null)
    }, [onSelect])

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value: string) => {
            dispatch({ type: PLACES_SEARCH_START, payload: value })
            if (value.length < 3) {
                return
            }

            dispatch({ type: PLACES_FETCH_START })
            getPlaces(token, { query: value }).then(places => {
                dispatch({ type: PLACES_FETCH_SUCCESS, payload: places })
            }).catch(() => {
                dispatch({ type: PLACES_FETCH_ERROR })
            });
        };
        return debounceCallback(loadOptions, DEFAULT_TIMER);
    }, [token]);

    return (
        <div>
            <div>
                <Text type='secondary'>{t(common.select_place_label)}</Text>
                {state.search.length > 0 && state.search.length < 3 ?
                    <Text type='danger'>{t(common.select_place_min_length_error)}</Text> : null
                }
            </div>
            <div className={styles.selecetContainer}>
                <div className={styles.selectBox}>
                    <Select
                        loading={state.loading}
                        disabled={false}
                        placeholder={t(common.select_place_placeholder)}
                        value={value}
                        options={state.search.length === 0 ? usedOptions : state.options}
                        onChange={onChange}
                        onSearch={debounceFetcher}
                    />
                </div>
                <div className={styles.center} onClick={handleClear}>
                    <FaTimes color="#777777" style={{ width: '20px', height: '20px' }} />
                </div>
            </div>
        </div>
    )
}