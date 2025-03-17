import { useContext } from 'react';
import NavigationContext from  '../components/navigation/Navigation';

function useNavigation() {
    return useContext(NavigationContext);
}

export default useNavigation;