
import analytics from '@react-native-firebase/analytics';
import { productItem } from '../types';

type productAPI = {
    products: productItem[];
    total: number;
    skip: number;
    limit: number;
}

/**
 * Common function for screens for end of the flatlist reached and fetching 10 more rows as data
 *
 * @param screenName - The name of the screen 
 * @param endReachedCondition - the condition for fetching
 * @param setSkip - setState for the number of rows to skip
 * @param apiCall - api Call to fetch the data
 * @param setnomoreProducts - setState for the boolean that represents that is no more rows
 * @param setlist - setState for the list of items 
 * 
 * 
 */
export const endOfListReached = async (
    screenName: string,
    endReachedCondition: boolean,
    setSkip: (value: number | ((prevState: number) => number)) => void,
    apiCall: (skip: number) => Promise<productAPI>,
    setnomoreProducts: (value: boolean | ((prevState: boolean) => boolean)) => void,
    setlist: (value: productItem[] | ((prevState: productItem[]) => productItem[])) => void) => {

    if (endReachedCondition) {
        let newskip = 0;
        setSkip((prevSkip) => {
            newskip = prevSkip + 10;
            return newskip;
        })
        const auto = await apiCall(newskip);
        if (auto.products.length == 0) {
            setnomoreProducts(true)
        }
        analytics().logEvent(screenName, { productsName: screenName, products: auto.products })
        setlist((prevList) => prevList.concat(auto.products));
    }
}
