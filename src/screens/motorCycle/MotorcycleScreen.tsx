import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { productItem } from '../../types';
import { getMotorcycles } from '../../utils/api';
import ProductsList from '../../components/ProductsList/ProductsList';
import SearchInput from '../../components/SearchInput/SearchInput';
import analytics from '@react-native-firebase/analytics';
import { endOfListReached } from '../../utils/commonFucntions';

export default function MotorcycleScreen() {
  const [input, setinput] = useState('');
  const [list, setlist] = useState<productItem[]>([]);
  const [skip, setskip] = useState(0)
  const [nomoreProducts, setnomoreProducts] = useState(false)
  const filterItems = list.filter((item) => item.title.toLocaleLowerCase().includes(input.toLocaleLowerCase()))

  useEffect(() => {
    const setMotorCycles = async () => {
      const auto = await getMotorcycles(skip);
      setlist(auto.products);
      analytics().logEvent('motorcycles', { productsName: "motorcycles", products: auto.products })
    }

    setMotorCycles();
  }, []);

  const endReachedCondition = !nomoreProducts && list.length > 0 && list.length % 10 == 0;
  return (
    <View>
      <SearchInput setInput={setinput} input={input} />
      <View>
        <ProductsList
          list={filterItems}
          loadingMore={endReachedCondition}
          endReachFunc={() => endOfListReached("MotorCycles", endReachedCondition, setskip, getMotorcycles, setnomoreProducts, setlist)}
        />
      </View>
    </View>
  )
}